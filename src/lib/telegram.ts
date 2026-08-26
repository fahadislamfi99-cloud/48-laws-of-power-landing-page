import { getCollection, SiteSettings } from "./mongodb";

export async function sendTelegramOrderNotification({
  orderNumber,
  customerName,
  customerEmail,
  customerPhone,
  amount,
  paymentMethod,
  trxId,
  status,
}: {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  amount: number;
  paymentMethod: string;
  trxId?: string;
  status: string;
}) {
  try {
    const settingsCol = await getCollection<SiteSettings>("site_settings");
    const settings = await settingsCol.findOne({});

    const botToken = process.env.TELEGRAM_BOT_TOKEN || settings?.telegramBotToken;
    const chatId = process.env.TELEGRAM_CHAT_ID || settings?.telegramChatId;

    if (!botToken || !chatId) return;

    const message = `👑 <b>New Digital Book Order!</b>\n\n` +
      `📦 <b>Order:</b> <code>${orderNumber}</code>\n` +
      `📖 <b>Book:</b> The 48 Laws of Power (বাংলা অনুবাদ)\n` +
      `💰 <b>Amount:</b> ৳${amount} BDT\n` +
      `👤 <b>Customer:</b> ${customerName}\n` +
      `📧 <b>Gmail:</b> <code>${customerEmail}</code>\n` +
      (customerPhone ? `📱 <b>Phone:</b> <code>${customerPhone}</code>\n` : "") +
      `💳 <b>Payment:</b> ${paymentMethod}\n` +
      (trxId ? `🔑 <b>TrxID:</b> <code>${trxId}</code>\n` : "") +
      `⚡ <b>Status:</b> ${status}\n\n` +
      `🚀 <i>Digital PDF delivery activated!</i>`;

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });
  } catch (error) {
    console.error("[Telegram Notification Error]:", error);
  }
}
