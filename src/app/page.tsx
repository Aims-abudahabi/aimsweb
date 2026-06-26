import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Home | AIMS Training Center Abu Dhabi",
  description: "Welcome to AIMS Training Center, Abu Dhabi's premier destination for OET, IELTS, PTE, and professional development courses. Empower your future with us.",
  openGraph: {
    title: "AIMS Training Center | Empowering Your Professional Journey",
    description: "Join Abu Dhabi's leading training center for OET, IELTS, and professional development courses.",
    url: "https://aimstrainingcenter.com/",
    images: [
      {
        url: "/images/hero-home.png", // Use a relevant image if available
        width: 1200,
        height: 630,
        alt: "AIMS Training Center Home",
      },
    ],
  },
};

export default function Home() {
  return <HomeClient />;
}
