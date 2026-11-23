import { Metadata } from "next";
import HomeClient from "./HomeClient";
import { buildHomepageJsonLd } from "@/lib/agentContent";

export const metadata: Metadata = {
  title: "Home | AIMS Training Center Abu Dhabi",
  description:
    "Welcome to AIMS Training Center, Abu Dhabi's ACTVET-licensed destination for OET, IELTS, PTE, Engineering CAD/BIM, Finance, IT, and professional development courses.",
  alternates: {
    canonical: "https://aimstrainingcenter.com/",
    types: {
      "text/markdown": "/api/markdown?path=%2F",
    },
  },
  openGraph: {
    title: "AIMS Training Center | Empowering Your Professional Journey",
    description:
      "Join Abu Dhabi's leading ACTVET-approved training center for Engineering, Finance, IT, OET, IELTS, and professional development courses.",
    url: "https://aimstrainingcenter.com/",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "AIMS Training Center Abu Dhabi",
      },
    ],
  },
};

export default function Home() {
  const jsonLd = buildHomepageJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}
