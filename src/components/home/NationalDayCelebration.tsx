"use client"

import { useEffect, useState } from "react"
import Fireworks from "@/components/home/Fireworks"

interface NationalDayCelebrationProps {
    /** How long (ms) to display the celebration before fading out (default: 20000ms). */
    duration?: number
    /** Fade-out transition length in ms (default: 1000ms). */
    fadeDuration?: number
}

const STORAGE_KEY = "aims_national_day_celebration_seen_2026"

const UAE_FIREWORKS_COLORS = [
    "#ff3b47", // UAE red
    "#00c853", // UAE green
    "#ffffff", // UAE white
    "#ffe66d", // gold
    "#ffb347", // warm amber
    "#7dd3fc", // celebratory sky
]

export default function NationalDayCelebration({
    duration = 20000,
    fadeDuration = 1000,
}: NationalDayCelebrationProps) {
    // Start hidden so repeat visits and SSR never flash the overlay
    const [phase, setPhase] = useState<"active" | "fading" | "hidden">("hidden")

    useEffect(() => {
        try {
            if (window.localStorage.getItem(STORAGE_KEY) === "1") {
                return
            }
            window.localStorage.setItem(STORAGE_KEY, "1")
        } catch {
            // If storage is unavailable, allow showing once for this mount
        }

        setPhase("active")

        const fadeTimer = setTimeout(() => {
            setPhase("fading")
        }, duration)

        const hideTimer = setTimeout(() => {
            setPhase("hidden")
        }, duration + fadeDuration)

        return () => {
            clearTimeout(fadeTimer)
            clearTimeout(hideTimer)
        }
    }, [duration, fadeDuration])

    if (phase === "hidden") return null

    const isFading = phase === "fading"

    return (
        <div
            aria-hidden="true"
            className={`fixed inset-0 z-[1100] pointer-events-none transition-opacity duration-1000 ease-out font-figtree ${
                isFading ? "opacity-0" : "opacity-100"
            }`}
        >
            {/* Dim page overlay while fireworks are playing */}
            <div className="absolute inset-0 bg-[#05060f]/85 backdrop-blur-[2px]" />

            {/* Transparent Fireworks Canvas */}
            <Fireworks
                colors={UAE_FIREWORKS_COLORS}
                className="absolute! inset-0 h-full w-full pointer-events-none bg-none!"
            />

            {/* Centered UAE National Day Greeting */}
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center">
                <div className="flex flex-col items-center gap-4 sm:gap-5 max-w-3xl">
                    {/* Greeting Text */}
                    <div className="space-y-2 sm:space-y-3">
                        <span className="inline-block text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.28em] text-amber-300 drop-shadow">
                            Eid Al Etihad · United Arab Emirates
                        </span>
                        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.05] text-white drop-shadow-[0_6px_28px_rgba(0,0,0,0.65)]">
                            Happy{" "}
                            <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                                National Day
                            </span>
                        </h2>
                    </div>

                    {/* Subtle UAE Accent Divider */}
                    <div className="flex items-center gap-1.5">
                        <span className="h-1 w-8 sm:w-10 rounded-full bg-[#EF3340]" />
                        <span className="h-1 w-8 sm:w-10 rounded-full bg-[#009739]" />
                        <span className="h-1 w-8 sm:w-10 rounded-full bg-white" />
                        <span className="h-1 w-8 sm:w-10 rounded-full bg-slate-900 border border-white/30" />
                    </div>
                </div>
            </div>
        </div>
    )
}
