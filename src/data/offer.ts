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
        id: "engineering-cad-early-bird",
        eyebrow: "AIMS ENGINEERING TRACK",
        title: "Master AutoCAD & Revit BIM.",
        subtitle: "Starting from AED 750/course*",
        description:
            "Upgrade your engineering career with hands-on AutoCAD 2D/3D, Revit Architecture, and BIM training led by certified industry professionals in Abu Dhabi.",
        ctaText: "Claim Offer",
        ctaLink: "/contact",
        footnote: "*Limited-time enrollment offer for upcoming Abu Dhabi batches. Terms & conditions apply.",
        image: "/images/course-engineering-cad.png",
        imageAlt: "Engineering and CAD training offer at AIMS Abu Dhabi",
        badge: "25% OFF",
        validUntil: "Limited Time Offer",
        active: true,
    },
    {
        id: "finance-accounting-bundle",
        eyebrow: "FINANCE & VAT SPECIAL",
        title: "Career-Ready Accounting & UAE VAT.",
        subtitle: "Starting from AED 650/course*",
        description:
            "Get certified in Tally Prime, QuickBooks, SAP FICO, and UAE Corporate Tax & VAT compliance with flexible weekday and weekend batches.",
        ctaText: "Enroll Now",
        ctaLink: "/courses/finance-accounting",
        footnote: "*Includes practical case studies and ACTVET-approved training certificate.",
        image: "/images/course-finance-accounting.png",
        imageAlt: "Finance and accounting courses special offer",
        badge: "20% OFF",
        validUntil: "New Batch Open",
        active: true,
    },
    {
        id: "creative-design-pro",
        eyebrow: "CREATIVE STUDIO OFFER",
        title: "Design Your Future with Adobe Suite.",
        subtitle: "Starting from AED 700/course*",
        description:
            "Build a standout portfolio in Graphic Design, Motion Graphics, and 3D Visualization using Adobe Photoshop, Illustrator, and After Effects.",
        ctaText: "Explore Offer",
        ctaLink: "/courses/graphic-design-animation",
        footnote: "*Early-bird discount applies to full-track registrations in Abu Dhabi.",
        image: "/images/course-graphic-design.png",
        imageAlt: "Graphic design and animation offer at AIMS",
        badge: "EARLY BIRD",
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
