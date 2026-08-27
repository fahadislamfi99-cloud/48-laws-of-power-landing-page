import { MongoClient, Db, Collection, Document } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/landing_48_laws";
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

export async function getDb(): Promise<Db> {
  const connectedClient = await clientPromise;
  return connectedClient.db();
}

export async function getCollection<T extends Document = Document>(name: string): Promise<Collection<T>> {
  const db = await getDb();
  return db.collection<T>(name);
}

// Types for Entities
export interface AdminUser extends Document {
  username: string;
  email: string;
  passwordHash: string;
  name: string;
  role: "super_admin" | "admin" | "moderator";
  createdAt: Date;
  updatedAt: Date;
}

export interface Product extends Document {
  slug: string;
  title: string;
  titleEn: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  fileName: string;
  fileSize: string;
  fileUrl: string;
  pages: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer extends Document {
  name: string;
  email: string;
  phone?: string;
  totalOrders: number;
  totalSpent: number;
  status: "active" | "blocked";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order extends Document {
  orderNumber: string;
  productId?: string;
  productTitle: string;
  amount: number;
  paymentMethod: "bkash_gateway" | "bkash_manual";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  orderStatus: "active" | "pending_activation" | "completed" | "cancelled";
  trxId?: string;
  payerPhone?: string;
  targetEmail: string;
  customerName: string;
  customerPhone?: string;
  downloadToken: string;
  downloadCount: number;
  lastDownloadAt?: Date;
  pdfStatus?: "pending" | "generated" | "failed";
  pdfGeneratedAt?: Date;
  pdfFilePath?: string;
  pdfError?: string;
  emailStatus?: "pending" | "sent" | "failed";
  emailSentAt?: Date;
  emailError?: string;
  notes?: string;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface BKashTransaction extends Document {
  paymentID: string;
  trxID?: string;
  amount: number;
  customerMsisdn?: string;
  merchantInvoiceNumber?: string;
  transactionStatus: string;
  rawResponse?: any;
  createdAt: Date;
}

export interface Coupon extends Document {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderAmount?: number;
  maxUses?: number;
  usedCount: number;
  expiresAt?: Date;
  isActive: boolean;
  createdAt: Date;
}

export interface FAQItem extends Document {
  question: string;
  answer: string;
  category: "general" | "reading" | "payment" | "support";
  orderIndex: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SiteSettings extends Document {
  supportWhatsapp: string;
  supportPhone: string;
  supportEmail: string;
  bkashPersonalNumber: string;
  telegramBotToken?: string;
  telegramChatId?: string;
  metaPixelId?: string;
  metaAccessToken?: string;
  downloadExpiryHours: number;
  updatedAt: Date;
}

export interface PromotionalBanner extends Document {
  isEnabled: boolean;
  badgeText: string;
  title: string;
  subtitle?: string;
  description: string;
  couponCode: string;
  discountAmount: number;
  discountType: "fixed" | "percentage";
  ctaText: string;
  offerTag?: string;
  imageUrl?: string;
  displayDelaySeconds: number;
  cooldownHours: number;
  updatedAt: Date;
}

export interface AdminLog extends Document {
  adminId: string;
  adminName: string;
  action: string;
  entity: string;
  entityId?: string;
  details?: string;
  ipAddress?: string;
  createdAt: Date;
}

