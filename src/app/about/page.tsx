import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | AIMS Training Center Abu Dhabi",
  description: "Learn more about AIMS Training Center in Abu Dhabi. We are dedicated to providing high-quality professional training in OET, IELTS, PTE, and more to empower your career.",
  openGraph: {
    title: "About AIMS Training Center | Our Mission & Vision",
    description: "Dedicated to excellence in professional training and skill development in Abu Dhabi.",
    url: "https://aimstrainingcenter.com/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
