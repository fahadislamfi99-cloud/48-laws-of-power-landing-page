import { NextRequest, NextResponse } from "next/server";
import { executeBKashPayment } from "@/lib/bkash";
import { getCollection, Order, Customer, BKashTransaction } from "@/lib/mongodb";
import { sendTelegramOrderNotification } from "@/lib/telegram";

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

      // 5. Anti-Fraud duplicate check
      if (trxID) {
        const duplicateOrder = await ordersCol.findOne({
          trxId: trxID,
          paymentStatus: "paid",
        });

        if (duplicateOrder) {
          console.warn("[Duplicate bKash Payment Blocked]:", { trxID, order: duplicateOrder.orderNumber });
          return NextResponse.redirect(
            `${origin}/?payment=failed&reason=${encodeURIComponent("Duplicate transaction ID detected.")}`
          );
        }
      }

      // 6. Match pending order
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

      const expectedAmount = Number(existingOrder.amount || 0);

      // 7. Verify Amount
      if (paidAmount < expectedAmount && paidAmount > 0) {
        console.error("[Paid Amount Mismatch]:", { paidAmount, expected: expectedAmount });
        return NextResponse.redirect(
          `${origin}/?payment=failed&reason=${encodeURIComponent(
            `Paid amount (৳${paidAmount}) does not match order amount (৳${expectedAmount})`
          )}`
        );
      }

      // 8. Upsert Customer CRM Record
      const customersCol = await getCollection<Customer>("customers");
      const customerEmail = existingOrder.targetEmail.trim().toLowerCase();
      const existingCustomer = await customersCol.findOne({ email: customerEmail });

      if (existingCustomer) {
        await customersCol.updateOne(
          { _id: existingCustomer._id },
          {
            $inc: { totalOrders: 1, totalSpent: paidAmount || expectedAmount },
            $set: {
              phone: payer || existingCustomer.phone,
              updatedAt: new Date(),
            },
          }
        );
      } else {
        await customersCol.insertOne({
          name: existingOrder.customerName || customerEmail.split("@")[0],
          email: customerEmail,
          phone: payer,
          totalOrders: 1,
          totalSpent: paidAmount || expectedAmount,
          status: "active",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      // 9. Update Order to Paid & Active
      await ordersCol.updateOne(
        { _id: existingOrder._id },
        {
          $set: {
            trxId: trxID,
            payerPhone: payer,
            paymentStatus: "paid",
            orderStatus: "active",
            amount: paidAmount || expectedAmount,
            notes: `Official bKash Gateway Payment Completed. TrxID: ${trxID}, PaymentID: ${paymentID}`,
            updatedAt: new Date(),
          },
        }
      );

      // 10. Send Telegram Alert
      sendTelegramOrderNotification({
        orderNumber: existingOrder.orderNumber,
        customerName: existingOrder.customerName,
        customerEmail: existingOrder.targetEmail,
        customerPhone: payer,
        amount: paidAmount || expectedAmount,
        paymentMethod: "bKash (অটো পেমেন্ট গেটওয়ে)",
        trxId: trxID,
        status: "সফল (Gateway Paid)",
      }).catch((err) => console.error("[Telegram Error]:", err));

      // 11. Redirect to payment success page
      return NextResponse.redirect(
        `${origin}/payment-success?trxID=${encodeURIComponent(trxID)}&paymentID=${encodeURIComponent(
          paymentID
        )}&amount=${encodeURIComponent(paidAmount || expectedAmount)}&orderNumber=${encodeURIComponent(
          existingOrder.orderNumber
        )}&token=${encodeURIComponent(existingOrder.downloadToken)}&email=${encodeURIComponent(
          existingOrder.targetEmail
        )}`
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
