import { Metadata } from "next";
import OffersClient from "./OffersClient";

export const metadata: Metadata = {
    title: "Special Offers & Promotions | AIMS Training Center Abu Dhabi",
    description:
        "Discover exclusive course discounts, early-bird savings, and seasonal training offers at AIMS Training Center in Abu Dhabi.",
    openGraph: {
        title: "Exclusive Training Offers | AIMS Training Center Abu Dhabi",
        description:
            "Save on ACTVET-approved Engineering, CAD, Finance, Accounting, IT, Graphic Design, and Language courses in Abu Dhabi.",
        url: "https://aimstrainingcenter.com/offers",
    },
};

export default function OffersPage() {
    return <OffersClient />;
}
