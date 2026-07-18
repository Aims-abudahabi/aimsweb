import { NextResponse } from "next/server";

export const revalidate = 86400; // Cache for 24 hours

export async function GET() {
    try {
        const response = await fetch("https://ipwho.is/", {
            headers: {
                "User-Agent": "AIMS Training Center",
            },
            cache: "force-cache",
        });

        const data = await response.json();

        if (!data.success) {
            return NextResponse.json({
                city: "Abu Dhabi",
                country: "UAE",
            });
        }

        return NextResponse.json({
            city: data.city,
            country: data.country,
        });
    } catch {
        return NextResponse.json({
            city: "Abu Dhabi",
            country: "UAE",
        });
    }
}