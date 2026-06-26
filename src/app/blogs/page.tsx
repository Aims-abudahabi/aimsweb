import { Metadata } from "next";
import BlogsClient from "./BlogsClient";

export const metadata: Metadata = {
  title: "Blogs & Insights | AIMS Training Center Abu Dhabi",
  description: "Read the latest articles and insights from AIMS Training Center. Stay informed about professional training trends and career development in the UAE.",
  openGraph: {
    title: "AIMS Training Center Blogs | Industry Insights & Career Tips",
    description: "Expert advice and news on OET, IELTS, and professional development in Abu Dhabi.",
    url: "https://aimstrainingcenter.com/blogs",
  },
};

export default function BlogsPage() {
  return <BlogsClient />;
}
