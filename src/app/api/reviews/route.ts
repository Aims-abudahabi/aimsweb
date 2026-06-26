import { NextResponse } from "next/server"

export async function GET() {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID

    if (!apiKey || !placeId) {
        return NextResponse.json([], { status: 200 })
    }

    try {
        const response = await fetch(
            `https://places.googleapis.com/v1/places/${placeId}?fields=reviews&key=${apiKey}`,
            { next: { revalidate: 3600 } }
        )
        const data = await response.json()

        if (data.reviews && Array.isArray(data.reviews)) {
            const reviews = data.reviews.map((rev: any) => ({
                text: rev.text?.text || rev.text || "",
                author: rev.authorAttribution?.displayName || "Google User",
                avatar: rev.authorAttribution?.photoUri || null,
                verified: true,
                stars: rev.rating || 5,
                relativeTime: rev.relativePublishTimeDescription || "",
            }))
            return NextResponse.json(reviews)
        }

        return NextResponse.json([])
    } catch (err) {
        console.error("Failed to fetch Google Reviews:", err)
        return NextResponse.json([])
    }
}
