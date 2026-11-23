import type { Metadata } from "next";
import { coursesData } from "@/data/courses";
import CourseDetailClient from "./CourseDetailClient";

interface CoursePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { id } = await params;
  const course = coursesData[id];

  if (!course) {
    return {
      title: "Course Not Found",
      description:
        "Explore ACTVET-approved professional training courses at AIMS Training Center Abu Dhabi.",
      robots: { index: false, follow: true },
    };
  }

  const description = (course.overview || course.description).slice(0, 160);
  const canonicalPath = `/courses/${encodeURIComponent(course.id)}/`;

  return {
    title: `${course.title} Course in Abu Dhabi`,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${course.title} | AIMS Training Center Abu Dhabi`,
      description,
      url: `https://aimstrainingcenter.com${canonicalPath}`,
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: `${course.title} at AIMS Training Center Abu Dhabi`,
        },
      ],
    },
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = coursesData[id];

  const courseJsonLd = course
    ? {
        "@context": "https://schema.org",
        "@type": "Course",
        name: course.title,
        description: course.overview || course.description,
        provider: {
          "@type": "EducationalOrganization",
          name: "AIMS Training Center",
          sameAs: "https://aimstrainingcenter.com/",
        },
        educationalLevel: course.level,
        courseCode: course.id,
        url: `https://aimstrainingcenter.com/courses/${encodeURIComponent(course.id)}/`,
      }
    : null;

  return (
    <>
      {courseJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
        />
      )}
      <CourseDetailClient />
    </>
  );
}
