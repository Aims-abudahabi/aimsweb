import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppChat from "@/components/WhatsAppChat";
import GoogleTranslate from "@/components/GoogleTranslate";
import Script from "next/script";

// Import Google Fonts
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const baseUrl = "https://aimstrainingcenter.com/";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "AIMS Training Center | Professional Education & Development Abu Dhabi",
    template: "%s | AIMS Training Center"
  },
  description: "AIMS Training Center in Abu Dhabi offers specialized courses in OET, IELTS, PTE, Spoken English, Engineering (CAD/BIM), Finance, and IT. Enhance your professional skills with expert trainers.",
  keywords: ["OET Training Abu Dhabi", "IELTS Coaching Abu Dhabi", "PTE Academic UAE", "Spoken English Course", "Engineering Software Training", "BIM Courses Abu Dhabi", "AIMS Training Center"],
  authors: [{ name: "AIMS Training Center" }],
  creator: "AIMS Training Center",
  publisher: "AIMS Training Center",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "AIMS Training Center",
    title: "AIMS Training Center | Empowering Your Professional Journey",
    description: "Join Abu Dhabi's leading training center for OET, IELTS, and professional development courses.",
    images: [
      {
        url: "/images/og-image.png", // Make sure to create this or use a valid path
        width: 1200,
        height: 630,
        alt: "AIMS Training Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIMS Training Center | Professional Education & Development",
    description: "Specialized training center in Abu Dhabi offering OET, IELTS, PTE, and professional courses.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics / GTag */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTAG_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GTAG_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* Microsoft Clarity */}
        <Script
          id="clarity-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
            `,
          }}
        />

        {/* Ahrefs Analytics */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key={process.env.NEXT_PUBLIC_AHREFS_KEY}
          strategy="afterInteractive"
          async
        />
      </head>
      <body suppressHydrationWarning className={`${figtree.variable} antialiased font-figtree`}>
        <GoogleTranslate />
        <SmoothScroll>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <WhatsAppChat />
        </SmoothScroll>
      </body>
    </html>
  );
}
