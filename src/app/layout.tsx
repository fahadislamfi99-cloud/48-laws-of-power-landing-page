import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/data/siteConfig";

export const viewport: Viewport = {
  themeColor: "#08080A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
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
  openGraph: {
    title: "The 48 Laws of Power: বাংলা ডিজিটাল PDF সংস্করণ (৳৯৯৯)",
    description:
      "ক্ষমতা, প্রভাব ও মানুষের মনস্তত্ত্ব বোঝার ৪৮টি নীতি। তাৎক্ষণিক ডাউনলোড ও লাইফটাইম অ্যাক্সেসে সংগ্রহ করুন।",
    type: "website",
    locale: "bn_BD",
    siteName: "The 48 Laws of Power বাংলা PDF",
  },
  twitter: {
    card: "summary_large_image",
    title: "The 48 Laws of Power বাংলা ডিজিটাল PDF সংস্করণ",
    description: "মানুষের মনস্তত্ত্ব ও ক্ষমতার ৪৮টি নীতি, যা মোবাইল ও ট্যাবলেটে তাৎক্ষণিক পড়া যায়।",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600;700;800&family=Noto+Serif+Bengali:wght@500;600;700;800&family=Hind+Siliguri:wght@400;500;600;700&family=Google+Sans+Flex:wght@400;500;600;700&family=Cinzel:wght@500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
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
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${siteConfig.metaPixelId}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-[#C8A45C] selection:text-[#08080A] bg-[#08080A]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
