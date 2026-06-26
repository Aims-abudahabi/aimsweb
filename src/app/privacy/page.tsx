import { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy | AIMS Training Center Abu Dhabi",
  description: "Read our Privacy Policy to understand how AIMS Training Center in Abu Dhabi collects, uses, and protects your personal data. We are committed to your privacy.",
  openGraph: {
    title: "AIMS Training Center Privacy Policy | Your Data Security",
    description: "Learn about our commitment to protecting your personal information and data rights.",
    url: "https://aimstrainingcenter.com/privacy",
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
