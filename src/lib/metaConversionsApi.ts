import crypto from "crypto";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "4300801780063322";
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN || "";

/**
 * SHA-256 normalizer as required by Meta Conversions API
 */
function hashData(input?: string): string | undefined {
  if (!input) return undefined;
  const normalized = input.trim().toLowerCase();
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

export interface ServerEventData {
  eventName: "Purchase" | "InitiateCheckout" | "Lead" | "ViewContent";
  eventSourceUrl?: string;
  user?: {
    email?: string;
    phone?: string;
    clientIp?: string;
    clientUserAgent?: string;
    fbc?: string;
    fbp?: string;
  };
  customData?: {
    currency?: string;
    value?: number;
    orderId?: string;
    contentName?: string;
    contentType?: string;
  };
}

/**
 * Sends a server-side event to Meta Conversions API (CAPI)
 */
export async function sendMetaServerEvent(data: ServerEventData): Promise<boolean> {
  if (!ACCESS_TOKEN || !PIXEL_ID) {
    console.warn("[Meta CAPI] Skipped: Missing ACCESS_TOKEN or PIXEL_ID");
    return false;
  }

  try {
    const currentTimestamp = Math.floor(Date.now() / 1000);

    const payload = {
      data: [
        {
          event_name: data.eventName,
          event_time: currentTimestamp,
          action_source: "website",
          event_source_url: data.eventSourceUrl || process.env.NEXT_PUBLIC_BASE_URL || "https://the48lawsofpower.com",
          user_data: {
            em: data.user?.email ? [hashData(data.user.email)] : undefined,
            ph: data.user?.phone ? [hashData(data.user.phone)] : undefined,
            client_ip_address: data.user?.clientIp,
            client_user_agent: data.user?.clientUserAgent,
            fbc: data.user?.fbc,
            fbp: data.user?.fbp,
          },
          custom_data: data.customData ? {
            currency: data.customData.currency || "BDT",
            value: data.customData.value,
            order_id: data.customData.orderId,
            content_name: data.customData.contentName || "The 48 Laws of Power (বাংলা সংস্করণ)",
            content_type: data.customData.contentType || "product",
          } : undefined,
        },
      ],
    };

    const url = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (res.ok) {
      console.log(`[Meta CAPI] Successfully sent ${data.eventName} event:`, result);
      return true;
    } else {
      console.error(`[Meta CAPI] Error sending ${data.eventName} event:`, result);
      return false;
    }
  } catch (error) {
    console.error("[Meta CAPI] Exception:", error);
    return false;
  }
}
