declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export const trackPixelEvent = (
  eventName: string,
  params?: Record<string, unknown>
) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    try {
      if (params) {
        window.fbq("track", eventName, params);
      } else {
        window.fbq("track", eventName);
      }
      console.log(`[Meta Pixel] Tracked event: ${eventName}`, params);
    } catch (err) {
      console.error("[Meta Pixel] Event tracking error:", err);
    }
  }
};

export const trackViewContent = (title: string, value: number) => {
  trackPixelEvent("ViewContent", {
    content_name: title,
    content_category: "Books",
    value: value,
    currency: "BDT",
  });
};

export const trackInitiateCheckout = (value: number) => {
  trackPixelEvent("InitiateCheckout", {
    content_name: "The 48 Laws of Power (বাংলা সংস্করণ)",
    value: value,
    currency: "BDT",
    num_items: 1,
  });
};

export const trackPurchase = (value: number, orderId: string) => {
  trackPixelEvent("Purchase", {
    content_name: "The 48 Laws of Power (বাংলা সংস্করণ)",
    value: value,
    currency: "BDT",
    order_id: orderId,
    num_items: 1,
  });
};

export const trackLead = (phone: string) => {
  trackPixelEvent("Lead", {
    content_category: "Order Form",
    phone_number: phone,
  });
};
