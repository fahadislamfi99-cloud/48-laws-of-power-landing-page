import { NextRequest, NextResponse } from "next/server";
import { executeBKashPayment } from "@/lib/bkash";
import { getCollection, Order, Customer, BKashTransaction } from "@/lib/mongodb";
import { sendTelegramOrderNotification } from "@/lib/telegram";
import { getOrGenerateWatermarkedPdf } from "@/lib/watermarkPdf";
import { sendPersonalizedBookEmail } from "@/lib/emailDelivery";
import { sendMetaServerEvent } from "@/lib/metaConversionsApi";

export async function GET(req: NextRequest) {
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "";
  const proto = req.headers.get("x-forwarded-proto") || "https";
  const origin =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (host ? `${proto}://${host}` : "http://localhost:3000");

  try {
    const { searchParams } = new URL(req.url);
    const paymentID = searchParams.get("paymentID");
    const status = searchParams.get("status");

    // 1. Handle user cancellation
    if (status === "cancel") {
      return NextResponse.redirect(`${origin}/?payment=cancelled`);
    }

    // 2. Handle payment failure
    if (status === "failure" || !paymentID) {
      return NextResponse.redirect(
        `${origin}/?payment=failed&reason=${encodeURIComponent("Payment failed or was declined by bKash")}`
      );
    }

    // 3. Execute bKash payment verification
    const executeResponse = await executeBKashPayment({ paymentID });

    if (
      executeResponse.statusCode === "0000" &&
      executeResponse.transactionStatus === "Completed"
    ) {
      const trxID = executeResponse.trxID || "";
      const paidAmount = Number(executeResponse.amount) || 0;
      const payer = executeResponse.customerMsisdn || "";
      const invoice = executeResponse.merchantInvoiceNumber || "";

      const ordersCol = await getCollection<Order>("orders");
      const txCol = await getCollection<BKashTransaction>("bkash_transactions");

      // 4. Record raw transaction
      await txCol.insertOne({
        paymentID,
        trxID,
        amount: paidAmount,
        customerMsisdn: payer,
        merchantInvoiceNumber: invoice,
        transactionStatus: "Completed",
        rawResponse: executeResponse,
        createdAt: new Date(),
      });

      // 5. Match pending order
      const existingOrder = await ordersCol.findOne({
        $or: [
          { "metadata.paymentID": paymentID },
          { "metadata.invoiceNumber": invoice },
          { notes: { $regex: paymentID, $options: "i" } },
        ],
      });

      if (!existingOrder) {
        console.error("[Order Not Found for bKash Callback]:", { paymentID, invoice });
        return NextResponse.redirect(
          `${origin}/?payment=failed&reason=${encodeURIComponent("Matching order record not found")}`
        );
      }

      // Idempotency: If order is already paid, redirect straight to success
      if (existingOrder.paymentStatus === "paid") {
        return NextResponse.redirect(
          `${origin}/payment-success?trxID=${encodeURIComponent(existingOrder.trxId || trxID)}&paymentID=${encodeURIComponent(
            paymentID
          )}&amount=${encodeURIComponent(existingOrder.amount)}&orderNumber=${encodeURIComponent(
            existingOrder.orderNumber
          )}&token=${encodeURIComponent(existingOrder.downloadToken)}&email=${encodeURIComponent(
            existingOrder.targetEmail
          )}&phone=${encodeURIComponent(existingOrder.customerPhone || payer)}&emailStatus=${existingOrder.emailStatus || "sent"}`
        );
      }

      const expectedAmount = Number(existingOrder.amount || 0);

      // 6. Verify Amount
      if (paidAmount < expectedAmount && paidAmount > 0) {
        console.error("[Paid Amount Mismatch]:", { paidAmount, expected: expectedAmount });
        return NextResponse.redirect(
          `${origin}/?payment=failed&reason=${encodeURIComponent(
            `Paid amount (৳${paidAmount}) does not match order amount (৳${expectedAmount})`
          )}`
        );
      }

      const finalPhone = payer || existingOrder.customerPhone || "01700000000";

      // 7. Upsert Customer CRM Record
      const customersCol = await getCollection<Customer>("customers");
      const customerEmail = existingOrder.targetEmail.trim().toLowerCase();
      const existingCustomer = await customersCol.findOne({ email: customerEmail });

      if (existingCustomer) {
        await customersCol.updateOne(
          { _id: existingCustomer._id },
          {
            $inc: { totalOrders: 1, totalSpent: paidAmount || expectedAmount },
            $set: {
              phone: finalPhone || existingCustomer.phone,
              updatedAt: new Date(),
            },
          }
        );
      } else {
        await customersCol.insertOne({
          name: existingOrder.customerName || customerEmail.split("@")[0],
          email: customerEmail,
          phone: finalPhone,
          totalOrders: 1,
          totalSpent: paidAmount || expectedAmount,
          status: "active",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      // 8. Generate Personalized Watermarked PDF with Customer's Phone Number
      let pdfStatus: "generated" | "failed" = "failed";
      let pdfBuffer: Buffer | undefined;
      let pdfError: string | undefined;
      let emailStatus: "sent" | "failed" = "failed";
      let emailError: string | undefined;

      try {
        const wmResult = await getOrGenerateWatermarkedPdf({
          orderNumber: existingOrder.orderNumber,
          customerPhone: finalPhone,
          customerEmail: existingOrder.targetEmail,
        });
        pdfStatus = "generated";
        pdfBuffer = wmResult.fileBuffer;
      } catch (err: any) {
        console.error("[Callback PDF Generation Error]:", err);
        pdfError = err.message || "Failed to generate personalized PDF";
      }

      // 9. Automated Email Delivery via Gmail SMTP
      if (pdfStatus === "generated" && pdfBuffer) {
        try {
          const emailResult = await sendPersonalizedBookEmail({
            orderNumber: existingOrder.orderNumber,
            customerName: existingOrder.customerName,
            customerEmail: existingOrder.targetEmail,
            customerPhone: finalPhone,
            trxId: trxID,
            amount: paidAmount || expectedAmount,
            downloadToken: existingOrder.downloadToken,
            watermarkedPdfBuffer: pdfBuffer,
          });

          if (emailResult.success) {
            emailStatus = "sent";
          } else {
            emailError = emailResult.error;
          }
        } catch (err: any) {
          console.error("[Callback Email Delivery Error]:", err);
          emailError = err.message || "Failed to send Gmail";
        }
      }

      // 10. Update Order in DB with Payment & Delivery State
      await ordersCol.updateOne(
        { _id: existingOrder._id },
        {
          $set: {
            trxId: trxID,
            payerPhone: finalPhone,
            customerPhone: finalPhone,
            paymentStatus: "paid",
            orderStatus: "active",
            amount: paidAmount || expectedAmount,
            pdfStatus,
            pdfGeneratedAt: pdfStatus === "generated" ? new Date() : undefined,
            pdfError: pdfError || undefined,
            emailStatus,
            emailSentAt: emailStatus === "sent" ? new Date() : undefined,
            emailError: emailError || undefined,
            notes: `bKash Gateway Payment Verified. TrxID: ${trxID}, Phone: ${finalPhone}, PDF: ${pdfStatus}, Email: ${emailStatus}`,
            updatedAt: new Date(),
          },
        }
      );

      // 11. Send Telegram Alert
      sendTelegramOrderNotification({
        orderNumber: existingOrder.orderNumber,
        customerName: existingOrder.customerName,
        customerEmail: existingOrder.targetEmail,
        customerPhone: finalPhone,
        amount: paidAmount || expectedAmount,
        paymentMethod: "bKash (অটো গেটওয়ে)",
        trxId: trxID,
        status: `সফল (PDF: ${pdfStatus}, Email: ${emailStatus})`,
      }).catch((err) => console.error("[Telegram Error]:", err));

      // 12. Send Server-Side Meta Conversions API (CAPI) Purchase Event
      sendMetaServerEvent({
        eventName: "Purchase",
        eventSourceUrl: `${origin}/payment-success`,
        user: {
          email: existingOrder.targetEmail,
          phone: finalPhone,
        },
        customData: {
          value: paidAmount || expectedAmount,
          currency: "BDT",
          orderId: existingOrder.orderNumber,
          contentName: "The 48 Laws of Power (বাংলা সংস্করণ)",
        },
      }).catch((err) => console.error("[Meta CAPI Error]:", err));

      // 13. Redirect to payment success page with real statuses
      return NextResponse.redirect(
        `${origin}/payment-success?trxID=${encodeURIComponent(trxID)}&paymentID=${encodeURIComponent(
          paymentID
        )}&amount=${encodeURIComponent(paidAmount || expectedAmount)}&orderNumber=${encodeURIComponent(
          existingOrder.orderNumber
        )}&token=${encodeURIComponent(existingOrder.downloadToken)}&email=${encodeURIComponent(
          existingOrder.targetEmail
        )}&phone=${encodeURIComponent(finalPhone)}&pdfStatus=${pdfStatus}&emailStatus=${emailStatus}`
      );
    } else {
      console.error("[bKash Execute Failed]:", executeResponse);
      return NextResponse.redirect(
        `${origin}/?payment=failed&reason=${encodeURIComponent(
          executeResponse.statusMessage || "bKash transaction verification failed"
        )}`
      );
    }
  } catch (error: any) {
    console.error("[bKash Callback Error]:", error);
    return NextResponse.redirect(
      `${origin}/?payment=failed&reason=${encodeURIComponent(
        error.message || "Internal server error during payment verification"
      )}`
    );
  }
}
