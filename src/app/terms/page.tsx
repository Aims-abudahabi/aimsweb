import { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms of Service | AIMS Training Center Abu Dhabi",
  description: "Read the Terms of Service for AIMS Training Center in Abu Dhabi. Understand your rights and responsibilities when using our website and enrolling in our courses.",
  openGraph: {
    title: "AIMS Training Center Terms of Service | Legal Information",
    description: "Guidelines and terms for professional training at AIMS Training Center.",
    url: "https://aimstrainingcenter.com/terms",
  },
};

export default function TermsPage() {
  return <TermsClient />;
}
