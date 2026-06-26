import { Metadata } from "next";
import EnrollClient from "./EnrollClient";

export const metadata: Metadata = {
  title: "Enroll Now | AIMS Training Center Abu Dhabi",
  description: "Take the first step towards your career goals. Enroll now at AIMS Training Center in Abu Dhabi for OET, IELTS, PTE, and professional development courses.",
  openGraph: {
    title: "Enroll at AIMS Training Center | Start Your Success Journey",
    description: "Join the next batch of professionals at Abu Dhabi's leading training center.",
    url: "https://aimstrainingcenter.com/enroll",
  },
};

export default function EnrollPage() {
  return <EnrollClient />;
}
