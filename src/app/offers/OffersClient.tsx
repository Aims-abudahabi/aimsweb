"use client"

import Link from "next/link"
import { ArrowUpRight, Clock, Tag } from "lucide-react"
import { getActiveOffers } from "@/data/offer"
import OfferBannerSlider from "@/components/OfferBannerSlider"
import { Whatsapp } from "@/components/BrandIcons"

const WHATSAPP_NUMBER = "97126724334"

export default function OffersClient() {
    const activeOffers = getActiveOffers()
    const hasOffers = activeOffers.length > 0

    return (
        <div className="offers-page min-h-screen bg-[#fffbf5] font-figtree">
            {/* Hero Header + Featured Offer Banner */}
            <section className="relative pt-24 sm:pt-32 lg:pt-36 pb-8 sm:pb-12 lg:pb-16 overflow-hidden border-b border-slate-200/60">
                {/* Background Texture & Accents */}
                <div className="absolute inset-0 bg-[url('/contact_hero_bg.png')] bg-cover bg-center bg-no-repeat opacity-[0.2] pointer-events-none" />
                <div className="absolute top-[10%] left-[-10%] w-[450px] h-[450px] bg-[#794d00]/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[5%] right-[-10%] w-[520px] h-[520px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#794d0006_1px,transparent_1px),linear-gradient(to_bottom,#794d0006_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

                <div className="container-custom mx-auto px-4 sm:px-6 relative z-10">
                    <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 bg-white/80 backdrop-blur-md rounded-full border border-[#794d00]/10 shadow-sm shadow-[#794d00]/5 mb-3 sm:mb-4">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#794d00] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#794d00]"></span>
                            </span>
                            <span className="text-[10px] sm:text-xs font-black tracking-[0.14em] sm:tracking-[0.15em] text-[#794d00] uppercase">
                                Exclusive Promotions · Abu Dhabi
                            </span>
                        </div>

                        <h1 className="font-black text-slate-900 leading-[1.08] tracking-tight text-3xl sm:text-5xl lg:text-6xl">
                            Special{" "}
                            <span className="text-[#794d00] inline-block relative">
                                Offers
                                <span className="absolute bottom-1 left-0 w-full h-[4px] sm:h-[6px] bg-[#794d00]/15 rounded-full -skew-x-12"></span>
                            </span>
                        </h1>

                        <p className="text-slate-500 text-xs sm:text-base lg:text-lg font-medium leading-relaxed max-w-2xl mt-3 sm:mt-4">
                            Take advantage of limited-time course discounts, early-bird savings, and career bundles designed to help you upskill faster at AIMS Training Center.
                        </p>
                    </div>

                    {hasOffers && (
                        <div className="mt-6 sm:mt-10">
                            {/* Featured Horizontal Banner Slider (based on reference design) */}
                            <OfferBannerSlider offers={activeOffers} variant="page" />
                        </div>
                    )}
                </div>
            </section>

            {/* Main Offers List / Empty State */}
            <section className="pt-8 sm:pt-14 pb-14 sm:pb-20 lg:pb-24 relative z-10">
                <div className="container-custom mx-auto px-4 sm:px-6">
                    {hasOffers ? (
                        <div>
                            {/* All Current Offers List */}
                            <div className="space-y-5 sm:space-y-8">
                                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4 border-b border-slate-200/70 pb-4 sm:pb-5">
                                    <div>
                                        <span className="text-[#794d00] font-bold tracking-[0.18em] text-[10px] sm:text-xs uppercase flex items-center gap-1.5">
                                            <Tag className="w-3.5 h-3.5" />
                                            All Active Promotions
                                        </span>
                                        <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                                            Explore Every Offer
                                        </h2>
                                    </div>
                                    <span className="text-xs sm:text-sm font-semibold text-slate-500">
                                        {activeOffers.length} {activeOffers.length === 1 ? "offer" : "offers"} available
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                                    {activeOffers.map((offer) => {
                                        const hasImage = Boolean(offer.image && offer.image.trim().length > 0)
                                        const whatsappMessage = encodeURIComponent(
                                            `Hello AIMS Training Center! I'm interested in the "${offer.title || offer.eyebrow || "Special Offer"}" promotion. Please share more details.`
                                        )
                                        const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`
                                        const ctaHref = offer.ctaLink?.trim() || "/contact"
                                        const ctaLabel = offer.ctaText?.trim() || "Claim Offer"

                                        return (
                                            <article
                                                key={offer.id}
                                                className="group bg-[#f5f5f7] hover:bg-white rounded-[20px] sm:rounded-[28px] border border-slate-200/80 shadow-[0_6px_24px_rgba(15,23,42,0.04)] hover:shadow-[0_14px_36px_rgba(15,23,42,0.08)] transition-all duration-300 overflow-hidden"
                                            >
                                                <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-4 sm:gap-6 lg:gap-10 p-4 sm:p-8 lg:p-10">
                                                    {/* Offer Text Details */}
                                                    <div
                                                        className={`${hasImage ? "lg:col-span-7" : "lg:col-span-12 max-w-3xl mx-auto text-center items-center"
                                                            } flex flex-col`}
                                                    >
                                                        <div className="flex flex-wrap items-center gap-2 mb-2.5 sm:mb-3">
                                                            {offer.badge && offer.badge.trim() && (
                                                                <span className="inline-flex items-center px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-slate-900 text-white text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase">
                                                                    {offer.badge}
                                                                </span>
                                                            )}
                                                            {offer.eyebrow && offer.eyebrow.trim() && (
                                                                <span className="inline-flex items-center text-[11px] sm:text-xs font-extrabold tracking-[0.14em] uppercase text-[#794d00]">
                                                                    {offer.eyebrow}
                                                                </span>
                                                            )}
                                                            {offer.validUntil && offer.validUntil.trim() && (
                                                                <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-slate-500 ml-auto sm:ml-0">
                                                                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                                                                    {offer.validUntil}
                                                                </span>
                                                            )}
                                                        </div>

                                                        {offer.title && offer.title.trim() && (
                                                            <h3 className="text-xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-tight">
                                                                {offer.title}
                                                            </h3>
                                                        )}

                                                        {offer.subtitle && offer.subtitle.trim() && (
                                                            <p className="text-slate-600 text-sm sm:text-lg font-semibold mt-1.5 sm:mt-2">
                                                                {offer.subtitle}
                                                            </p>
                                                        )}

                                                        {offer.description && offer.description.trim() && (
                                                            <p className="text-slate-500 text-xs sm:text-base leading-relaxed mt-2 sm:mt-3 max-w-2xl">
                                                                {offer.description}
                                                            </p>
                                                        )}

                                                        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-4 sm:mt-6">
                                                            <Link
                                                                href={ctaHref}
                                                                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-slate-900 bg-slate-900 text-white px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold hover:bg-[#794d00] hover:border-[#794d00] transition-all duration-200 active:scale-95"
                                                            >
                                                                {ctaLabel}
                                                                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                            </Link>

                                                            <a
                                                                href={whatsappHref}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-slate-300 bg-white text-slate-900 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all duration-200 active:scale-95"
                                                            >
                                                                <Whatsapp size={15} className="text-[#25D366]" stroke="#25D366" />
                                                                Enquire on WhatsApp
                                                            </a>
                                                        </div>

                                                        {offer.footnote && offer.footnote.trim() && (
                                                            <p className="text-[11px] sm:text-xs text-slate-400 mt-3.5 sm:mt-5">
                                                                {offer.footnote}
                                                            </p>
                                                        )}
                                                    </div>

                                                    {/* Offer Visual */}
                                                    {hasImage && (
                                                        <div className="lg:col-span-5">
                                                            <div className="relative w-full aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden bg-white shadow-md border border-slate-200/70">
                                                                <img
                                                                    src={offer.image}
                                                                    alt={offer.imageAlt || offer.title || "AIMS special offer"}
                                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </article>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Graceful Empty State */
                        <div className="max-w-2xl mx-auto bg-white rounded-[20px] sm:rounded-[28px] border border-slate-200/80 shadow-sm p-6 sm:p-14 text-center">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#794d00]/10 text-[#794d00] flex items-center justify-center mx-auto mb-4 sm:mb-5">
                                <Tag className="w-6 h-6 sm:w-7 sm:h-7" />
                            </div>
                            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900">
                                No Active Offers Right Now
                            </h2>
                            <p className="text-slate-500 text-sm sm:text-base leading-relaxed mt-2.5 sm:mt-3">
                                Check back soon for our upcoming seasonal discounts and course bundles—or contact our admissions team in Abu Dhabi for corporate and group training rates.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 mt-6 sm:mt-8">
                                <Link
                                    href="/courses"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#794d00] hover:bg-[#1e2a3b] text-white px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold transition-all"
                                >
                                    Explore Courses
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="/contact"
                                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-900 px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold transition-all"
                                >
                                    Contact Admissions
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Bottom Help / Custom Corporate Package Banner */}
                    <div className="mt-10 sm:mt-16 bg-[#1e2a3b] rounded-[20px] sm:rounded-[28px] p-5 sm:p-12 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 sm:gap-6 shadow-xl">
                        <div className="space-y-1.5 sm:space-y-2 max-w-2xl">
                            <span className="text-[10px] sm:text-xs font-extrabold tracking-[0.18em] uppercase text-blue-400">
                                Group & Corporate Training
                            </span>
                            <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight">
                                Looking for custom team pricing in Abu Dhabi?
                            </h3>
                            <p className="text-slate-300 text-xs sm:text-base font-light">
                                Speak with our training advisors for tailored corporate packages, multi-course bundles, and flexible scheduling.
                            </p>
                        </div>
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white text-slate-950 hover:bg-[#fffbf5] px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold shrink-0 transition-all hover:scale-[1.02] active:scale-95"
                        >
                            Request Custom Quote
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
