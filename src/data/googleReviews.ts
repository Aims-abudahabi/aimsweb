"use server"

export async function getGoogleRating() {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;

    // Fallback static data if environment variables are missing
    if (!apiKey || !placeId) {
        return { rating: "4.9", totalReviews: "1000+" };
    }

    try {
        const response = await fetch(
            `https://places.googleapis.com/v1/places/${placeId}?fields=rating,userRatingCount&key=${apiKey}`,
            { next: { revalidate: 3600 } } // Cache the response for 1 hour to prevent quota limits
        );
        const data = await response.json();
        
        if (data.rating && data.userRatingCount) {
             let totalReviewsStr = data.userRatingCount.toString();
             
             // Format large numbers cleanly (e.g., 2.5k+)
             if (data.userRatingCount >= 1000) {
                 totalReviewsStr = (data.userRatingCount / 1000).toFixed(1).replace('.0', '') + 'k+';
             }

             return {
                  rating: data.rating.toFixed(1),
                  totalReviews: totalReviewsStr
             }
        }
        
        return { rating: "4.9", totalReviews: "1000+" };
    } catch(err) {
        console.error("Failed to fetch Google Reviews:", err);
        return { rating: "4.9", totalReviews: "1000+" };
    }
}

export async function getGoogleReviews() {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
        return null;
    }

    try {
        const response = await fetch(
            `https://places.googleapis.com/v1/places/${placeId}?fields=rating,userRatingCount,reviews&key=${apiKey}`,
            { next: { revalidate: 3600 } }
        );
        const data = await response.json();
        
        if (data.reviews && Array.isArray(data.reviews)) {
            return data.reviews.map((rev: any) => ({
                text: rev.text?.text || rev.text || "",
                author: rev.authorAttribution?.displayName || "Google User",
                role: "Google Reviewer",
                avatar: rev.authorAttribution?.photoUri || null,
                verified: true,
                stars: rev.rating || 5,
                relativeTime: rev.relativePublishTimeDescription || ""
            }));
        }
        return null;
    } catch(err) {
        console.error("Failed to fetch Detailed Google Reviews:", err);
        return null;
    }
}
