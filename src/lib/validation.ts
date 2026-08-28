/**
 * Comprehensive Server-Side Validation & Sanitization Helpers
 */

/**
 * Validates and normalizes email addresses
 */
export function validateEmail(email: unknown): { isValid: boolean; email: string; error?: string } {
  if (typeof email !== "string") {
    return { isValid: false, email: "", error: "Email must be a valid string." };
  }

  const trimmed = email.trim().toLowerCase();

  if (trimmed.length === 0 || trimmed.length > 100) {
    return { isValid: false, email: "", error: "Email length must be between 1 and 100 characters." };
  }

  // RFC 5322 compliant regex for standard email addresses
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  if (!emailRegex.test(trimmed)) {
    return { isValid: false, email: "", error: "Please provide a valid email address (e.g. name@gmail.com)." };
  }

  return { isValid: true, email: trimmed };
}

/**
 * Validates and normalizes Bangladeshi mobile phone numbers
 * Accepts: 01712345678, +8801712345678, 8801712345678, 013..., 014..., 015..., 016..., 017..., 018..., 019...
 */
export function validatePhone(phone: unknown): { isValid: boolean; phone: string; error?: string } {
  if (typeof phone !== "string") {
    return { isValid: false, phone: "", error: "Phone number must be a string." };
  }

  // Remove spaces, hyphens, parentheses
  const cleaned = phone.replace(/[\s\-\(\)]/g, "").trim();

  // Match BD phone number format
  const bdPhoneRegex = /^(?:\+?88)?(01[3-9]\d{8})$/;
  const match = cleaned.match(bdPhoneRegex);

  if (!match) {
    return {
      isValid: false,
      phone: "",
      error: "অনুগ্রহ করে সঠিক ১১ ডিজিটের বাংলাদেশী মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)।",
    };
  }

  const normalized = match[1]; // 11-digit local format: 01XXXXXXXXX
  return { isValid: true, phone: normalized };
}

/**
 * Sanitizes plain text input by stripping dangerous HTML/scripts and truncating to maxLen
 */
export function sanitizeString(input: unknown, maxLen = 200): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>?/gm, "") // strip html tags
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // strip control characters
    .trim()
    .slice(0, maxLen);
}

/**
 * Validates and normalizes a bKash transaction ID (TrxID)
 * Format: 6-20 alphanumeric characters (e.g. 9J4K2L8M7)
 */
export function sanitizeTrxId(trxId: unknown): { isValid: boolean; trxId: string; error?: string } {
  if (typeof trxId !== "string") {
    return { isValid: false, trxId: "", error: "Transaction ID must be a string." };
  }

  const cleaned = trxId.replace(/[^a-zA-Z0-9]/g, "").trim().toUpperCase();

  if (cleaned.length < 6 || cleaned.length > 25) {
    return {
      isValid: false,
      trxId: "",
      error: "Transaction ID must be between 6 and 25 alphanumeric characters.",
    };
  }

  return { isValid: true, trxId: cleaned };
}

/**
 * Validates hex download token
 */
export function validateDownloadToken(token: unknown): { isValid: boolean; token: string; error?: string } {
  if (typeof token !== "string") {
    return { isValid: false, token: "", error: "Invalid token format." };
  }

  const trimmed = token.trim();
  const hexRegex = /^[a-fA-F0-9]{16,64}$/;

  if (!hexRegex.test(trimmed)) {
    return { isValid: false, token: "", error: "Invalid or corrupted download token." };
  }

  return { isValid: true, token: trimmed.toLowerCase() };
}

/**
 * Sanitizes and bounds positive monetary amounts
 */
export function sanitizeAmount(amount: unknown, defaultVal = 149): number {
  const num = Number(amount);
  if (isNaN(num) || num <= 0 || !isFinite(num)) {
    return defaultVal;
  }
  return Math.min(Math.max(1, Math.round(num)), 100000);
}
