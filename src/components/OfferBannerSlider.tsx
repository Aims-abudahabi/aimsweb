"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import type { Offer } from "@/data/offer"
import OfferClaimModal from "@/components/OfferClaimModal"

interface OfferBannerSliderProps {
    offers: Offer[]
    /** "hero" for compact Home Hero placement; "page" for spacious /offers showcase */
    variant?: "hero" | "page"
    /** Auto-slide interval in milliseconds (default 5500ms) */
    autoPlayInterval?: number
}

export default function OfferBannerSlider({
    offers,
    variant = "hero",
    autoPlayInterval = 5500,
}: OfferBannerSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(1)
    const [isPaused, setIsPaused] = useState(false)
    const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)

    const count = offers.length

    const goToNext = useCallback(() => {
        if (count <= 1) return
        setDirection(1)
        setCurrentIndex((prev) => (prev + 1) % count)
    }, [count])

    const goToSlide = (index: number) => {
        if (index === currentIndex) return
        setDirection(index > currentIndex ? 1 : -1)
        setCurrentIndex(index)
    }

    useEffect(() => {
        if (count <= 1 || isPaused || selectedOffer) return
        const timer = setInterval(goToNext, autoPlayInterval)
        return () => clearInterval(timer)
    }, [count, isPaused, selectedOffer, autoPlayInterval, goToNext])

    if (count === 0) return null

    const safeIndex = currentIndex % count
    const currentOffer = offers[safeIndex]

    const hasImage = Boolean(currentOffer.image && currentOffer.image.trim().length > 0)
    const isHero = variant === "hero"
    const ctaHref = currentOffer.ctaLink?.trim() || "/offers"
    const ctaLabel = currentOffer.ctaText?.trim() || "View Offer"

    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 40 : -40,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (dir: number) => ({
            x: dir > 0 ? -40 : 40,
            opacity: 0,
        }),
    }

    return (
        <div
            className={`relative w-full overflow-hidden rounded-[12px] sm:rounded-[22px] md:rounded-[28px] border shadow-[0_12px_36px_rgba(15,23,42,0.12)] transition-shadow duration-300 hover:shadow-[0_16px_44px_rgba(15,23,42,0.16)] group ${hasImage
                ? "bg-[#0f172a] border-slate-800/70"
                : "bg-[#f5f5f7] border-slate-200/80"
                } ${isHero ? "max-w-[960px] mb-5 sm:mb-8" : "max-w-full"}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            aria-roledescription="carousel"
            aria-label="Special Offers"
        >
            {/* Proportional Banner Area (auto-scales smoothly on mobile & desktop with zero cropping) */}
            <div className="relative w-full aspect-[7671/1978]">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentOffer.id || safeIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full h-full"
                    >
                        {/* Full-Bleed Banner Image */}
                        {hasImage && (
                            <>
                                <img
                                    src={currentOffer.image}
                                    alt={currentOffer.imageAlt || currentOffer.title || "Special offer"}
                                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                                />
                                {/* Subtle bottom gradient solely to keep overlaid buttons & dots legible */}
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/15 to-transparent pointer-events-none" />
                            </>
                        )}

                        {/* Clickable Banner Trigger + Overlaid Action Buttons */}
                        <button
                            type="button"
                            onClick={() => setSelectedOffer(currentOffer)}
                            aria-label={currentOffer.imageAlt || currentOffer.title || "Claim special offer"}
                            className="absolute inset-0 z-10 cursor-pointer"
                        />

                        <div
                            className="absolute left-[66.5%] -translate-x-1/2 bottom-[13%] z-20 flex flex-nowrap items-center justify-center gap-1 sm:gap-2 md:gap-3"
                        >
                            <button
                                type="button"
                                onClick={() => setSelectedOffer(currentOffer)}
                                className={`inline-flex items-center justify-center whitespace-nowrap rounded-[5px] sm:rounded-lg md:rounded-xl font-semibold leading-none transition-all duration-200 active:scale-95 cursor-pointer ${isHero
                                    ? "px-2 py-1 sm:px-3.5 sm:py-1.5 md:px-5 md:py-2 text-[8px] sm:text-[11px] md:text-[13px]"
                                    : "px-2.5 py-1 sm:px-5 sm:py-2 md:px-7 md:py-2.5 text-[9px] sm:text-xs md:text-sm"
                                    } ${hasImage
                                        ? "bg-white text-slate-950 hover:bg-[#fffbf5] shadow-md"
                                        : "border border-slate-900 bg-slate-900 text-white hover:bg-[#794d00] hover:border-[#794d00]"
                                    }`}
                            >
                                {ctaLabel}
                            </button>

                            {isHero && ctaHref !== "/offers" && (
                                <Link
                                    href="/offers"
                                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-[5px] sm:rounded-lg md:rounded-xl font-semibold leading-none transition-colors px-2 py-1 sm:px-3.5 sm:py-1.5 md:px-5 md:py-2 text-[8px] sm:text-[11px] md:text-[13px] ${hasImage
                                        ? "border border-white/40 bg-black/35 backdrop-blur-sm text-white hover:bg-black/55"
                                        : "border border-slate-300 bg-white text-[#794d00] hover:bg-[#794d00]/10"
                                        }`}
                                >
                                    All Offers
                                </Link>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Pagination Dots */}
                {count > 1 && (
                    <div className="absolute bottom-1 sm:bottom-2 md:bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-1 sm:gap-2">
                        {offers.map((offer, idx) => (
                            <button
                                key={offer.id || idx}
                                type="button"
                                onClick={() => goToSlide(idx)}
                                aria-label={`Go to offer ${idx + 1}`}
                                aria-current={idx === safeIndex ? "true" : "false"}
                                className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === safeIndex
                                    ? hasImage
                                        ? "w-3.5 sm:w-5 md:w-6 bg-white"
                                        : "w-3.5 sm:w-5 md:w-6 bg-slate-900"
                                    : hasImage
                                        ? "w-1 sm:w-1.5 bg-white/45 hover:bg-white/80"
                                        : "w-1 sm:w-1.5 bg-slate-300 hover:bg-slate-400"
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Selected Offer Claim Popup */}
            <OfferClaimModal
                offer={selectedOffer}
                onClose={() => setSelectedOffer(null)}
            />
        </div>
    )
}
