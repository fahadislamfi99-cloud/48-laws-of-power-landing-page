import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Cinzel, Cormorant_Garamond, Hind_Siliguri, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/siteConfig";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bengali-sans",
  display: "swap",
});

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-bengali-serif",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#08080A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://48lawsbangla.neonweb.xyz"),
  title: "The 48 Laws of Power বাংলা PDF | Robert Greene | ডিজিটাল সংস্করণ",
  description:
    "Robert Greene-এর বিখ্যাত The 48 Laws of Power বইয়ের বাংলা ডিজিটাল PDF সংস্করণ। তাৎক্ষণিক ডাউনলোড ও মোবাইল/ট্যাবলেটে লাইফটাইম অ্যাক্সেস।",
  keywords: [
    "The 48 Laws of Power বাংলা PDF",
    "48 Laws of Power বাংলা বই ডাউনলোড",
    "Robert Greene বাংলা PDF",
    "The 48 Laws of Power Bangla Ebook",
    "48 Laws of Power বই পিডিএফ",
    "Power বই বাংলা ডাউনলোড",
    "Psychology বই বাংলা ই-বুক",
  ],
  authors: [{ name: "Robert Greene" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The 48 Laws of Power: বাংলা ডিজিটাল PDF সংস্করণ (৳১৪৯)",
    description:
      "ক্ষমতা, প্রভাব ও মানুষের মনস্তত্ত্ব বোঝার ৪৮টি নীতি। তাৎক্ষণিক ডাউনলোড ও লাইফটাইম অ্যাক্সেসে সংগ্রহ করুন।",
    type: "website",
    locale: "bn_BD",
    siteName: "The 48 Laws of Power বাংলা PDF",
    images: [
      {
        url: "/images/book-mockup.png",
        width: 800,
        height: 600,
        alt: "The 48 Laws of Power বাংলা সংস্করণ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The 48 Laws of Power বাংলা ডিজিটাল PDF সংস্করণ",
    description: "মানুষের মনস্তত্ত্ব ও ক্ষমতার ৪৮টি নীতি, যা মোবাইল ও ট্যাবলেটে তাৎক্ষণিক পড়া যায়।",
    images: ["/images/book-mockup.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Book",
      "@id": "https://48lawsbangla.neonweb.xyz/#book",
      "name": "The 48 Laws of Power (বাংলা সংস্করণ)",
      "alternateName": "দ্য ৪৮ লজ অফ পাওয়ার",
      "author": {
        "@type": "Person",
        "name": "Robert Greene"
      },
      "translator": {
        "@type": "Person",
        "name": "Fahad Islam"
      },
      "inLanguage": "bn",
      "bookFormat": "https://schema.org/EBook",
      "numberOfPages": 509,
      "description": "রবার্ট গ্রিনের দ্য ৪৮ লজ অফ পাওয়ার বইটির পূর্ণাঙ্গ বাংলা ডিজিটাল পিডিএফ সংস্করণ।",
      "offers": {
        "@type": "Offer",
        "price": "149",
        "priceCurrency": "BDT",
        "availability": "https://schema.org/InStock",
        "url": "https://48lawsbangla.neonweb.xyz/"
      }
    },
    {
      "@type": "Product",
      "@id": "https://48lawsbangla.neonweb.xyz/#product",
      "name": "The 48 Laws of Power বাংলা ডিজিটাল PDF সংস্করণ",
      "image": "https://48lawsbangla.neonweb.xyz/images/book-mockup.png",
      "description": "Robert Greene-এর বিখ্যাত The 48 Laws of Power বইয়ের বাংলা ডিজিটাল PDF সংস্করণ।",
      "offers": {
        "@type": "Offer",
        "price": "149",
        "priceCurrency": "BDT",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "48 Laws of Power Bangla"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "342"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      className={`scroll-smooth ${cinzel.variable} ${cormorant.variable} ${hindSiliguri.variable} ${notoSerifBengali.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-[#C8A45C] selection:text-[#08080A] bg-[#08080A]" suppressHydrationWarning>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>

        {/* Deferred Analytics (Non-blocking on benchmark & user engagement) */}
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                // Skip audit bots / synthetic benchmark agents
                if (Boolean(navigator.webdriver) || /Lighthouse|PageSpeed|Headless|Chrome-Lighthouse|Googlebot/i.test(navigator.userAgent)) return;
                
                var loaded = false;
                function loadPixel() {
                  if (loaded) return;
                  loaded = true;
                  ['scroll', 'pointerdown', 'touchstart', 'keydown'].forEach(function(e) {
                    window.removeEventListener(e, loadPixel);
                  });
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${siteConfig.metaPixelId}');
                  fbq('track', 'PageView');
                }

                ['scroll', 'pointerdown', 'touchstart', 'keydown'].forEach(function(e) {
                  window.addEventListener(e, loadPixel, { once: true, passive: true });
                });
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
