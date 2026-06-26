"use client"

import { useEffect, useRef } from "react"

declare var google: any;

interface GoogleMapProps {
    address: string
}

export default function GoogleMap({ address }: GoogleMapProps) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID

    if (!apiKey) {
        return (
            <section className="w-full h-[500px] bg-slate-900/10 flex items-center justify-center text-white/50 font-figtree">
                Map API Key missing
            </section>
        )
    }

    // Using Google Maps Embed API in 'place' mode to show the official Business Card (ratings, name, etc.)
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${placeId || 'ChIJH1GPIFlmXj4RGXfJA5vymIo'}&zoom=17`

    return (
        <section className="w-full h-[500px] relative overflow-hidden bg-slate-900/20">
            <iframe
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }}
                src={mapUrl}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AIMS Training Center Location"
            ></iframe>
        </section>
    )
}

declare global {
    interface Window {
        initMap: () => void
        google: any
    }
}
