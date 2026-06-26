import { Metadata } from "next";
import CoursesClient from "./CoursesClient";

export const metadata: Metadata = {
  title: "Professional Courses | AIMS Training Center Abu Dhabi",
  description: "Explore our wide range of professional courses at AIMS Training Center. From Engineering and CAD to Language and Soft Skills, we have the right program for your career growth.",
  openGraph: {
    title: "AIMS Training Center Courses | Engineering, IT, Language & More",
    description: "Upgrade your skills with our industry-led professional training programs in Abu Dhabi.",
    url: "https://aimstrainingcenter.com/courses",
  },
};

export default function CoursesPage() {
  return <CoursesClient />;
}
