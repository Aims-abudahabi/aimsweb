"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Clock, Tag } from "lucide-react"
import { getActiveOffers, type Offer } from "@/data/offer"
import { Whatsapp } from "@/components/BrandIcons"
import OfferClaimModal from "@/components/OfferClaimModal"

const WHATSAPP_NUMBER = "97126724334"

export default function OffersClient() {
    const activeOffers = getActiveOffers()
    const hasOffers = activeOffers.length > 0
    const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)

    return (
        <div className="offers-page min-h-screen bg-[#fffbf5] font-figtree">
            {/* Dark Hero Header Section (Same model as About & Courses) */}
            <section className="relative w-full bg-[#020617] pt-24 sm:pt-36 lg:pt-40 pb-12 sm:pb-20 lg:pb-24 overflow-hidden">
                {/* Background image — identical setup to About, Courses & Enroll */}
                <div className="absolute inset-0 z-0 bg-[url('/contact_hero_bg.png')] bg-cover bg-center bg-no-repeat transform scale-105">
                    <div className="absolute inset-0 bg-[#020617]/65 bg-gradient-to-t from-[#020617] via-[#020617]/45 to-[#020617]/70" />
                </div>

                <div className="container-custom relative z-10 mx-auto px-4 sm:px-6 max-w-[1400px]">
                    {/* Breadcrumb */}
                    <nav
                        aria-label="Breadcrumb"
                        className="flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400 mb-5 sm:mb-9"
                    >
                        <Link href="/" className="hover:text-white transition-colors">
                            Home
                        </Link>
                        <span className="text-slate-600">/</span>
                        <span className="text-[#c8915a]">Offers</span>
                    </nav>

                    <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-5 sm:space-y-7">
                        {/* Title & Description */}
                        <div className="space-y-3 sm:space-y-4 flex flex-col items-center">
                            <h1 className="font-black text-white leading-[1.06] tracking-tight text-3xl sm:text-5xl lg:text-6xl uppercase">
                                Special{" "}
                                <span className="text-[#c8915a]">Offers.</span>
                            </h1>

                            <p className="text-slate-300 text-xs sm:text-base lg:text-lg font-medium leading-relaxed max-w-2xl">
                                Take advantage of limited-time course discounts, early-bird savings, and career bundles designed to help you upskill faster at AIMS Training Center.
                            </p>
                        </div>

                        {/* Action Routes */}
                        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-1">
                            <Link
                                href="/courses"
                                className="inline-flex items-center justify-center bg-white text-[#0f172a] px-5 sm:px-8 py-3 sm:py-4 rounded-full font-black text-[11px] sm:text-[13px] tracking-widest uppercase transition-all hover:bg-[#fffbf5] hover:scale-[1.02] active:scale-[0.98] shadow-xl"
                            >
                                Explore Courses
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center border border-white/25 text-white px-5 sm:px-7 py-3 sm:py-4 rounded-full font-bold text-[11px] sm:text-[13px] tracking-widest uppercase transition-all hover:border-white/50 hover:bg-white/5"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
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
                                        const ctaLabel = offer.ctaText?.trim() || "Claim Offer"

                                        return (
                                            <article
                                                key={offer.id}
                                                id={offer.id}
                                                className="scroll-mt-28 group bg-[#f5f5f7] hover:bg-white rounded-[18px] sm:rounded-[28px] border border-slate-200/80 shadow-[0_6px_24px_rgba(15,23,42,0.04)] hover:shadow-[0_14px_36px_rgba(15,23,42,0.08)] transition-all duration-300 overflow-hidden"
                                            >
                                                {/* Full-Width Banner Image Header */}
                                                {hasImage && (
                                                    <div className="relative w-full aspect-[7671/1978] overflow-hidden bg-[#0f172a] border-b border-slate-200/70">
                                                        <img
                                                            src={offer.image}
                                                            alt={offer.imageAlt || offer.title || "AIMS special offer"}
                                                            className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                                                        />
                                                    </div>
                                                )}

                                                {/* Offer Text Descriptions & Actions */}
                                                <div className="p-4 sm:p-7 lg:p-9 flex flex-col lg:flex-row lg:items-end justify-between gap-5 lg:gap-8">
                                                    <div className="flex flex-col max-w-3xl">
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
                                                            <p className="text-slate-500 text-xs sm:text-base leading-relaxed mt-2 sm:mt-3">
                                                                {offer.description}
                                                            </p>
                                                        )}

                                                        {offer.footnote && offer.footnote.trim() && (
                                                            <p className="text-[11px] sm:text-xs text-slate-400 mt-3 sm:mt-4">
                                                                {offer.footnote}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
                                                        <button
                                                            type="button"
                                                            onClick={() => setSelectedOffer(offer)}
                                                            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-slate-900 bg-slate-900 text-white px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold hover:bg-[#794d00] hover:border-[#794d00] transition-all duration-200 active:scale-95 cursor-pointer"
                                                        >
                                                            {ctaLabel}
                                                            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                        </button>

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
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#794d00] hover:bg-[#0f172a] text-white px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold transition-all"
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
                    <div className="relative overflow-hidden mt-10 sm:mt-16 bg-[#0F172A] border border-slate-800/50 rounded-[20px] sm:rounded-[28px] p-5 sm:p-12 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 sm:gap-6 shadow-xl">
                        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
                        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
                        <div className="relative z-10 space-y-1.5 sm:space-y-2 max-w-2xl">
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
                            className="relative z-10 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white text-slate-950 hover:bg-[#fffbf5] px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold shrink-0 transition-all hover:scale-[1.02] active:scale-95"
                        >
                            Request Custom Quote
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Selected Offer Claim Popup */}
            <OfferClaimModal
                offer={selectedOffer}
                onClose={() => setSelectedOffer(null)}
            />
        </div>
    )
}
