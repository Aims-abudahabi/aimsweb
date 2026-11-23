import { coursesData, type Course } from "@/data/courses";
import { blogPosts } from "@/data/blogs";
import { getActiveOffers } from "@/data/offer";

export const SITE_URL = "https://aimstrainingcenter.com";

export const ORGANIZATION_INFO = {
  name: "AIMS Training Center",
  alternateName: "AIMS Training Center Abu Dhabi",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/images/aims-logo.png`,
  image: `${SITE_URL}/images/og-image.png`,
  description:
    "ACTVET-licensed professional training center in Abu Dhabi, UAE (established 2010) offering 50+ accredited courses in Engineering & CAD, Finance & Accounting, Office Administration, Graphic Design & Animation, IT & Networking, Project Management, Soft Skills, and Languages (OET, IELTS, PTE).",
  foundingDate: "2010",
  telephone: "+971-2-672-4334",
  telephoneDisplay: "+971 2 672 4334",
  email: "contactus@edu-aims.com",
  priceRange: "$$",
  address: {
    streetAddress:
      "Lulu Express Building, Benkaram Tower - Mezzanine 02 - Hamdan Bin Mohammed St",
    addressLocality: "Abu Dhabi",
    addressRegion: "Abu Dhabi",
    addressCountry: "AE",
    formatted:
      "Lulu Express Building, Benkaram Tower - Mezzanine 02 - Hamdan Bin Mohammed St, Abu Dhabi, UAE",
  },
  geo: {
    latitude: 24.4892,
    longitude: 54.3652,
  },
  accreditation:
    "ACTVET (Abu Dhabi Centre for Technical and Vocational Education and Training)",
  sameAs: [
    "https://www.facebook.com/share/18BgQojbuX/",
    "https://x.com/AimsTrainingCen",
    "https://www.linkedin.com/in/aims-training-center/",
    "https://www.instagram.com/aims.training.center",
    "https://www.youtube.com/channel/UCujIydyHEVpkjxQQkXrMWDQ",
  ],
};

export const HOMEPAGE_FAQS = [
  {
    question: "Is AIMS Training Center ACTVET Licensed?",
    answer:
      "Yes, AIMS Training Center is fully licensed by the Abu Dhabi Centre for Technical and Vocational Education and Training (ACTVET). This licensure ensures that our programs meet the highest quality standards for technical and vocational education in Abu Dhabi, providing students with credible, government-recognized certifications.",
  },
  {
    question: "Will I get a certificate after completing the course?",
    answer:
      "Yes, you will receive an industry-recognized certificate from AIMS Training Center upon successful completion of your course and any associated assessments.",
  },
  {
    question: "Do you provide job placement support?",
    answer:
      "Absolutely. We have a dedicated career support team that helps with resume building, interview preparation, and connecting you with our network of industry partners in Abu Dhabi.",
  },
  {
    question: "Can I pay in installments?",
    answer:
      "Yes, we offer flexible payment plans for most of our professional courses to make quality education more accessible to everyone.",
  },
  {
    question: "I'm working / studying. Can I still join?",
    answer:
      "Yes! We offer flexible schedules including evening and weekend batches specifically designed for working professionals and students.",
  },
];

const FEATURED_COURSE_IDS = [
  "engineering-cad",
  "office-administration",
  "graphic-design-animation",
  "finance-accounting",
  "network-it",
  "language-courses",
];

function stripHtml(html: string): string {
  return html
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<h3[^>]*>/gi, "### ")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<li[^>]*>/gi, "- ")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function buildHomepageJsonLd() {
  const featuredCourses = FEATURED_COURSE_IDS.map((id) => coursesData[id]).filter(
    (c): c is Course => Boolean(c)
  );
  const addressNode = {
    "@type": "PostalAddress",
    streetAddress: ORGANIZATION_INFO.address.streetAddress,
    addressLocality: ORGANIZATION_INFO.address.addressLocality,
    addressRegion: ORGANIZATION_INFO.address.addressRegion,
    addressCountry: ORGANIZATION_INFO.address.addressCountry,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: ORGANIZATION_INFO.name,
        alternateName: ORGANIZATION_INFO.alternateName,
        url: ORGANIZATION_INFO.url,
        logo: ORGANIZATION_INFO.logo,
        image: ORGANIZATION_INFO.image,
        description: ORGANIZATION_INFO.description,
        foundingDate: ORGANIZATION_INFO.foundingDate,
        telephone: ORGANIZATION_INFO.telephone,
        email: ORGANIZATION_INFO.email,
        address: addressNode,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: ORGANIZATION_INFO.telephone,
          email: ORGANIZATION_INFO.email,
          contactType: "admissions",
          areaServed: "AE",
          availableLanguage: ["English", "Arabic"],
        },
        sameAs: ORGANIZATION_INFO.sameAs,
      },
      {
        "@type": ["LocalBusiness", "EducationalOrganization"],
        "@id": `${SITE_URL}/#localbusiness`,
        name: ORGANIZATION_INFO.name,
        url: ORGANIZATION_INFO.url,
        image: ORGANIZATION_INFO.image,
        telephone: ORGANIZATION_INFO.telephone,
        email: ORGANIZATION_INFO.email,
        priceRange: ORGANIZATION_INFO.priceRange,
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
        address: addressNode,
        geo: {
          "@type": "GeoCoordinates",
          latitude: ORGANIZATION_INFO.geo.latitude,
          longitude: ORGANIZATION_INFO.geo.longitude,
        },
        openingHours: "Mo-Su 09:00-21:00",
        sameAs: ORGANIZATION_INFO.sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: ORGANIZATION_INFO.url,
        name: ORGANIZATION_INFO.name,
        inLanguage: ["en", "ar"],
        publisher: { "@id": `${SITE_URL}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/courses/?category={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: ORGANIZATION_INFO.url,
        name: "AIMS Training Center | Professional Education & Development Abu Dhabi",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#featured-courses`,
        name: "Featured Training Programs",
        itemListElement: featuredCourses.map((course, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "Course",
            name: course.title,
            description: course.description,
            url: `${SITE_URL}/courses/${encodeURIComponent(course.id)}/`,
            provider: { "@id": `${SITE_URL}/#organization` },
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: HOMEPAGE_FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };
}

export function renderPageMarkdown(rawPath: string): {
  markdown: string;
  status: number;
  canonicalPath: string;
} {
  const normalized =
    rawPath === "/" ? "/" : `/${rawPath.replace(/^\/+|\/+$/g, "")}`;

  // Home
  if (normalized === "/") {
    const activeOffers = getActiveOffers();
    const featured = FEATURED_COURSE_IDS.map((id) => coursesData[id]).filter(
      (c): c is Course => Boolean(c)
    );

    const lines = [
      `# AIMS Training Center — Abu Dhabi, UAE`,
      ``,
      `> ${ORGANIZATION_INFO.description}`,
      ``,
      `## Key Facts`,
      `- **Established:** ${ORGANIZATION_INFO.foundingDate}`,
      `- **Accreditation:** ${ORGANIZATION_INFO.accreditation}`,
      `- **Graduates Trained:** 10,000+ professionals`,
      `- **Programs:** 50+ specialized technical, vocational, and soft skills courses`,
      `- **Location:** ${ORGANIZATION_INFO.address.formatted}`,
      `- **Phone:** ${ORGANIZATION_INFO.telephoneDisplay}`,
      `- **Email:** ${ORGANIZATION_INFO.email}`,
      ``,
      `## Featured Training Tracks`,
      ...featured.map(
        (c) =>
          `- **[${c.title}](${SITE_URL}/courses/${c.id}/)** (${c.level} · ${c.duration}): ${c.description}`
      ),
      ``,
      `## Active Special Offers`,
      ...(activeOffers.length > 0
        ? activeOffers.map(
            (o) =>
              `- **${o.title}**${o.badge ? ` (${o.badge})` : ""}${o.subtitle ? ` — ${o.subtitle}` : ""}: ${o.description || ""} ([Details](${SITE_URL}/offers/))`
          )
        : [`- Contact admissions for current batch pricing and corporate group offers.`]),
      ``,
      `## Why Choose AIMS Training Center`,
      `- **ACTVET Licensed:** Government-recognized vocational and professional training in Abu Dhabi.`,
      `- **Industry-Expert Trainers:** Hands-on instruction using current enterprise software and real project workflows.`,
      `- **Flexible Scheduling:** Weekday, evening, weekend, and online live cohorts for working professionals.`,
      `- **Career & Placement Support:** Resume reviews, interview preparation, and corporate network introductions.`,
      ``,
      `## Frequently Asked Questions`,
      ...HOMEPAGE_FAQS.flatMap((faq) => [
        `### ${faq.question}`,
        faq.answer,
        ``,
      ]),
      `## Navigation`,
      `- [All Courses](${SITE_URL}/courses/)`,
      `- [About AIMS](${SITE_URL}/about/)`,
      `- [Special Offers](${SITE_URL}/offers/)`,
      `- [Blogs & Insights](${SITE_URL}/blogs/)`,
      `- [Enroll](${SITE_URL}/enroll/)`,
      `- [Contact Us](${SITE_URL}/contact/)`,
      `- [llms.txt](${SITE_URL}/llms.txt)`,
      `- [MCP Server Card](${SITE_URL}/.well-known/mcp/server-card.json)`,
    ];

    return { markdown: lines.join("\n"), status: 200, canonicalPath: "/" };
  }

  // About
  if (normalized === "/about") {
    const lines = [
      `# About AIMS Training Center`,
      ``,
      `> Empowering professionals in Abu Dhabi since 2010 through specialized ACTVET-approved training in Technical, Vocational, and Soft Skills development.`,
      ``,
      `## Mission & Vision`,
      `- **Mission:** Deliver practical, job-ready professional education backed by experienced industry trainers, modern labs, and UAE-recognized certifications.`,
      `- **Vision:** Be Abu Dhabi's premier career acceleration partner for individuals and corporate teams.`,
      ``,
      `## Institutional Highlights`,
      `- **Established:** 2010`,
      `- **Graduates:** 10,000+`,
      `- **Accreditation:** ACTVET Licensed`,
      `- **Corporate Brochure:** [Download AIMS Business Profile PDF](${SITE_URL}/doc/Aims%20Business%20Profile_AIC.pdf)`,
      ``,
      `## Contact`,
      `- **Address:** ${ORGANIZATION_INFO.address.formatted}`,
      `- **Phone:** ${ORGANIZATION_INFO.telephoneDisplay}`,
      `- **Email:** ${ORGANIZATION_INFO.email}`,
    ];
    return { markdown: lines.join("\n"), status: 200, canonicalPath: "/about/" };
  }

  // Courses catalog
  if (normalized === "/courses") {
    const allCourses = Object.values(coursesData).filter(
      (c) => !FEATURED_COURSE_IDS.includes(c.id)
    );
    const byCategory = new Map<string, Course[]>();
    for (const course of allCourses) {
      const list = byCategory.get(course.category) ?? [];
      list.push(course);
      byCategory.set(course.category, list);
    }

    const lines = [
      `# AIMS Training Center — Course Catalog`,
      ``,
      `> Explore ${allCourses.length}+ ACTVET-approved training courses in Abu Dhabi.`,
      ``,
    ];

    for (const [category, courses] of byCategory.entries()) {
      lines.push(`## ${category}`);
      for (const c of courses) {
        lines.push(
          `- **[${c.title}](${SITE_URL}/courses/${c.id}/)** (${c.duration} · ${c.level}): ${c.description}`
        );
      }
      lines.push(``);
    }

    return {
      markdown: lines.join("\n"),
      status: 200,
      canonicalPath: "/courses/",
    };
  }

  // Course detail
  if (normalized.startsWith("/courses/")) {
    const id = decodeURIComponent(normalized.slice("/courses/".length));
    const course = coursesData[id];
    if (!course) {
      return {
        markdown: `# Course Not Found\n\nNo course found for \`${id}\`. Browse [all courses](${SITE_URL}/courses/).`,
        status: 404,
        canonicalPath: `/courses/${encodeURIComponent(id)}/`,
      };
    }

    const syllabus = course.whatYouWillLearn ?? course.curriculum ?? [];
    const lines = [
      `# ${course.title}`,
      ``,
      `> ${course.description}`,
      ``,
      `- **Category:** ${course.category}`,
      `- **Duration:** ${course.duration}`,
      `- **Level:** ${course.level}`,
      `- **Batches:** ${course.seats || "Available"}`,
      `- **Accreditation:** ACTVET Approved — Abu Dhabi, UAE`,
      `- **URL:** ${SITE_URL}/courses/${course.id}/`,
      ``,
      `## Overview`,
      course.overview ?? course.description,
      ``,
      `## What You Will Learn`,
      ...syllabus.map((item, i) => `${i + 1}. ${item}`),
      ``,
    ];

    if (course.courseHighlights?.length) {
      lines.push(
        `## Course Highlights`,
        ...course.courseHighlights.map((h) => `- ${h}`),
        ``
      );
    }

    if (course.prerequisite) {
      lines.push(`## Prerequisite`, course.prerequisite, ``);
    }

    if (course.courseIsFor?.length) {
      lines.push(
        `## Who Should Attend`,
        ...course.courseIsFor.map((item) => `- ${item}`),
        ``
      );
    }

    lines.push(
      `## Enroll or Request Brochure`,
      `Submit an enquiry at [Contact Us](${SITE_URL}/contact/) or call ${ORGANIZATION_INFO.telephoneDisplay}.`
    );

    return {
      markdown: lines.join("\n"),
      status: 200,
      canonicalPath: `/courses/${course.id}/`,
    };
  }

  // Offers
  if (normalized === "/offers") {
    const activeOffers = getActiveOffers();
    const lines = [
      `# Special Offers — AIMS Training Center Abu Dhabi`,
      ``,
      `> Limited-time course discounts, early-bird savings, and career bundles.`,
      ``,
      ...(activeOffers.length > 0
        ? activeOffers.flatMap((o) => [
            `## ${o.title}${o.badge ? ` (${o.badge})` : ""}`,
            o.subtitle ? `**${o.subtitle}**` : "",
            o.description || "",
            o.validUntil ? `- **Availability:** ${o.validUntil}` : "",
            o.footnote ? `- *${o.footnote}*` : "",
            `- **Action:** ${SITE_URL}${o.ctaLink || "/contact"}`,
            ``,
          ])
        : [`No active offers right now. Contact admissions at ${ORGANIZATION_INFO.email}.`]),
    ].filter((l) => l !== undefined);

    return {
      markdown: lines.join("\n"),
      status: 200,
      canonicalPath: "/offers/",
    };
  }

  // Blogs index
  if (normalized === "/blogs") {
    const lines = [
      `# Blogs & Insights — AIMS Training Center`,
      ``,
      `> Exam preparation guides (OET, IELTS) and UAE career growth strategies.`,
      ``,
      ...blogPosts.map(
        (p) =>
          `- **[${p.title}](${SITE_URL}/blogs/${p.id}/)** (${p.category} · ${p.date} · By ${p.author.name}): ${p.excerpt}`
      ),
    ];
    return { markdown: lines.join("\n"), status: 200, canonicalPath: "/blogs/" };
  }

  // Blog detail
  if (normalized.startsWith("/blogs/")) {
    const idStr = normalized.slice("/blogs/".length);
    const post = blogPosts.find((p) => String(p.id) === idStr);
    if (!post) {
      return {
        markdown: `# Article Not Found\n\nBrowse all articles at [${SITE_URL}/blogs/](${SITE_URL}/blogs/).`,
        status: 404,
        canonicalPath: `/blogs/${idStr}/`,
      };
    }

    const lines = [
      `# ${post.title}`,
      ``,
      `> ${post.excerpt}`,
      ``,
      `- **Category:** ${post.category}`,
      `- **Author:** ${post.author.name}`,
      `- **Published:** ${post.date}`,
      `- **URL:** ${SITE_URL}/blogs/${post.id}/`,
      ``,
      stripHtml(post.content),
    ];

    return {
      markdown: lines.join("\n"),
      status: 200,
      canonicalPath: `/blogs/${post.id}/`,
    };
  }

  // Enroll & Contact
  if (normalized === "/enroll" || normalized === "/contact") {
    const isEnroll = normalized === "/enroll";
    const lines = [
      `# ${isEnroll ? "Enroll at AIMS Training Center" : "Contact AIMS Training Center"}`,
      ``,
      `> Reach our Abu Dhabi admissions team to reserve your seat or request corporate training packages.`,
      ``,
      `- **Phone:** ${ORGANIZATION_INFO.telephoneDisplay}`,
      `- **Email:** ${ORGANIZATION_INFO.email}`,
      `- **Address:** ${ORGANIZATION_INFO.address.formatted}`,
      `- **Form API:** \`POST ${SITE_URL}/api/contact\` (fields: \`name\`, \`email\`, \`contact\`, \`course\`, optional \`location\`)`,
    ];
    return {
      markdown: lines.join("\n"),
      status: 200,
      canonicalPath: `${normalized}/`,
    };
  }

  return {
    markdown: `# AIMS Training Center\n\nVisit [${SITE_URL}/](${SITE_URL}/) or read [${SITE_URL}/llms.txt](${SITE_URL}/llms.txt).`,
    status: 200,
    canonicalPath: `${normalized}/`,
  };
}
