export interface Offer {
    id: string;
    /** Small label shown above the headline (e.g. "LIMITED TIME OFFER", "ENGINEERING & CAD") */
    eyebrow?: string;
    /** Main headline displayed prominently on the offer banner */
    title: string;
    /** Secondary line such as price or discount (e.g. "Starting from AED 750/mo*") */
    subtitle?: string;
    /** Optional longer description displayed on the /offers page */
    description?: string;
    /** CTA button label (e.g. "Enroll Now", "Claim Offer", "Buy") */
    ctaText?: string;
    /** Destination link when clicking the CTA button */
    ctaLink?: string;
    /** Small terms or validity note at the bottom of the banner */
    footnote?: string;
    /** Offer visual path (local path from /public or external URL) */
    image?: string;
    /** Accessible alt text for the offer image */
    imageAlt?: string;
    /** Highlight badge shown on the /offers page cards (e.g. "25% OFF") */
    badge?: string;
    /** Optional validity date text shown on the /offers page */
    validUntil?: string;
    /** Set to false to temporarily hide an offer without deleting it */
    active?: boolean;
}

/**
 * Offers managed here appear on the `/offers` page and slide automatically
 * in the Home Hero section (replacing the "#1 Professional Training Center in Abu Dhabi" badge).
 *
 * If this array is empty—or if all active offers have both empty image and empty text—
 * the Home Hero automatically falls back to displaying "#1 Professional Training Center in Abu Dhabi".
 */
export const offers: Offer[] = [
    {
        id: "ielts-super-promo-50-off",
        eyebrow: "IELTS SPECIAL OFFER",
        title: "IELTS Preparation Course",
        subtitle: "AED 680 only (Was AED 1,350) — 50% OFF",
        description:
            "World-renowned English proficiency training for study and migration. Prepare for IELTS Academic & General Training with expert instructors, mock exams, and targeted band-score coaching in Abu Dhabi.",
        ctaText: "Claim Offer",
        ctaLink: "/courses/language-courses",
        footnote: "*Limited-time 50% off promotional fee (AED 680 instead of AED 1,350) for upcoming Abu Dhabi batches. Terms & conditions apply.",
        image: "/images/offer/c1.png",
        imageAlt: "IELTS Super Promo Sale — 50% OFF, AED 680 only at AIMS Training Center Abu Dhabi",
        badge: "50% OFF",
        validUntil: "Limited Time Offer",
        active: true,
    },
    {
        id: "adobe-design-buy-1-get-1-free",
        eyebrow: "CREATIVE DESIGN PROMO",
        title: "Adobe Suite, 3D Animation & Motion Graphics",
        subtitle: "Buy 1 Get 1 FREE at a Lower Price",
        description:
            "Professional visual communication using Adobe Photoshop, Illustrator, Premiere Pro, After Effects, 3D Animation, and Motion Graphics. Enroll now and unlock our Buy 1 Get 1 Free training bundle in Abu Dhabi.",
        ctaText: "Enroll Now",
        ctaLink: "/courses/graphic-design-animation",
        footnote: "*Buy 1 Get 1 Free applies to eligible Graphic Design, Adobe Suite, and Motion Graphics courses. Terms & conditions apply.",
        image: "/images/offer/c2.png",
        imageAlt: "Graphic Design & Adobe Suite Super Promo Sale — Buy 1 Get 1 Free at AIMS Abu Dhabi",
        badge: "BUY 1 GET 1 FREE",
        validUntil: "New Batch Open",
        active: true,
    },
    {
        id: "office-administration-40-off",
        eyebrow: "OFFICE ADMINISTRATION PROMO",
        title: "Office Administration & MS Office Suite",
        subtitle: "40% OFF All Courses",
        description:
            "Essential mastery of Microsoft Word, Excel, PowerPoint, and Outlook for modern office work. Build practical corporate administration skills with 40% off across Office Administration courses at AIMS Abu Dhabi.",
        ctaText: "Explore Offer",
        ctaLink: "/courses/office-administration",
        footnote: "*40% discount valid on Office Administration & MS Office enrollments in Abu Dhabi. Terms & conditions apply.",
        image: "/images/offer/c3.png",
        imageAlt: "Office Administration Super Promo Sale — 40% OFF all courses at AIMS Abu Dhabi",
        badge: "40% OFF",
        validUntil: "Seats Filling Fast",
        active: true,
    },
];

/**
 * Checks whether an offer is active and contains at least an image or meaningful text.
 */
export function hasOfferContent(offer: Offer): boolean {
    if (offer.active === false) return false;

    const hasImage = Boolean(offer.image && offer.image.trim().length > 0);
    const hasText = Boolean(
        (offer.title && offer.title.trim().length > 0) ||
        (offer.subtitle && offer.subtitle.trim().length > 0) ||
        (offer.eyebrow && offer.eyebrow.trim().length > 0)
    );

    return hasImage || hasText;
}

/**
 * Returns only active offers that have non-empty image or text content.
 */
export function getActiveOffers(): Offer[] {
    return offers.filter(hasOfferContent);
}
