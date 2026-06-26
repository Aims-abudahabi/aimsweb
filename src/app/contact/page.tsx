import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | AIMS Training Center Abu Dhabi",
  description: "Get in touch with AIMS Training Center in Abu Dhabi. Contact us for inquiries about OET, IELTS, PTE, and professional development courses. We are here to help you.",
  openGraph: {
    title: "Contact AIMS Training Center | Reach Out to Us",
    description: "Have questions? Our team is ready to assist you with your professional training needs.",
    url: "https://aimstrainingcenter.com/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
