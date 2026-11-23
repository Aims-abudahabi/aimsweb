import type { Metadata } from "next";
import { blogPosts } from "@/data/blogs";
import BlogDetailClient from "./BlogDetailClient";

interface BlogPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ id: String(post.id) }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === Number(id));

  if (!post) {
    return {
      title: "Article Not Found",
      robots: { index: false, follow: true },
    };
  }

  const canonicalPath = `/blogs/${post.id}/`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "article",
      title: `${post.title} | AIMS Training Center`,
      description: post.excerpt,
      url: `https://aimstrainingcenter.com${canonicalPath}`,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === Number(id));

  const articleJsonLd = post
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: post.image,
        datePublished: post.date,
        author: {
          "@type": "Person",
          name: post.author.name,
        },
        publisher: {
          "@type": "Organization",
          name: "AIMS Training Center",
          logo: {
            "@type": "ImageObject",
            url: "https://aimstrainingcenter.com/images/aims-logo.png",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://aimstrainingcenter.com/blogs/${post.id}/`,
        },
      }
    : null;

  return (
    <>
      {articleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}
      <BlogDetailClient />
    </>
  );
}
