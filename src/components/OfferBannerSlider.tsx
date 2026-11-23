"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import type { Offer } from "@/data/offer"

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
        if (count <= 1 || isPaused) return
        const timer = setInterval(goToNext, autoPlayInterval)
        return () => clearInterval(timer)
    }, [count, isPaused, autoPlayInterval, goToNext])

    if (count === 0) return null

    const safeIndex = currentIndex % count
    const currentOffer = offers[safeIndex]

    const hasImage = Boolean(currentOffer.image && currentOffer.image.trim().length > 0)
    const hasText = Boolean(
        (currentOffer.title && currentOffer.title.trim().length > 0) ||
        (currentOffer.subtitle && currentOffer.subtitle.trim().length > 0) ||
        (currentOffer.eyebrow && currentOffer.eyebrow.trim().length > 0)
    )

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
            className={`relative w-full overflow-hidden rounded-[24px] sm:rounded-[28px] border shadow-[0_12px_36px_rgba(15,23,42,0.12)] transition-shadow duration-300 hover:shadow-[0_16px_44px_rgba(15,23,42,0.16)] group ${
                hasImage
                    ? "bg-[#0f172a] border-slate-800/70"
                    : "bg-[#f5f5f7] border-slate-200/80"
            } ${isHero ? "max-w-[960px] mb-8" : "max-w-full"}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            aria-roledescription="carousel"
            aria-label="Special Offers"
        >
            {/* Slide Content Area */}
            <div
                className={`relative w-full ${
                    isHero
                        ? "min-h-[205px] sm:min-h-[225px]"
                        : "min-h-[260px] sm:min-h-[320px]"
                } flex items-center justify-center`}
            >
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentOffer.id || safeIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full h-full flex items-center justify-center"
                    >
                        {/* Full-Bleed Background Image Layer */}
                        {hasImage && (
                            <>
                                <img
                                    src={currentOffer.image}
                                    alt={currentOffer.imageAlt || currentOffer.title || "Special offer"}
                                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                                />
                                {hasText && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/85 via-[#0f172a]/70 to-[#0f172a]/75 pointer-events-none" />
                                )}
                            </>
                        )}

                        {hasImage && !hasText ? (
                            /* Image-only full clickable banner mode */
                            <Link
                                href={ctaHref}
                                className={`relative z-10 block w-full ${
                                    isHero ? "min-h-[205px] sm:min-h-[225px]" : "min-h-[260px] sm:min-h-[320px]"
                                }`}
                                aria-label={currentOffer.imageAlt || "View special offer"}
                            />
                        ) : (
                            /* Foreground Offer Content */
                            <div
                                className={`relative z-10 w-full flex flex-col items-center text-center max-w-2xl mx-auto ${
                                    isHero
                                        ? "px-6 sm:px-10 md:px-12 pt-6 pb-10 sm:pt-7 sm:pb-11"
                                        : "px-6 sm:px-10 md:px-14 pt-9 pb-12 sm:pt-11 sm:pb-14"
                                }`}
                            >
                                {/* Eyebrow & Badge */}
                                {(currentOffer.eyebrow?.trim() || currentOffer.badge?.trim()) && (
                                    <div className="flex flex-wrap items-center justify-center gap-2 mb-2 sm:mb-2.5">
                                        {currentOffer.badge && currentOffer.badge.trim() && (
                                            <span
                                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase ${
                                                    hasImage
                                                        ? "bg-[#794d00] text-white shadow-sm"
                                                        : "bg-slate-900 text-white"
                                                }`}
                                            >
                                                {currentOffer.badge}
                                            </span>
                                        )}
                                        {currentOffer.eyebrow && currentOffer.eyebrow.trim() && (
                                            <span
                                                className={`font-extrabold tracking-[0.18em] uppercase ${
                                                    isHero ? "text-[10px] sm:text-xs" : "text-xs sm:text-[13px]"
                                                } ${hasImage ? "text-amber-300" : "text-[#794d00]"}`}
                                            >
                                                {currentOffer.eyebrow}
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Headline */}
                                {currentOffer.title && currentOffer.title.trim() && (
                                    <h2
                                        className={`font-extrabold tracking-tight leading-[1.12] ${
                                            isHero
                                                ? "text-xl sm:text-3xl md:text-[34px]"
                                                : "text-2xl sm:text-4xl md:text-[44px]"
                                        } ${hasImage ? "text-white drop-shadow-sm" : "text-slate-950"}`}
                                    >
                                        {currentOffer.title}
                                    </h2>
                                )}

                                {/* Subtitle / Price */}
                                {currentOffer.subtitle && currentOffer.subtitle.trim() && (
                                    <p
                                        className={`font-medium mt-2 ${
                                            isHero ? "text-xs sm:text-sm md:text-base" : "text-sm sm:text-base md:text-lg"
                                        } ${hasImage ? "text-slate-200" : "text-slate-600"}`}
                                    >
                                        {currentOffer.subtitle}
                                    </p>
                                )}

                                {/* Action Buttons */}
                                <div
                                    className={`flex flex-wrap items-center justify-center gap-2.5 ${
                                        isHero ? "mt-4" : "mt-6"
                                    }`}
                                >
                                    <Link
                                        href={ctaHref}
                                        className={`inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 active:scale-95 ${
                                            isHero
                                                ? "px-5 py-1.5 text-xs sm:text-[13px]"
                                                : "px-7 py-2.5 text-sm"
                                        } ${
                                            hasImage
                                                ? "bg-white text-slate-950 hover:bg-[#fffbf5] shadow-md"
                                                : "border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
                                        }`}
                                    >
                                        {ctaLabel}
                                    </Link>

                                    {isHero && ctaHref !== "/offers" && (
                                        <Link
                                            href="/offers"
                                            className={`inline-flex items-center justify-center rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                                                hasImage
                                                    ? "border border-white/35 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
                                                    : "text-[#794d00] hover:bg-[#794d00]/10"
                                            }`}
                                        >
                                            All Offers
                                        </Link>
                                    )}
                                </div>

                                {/* Footnote */}
                                {currentOffer.footnote && currentOffer.footnote.trim() && (
                                    <p
                                        className={`font-normal leading-snug max-w-lg ${
                                            isHero ? "text-[10px] mt-3.5" : "text-[11px] sm:text-xs mt-5"
                                        } ${hasImage ? "text-slate-300/85" : "text-slate-400"}`}
                                    >
                                        {currentOffer.footnote}
                                    </p>
                                )}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Pagination Dots (overlaid cleanly at the bottom) */}
                {count > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-2">
                        {offers.map((offer, idx) => (
                            <button
                                key={offer.id || idx}
                                type="button"
                                onClick={() => goToSlide(idx)}
                                aria-label={`Go to offer ${idx + 1}`}
                                aria-current={idx === safeIndex ? "true" : "false"}
                                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                    idx === safeIndex
                                        ? hasImage
                                            ? "w-6 bg-white"
                                            : "w-6 bg-slate-900"
                                        : hasImage
                                            ? "w-1.5 bg-white/40 hover:bg-white/75"
                                            : "w-1.5 bg-slate-300 hover:bg-slate-400"
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
