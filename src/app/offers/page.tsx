import type { Metadata } from "next";
import { getActiveOffers } from "@/data/offer";
import { ORGANIZATION_INFO, SITE_URL } from "@/lib/agentContent";
import OffersClient from "./OffersClient";

function extractAedPrice(text?: string): string | undefined {
  if (!text) return undefined;
  const match = text.match(/AED\s*([\d,]+(?:\.\d+)?)/i);
  return match ? match[1].replace(/,/g, "") : undefined;
}

export function generateMetadata(): Metadata {
  const activeOffers = getActiveOffers();

  const offerSummaries = activeOffers.map((o) =>
    [o.title, o.badge].filter(Boolean).join(" — ")
  );

  const dynamicDescription =
    activeOffers.length > 0
      ? `Exclusive Abu Dhabi course promotions at AIMS Training Center: ${offerSummaries.join(" | ")}. ACTVET-approved training with flexible batches.`
      : "Discover exclusive course discounts, early-bird savings, and seasonal training offers at AIMS Training Center in Abu Dhabi.";

  const dynamicKeywords = [
    "AIMS Training Center Offers Abu Dhabi",
    "Course Discounts Abu Dhabi",
    "ACTVET Approved Training Offers",
    ...activeOffers.flatMap((o) =>
      [
        `${o.title} Offer Abu Dhabi`,
        o.badge ? `${o.title} ${o.badge}` : "",
        o.eyebrow || "",
      ].filter(Boolean)
    ),
  ];

  const canonicalUrl = `${SITE_URL}/offers/`;

  return {
    title: "Special Offers & Course Discounts Abu Dhabi",
    description: dynamicDescription.slice(0, 160),
    keywords: dynamicKeywords,
    alternates: {
      canonical: canonicalUrl,
      types: {
        "text/markdown": "/api/markdown?path=%2Foffers",
      },
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      siteName: ORGANIZATION_INFO.name,
      title: "Special Offers & Course Discounts | AIMS Training Center Abu Dhabi",
      description: dynamicDescription.slice(0, 200),
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: "Special Course Offers at AIMS Training Center Abu Dhabi",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Special Offers & Course Discounts | AIMS Training Center Abu Dhabi",
      description: dynamicDescription.slice(0, 200),
      images: ["/images/og-image.png"],
    },
  };
}

export default function OffersPage() {
  const activeOffers = getActiveOffers();
  const canonicalUrl = `${SITE_URL}/offers/`;

  const offersJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: "Special Offers & Course Discounts | AIMS Training Center Abu Dhabi",
        description:
          "Current ACTVET-approved course promotions, discounts, and bundle offers at AIMS Training Center in Abu Dhabi.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${canonicalUrl}#offer-catalog` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Offers",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        "@id": `${canonicalUrl}#offer-catalog`,
        name: "AIMS Training Center Active Course Offers",
        itemListElement: activeOffers.map((offer, index) => {
          const price = extractAedPrice(offer.subtitle);
          const imageUrl = offer.image
            ? offer.image.startsWith("http")
              ? offer.image
              : `${SITE_URL}${offer.image}`
            : ORGANIZATION_INFO.image;

          return {
            "@type": "Offer",
            position: index + 1,
            name: offer.badge ? `${offer.title} (${offer.badge})` : offer.title,
            description: offer.description || offer.subtitle || offer.title,
            url: `${canonicalUrl}#${encodeURIComponent(offer.id)}`,
            image: imageUrl,
            availability: "https://schema.org/InStock",
            ...(price ? { price, priceCurrency: "AED" } : {}),
            seller: {
              "@type": "EducationalOrganization",
              name: ORGANIZATION_INFO.name,
              url: ORGANIZATION_INFO.url,
            },
            itemOffered: {
              "@type": "Course",
              name: offer.title,
              description: offer.description || offer.title,
              provider: {
                "@type": "EducationalOrganization",
                name: ORGANIZATION_INFO.name,
                url: ORGANIZATION_INFO.url,
              },
            },
          };
        }),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offersJsonLd) }}
      />
      <OffersClient />
    </>
  );
}
