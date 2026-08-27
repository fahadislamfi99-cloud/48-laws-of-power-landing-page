/**
 * High-Performance Sliding Window In-Memory Rate Limiter
 * Suitable for Next.js serverless/Node runtime
 */

interface RateLimitConfig {
  maxRequests: number;
  windowSeconds: number;
}

interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitStores = new Map<string, Map<string, RateLimitRecord>>();

function getStore(namespace: string): Map<string, RateLimitRecord> {
  if (!rateLimitStores.has(namespace)) {
    rateLimitStores.set(namespace, new Map());
  }
  return rateLimitStores.get(namespace)!;
}

/**
 * Standard predefined rate limit configurations
 */
export const RATE_LIMIT_CONFIGS = {
  // Login: 5 attempts per 15 minutes per IP
  LOGIN: { maxRequests: 5, windowSeconds: 15 * 60 },
  // Payment Init: 10 attempts per minute per IP
  PAYMENT_INIT: { maxRequests: 10, windowSeconds: 60 },
  // Download Token: 20 attempts per 5 minutes per token/IP
  DOWNLOAD: { maxRequests: 20, windowSeconds: 5 * 60 },
  // Status Check: 40 requests per minute per IP
  STATUS_POLL: { maxRequests: 40, windowSeconds: 60 },
  // Coupon check: 20 requests per minute per IP
  COUPON_CHECK: { maxRequests: 20, windowSeconds: 60 },
  // General Admin APIs: 120 requests per minute
  ADMIN_API: { maxRequests: 120, windowSeconds: 60 },
};

/**
 * Check if a request identifier is within rate limits
 */
export function checkRateLimit(
  namespace: string,
  identifier: string,
  config: RateLimitConfig
): {
  allowed: boolean;
  remaining: number;
  resetSeconds: number;
} {
  const store = getStore(namespace);
  const now = Date.now();
  const windowMs = config.windowSeconds * 1000;
  const threshold = now - windowMs;

  const record = store.get(identifier) || { timestamps: [] };

  // Filter timestamps within current window
  const validTimestamps = record.timestamps.filter((ts) => ts > threshold);

  if (validTimestamps.length >= config.maxRequests) {
    const oldestTimestamp = validTimestamps[0];
    const resetSeconds = Math.ceil((oldestTimestamp + windowMs - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      resetSeconds: Math.max(1, resetSeconds),
    };
  }

  validTimestamps.push(now);
  store.set(identifier, { timestamps: validTimestamps });

  // Periodically clean up old stale entries
  if (store.size > 2000) {
    for (const [key, val] of store.entries()) {
      if (val.timestamps.every((ts) => ts <= threshold)) {
        store.delete(key);
      }
    }
  }

  return {
    allowed: true,
    remaining: config.maxRequests - validTimestamps.length,
    resetSeconds: config.windowSeconds,
  };
}

/**
 * Helper to extract client IP address from NextRequest
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const ips = forwarded.split(",");
    return ips[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  return "127.0.0.1";
}
