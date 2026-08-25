import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/data/siteConfig";

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "The 48 Laws of Power বাংলা | Robert Greene | বাংলা অনুবাদ বই",
  description:
    "Robert Greene-এর বিখ্যাত The 48 Laws of Power বইয়ের বাংলা অনুবাদ। মানুষের আচরণ, ক্ষমতা, influence এবং social dynamics সম্পর্কে ৪৮টি গুরুত্বপূর্ণ principle জানুন।",
  keywords: [
    "The 48 Laws of Power বাংলা",
    "48 Laws of Power বাংলা বই",
    "Robert Greene বাংলা",
    "The 48 Laws of Power Bangla",
    "48 Laws of Power বই",
    "Power বই বাংলা",
    "Psychology বই বাংলা",
    "বই অর্ডার",
  ],
  authors: [{ name: "Robert Greene" }],
  openGraph: {
    title: "The 48 Laws of Power — বাংলা অনুবাদ সংস্করণ (৳৯৯৯)",
    description:
      "ক্ষমতা, প্রভাব ও মানুষের মনস্তত্ত্ব বোঝার ৪৮টি নীতি। ক্যাশ অন ডেলিভারি ও ফ্রি হোম ডেলিভারি সুবিধায় আজই অর্ডার করুন।",
    type: "website",
    locale: "bn_BD",
    siteName: "The 48 Laws of Power বাংলা",
  },
  twitter: {
    card: "summary_large_image",
    title: "The 48 Laws of Power বাংলা সংস্করণ",
    description: "মানুষের মনস্তত্ত্ব ও ক্ষমতার ৪৮টি নীতি — বাংলায় পড়ুন।",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="scroll-smooth">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Noto+Sans+Bengali:wght@300;400;500;600;700&family=Noto+Serif+Bengali:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        {/* Meta Pixel Code Placeholder */}
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
      <body className="min-h-screen flex flex-col antialiased selection:bg-[#C59B4B] selection:text-black bg-[#FAF8F5]">
        {children}
      </body>
    </html>
  );
}
