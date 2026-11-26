"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"

export default function WhyChooseUs() {
    const sectionRef = useRef<HTMLElement>(null)

    useGSAP(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger)
        }

        gsap.from(".wcu-header", {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 90%",
            },
            y: 24,
            opacity: 0,
            duration: 0.65,
            ease: "power2.out",
            clearProps: "all",
        })

        gsap.from(".wcu-card", {
            scrollTrigger: {
                trigger: ".wcu-bento",
                start: "top 88%",
            },
            y: 24,
            opacity: 0,
            stagger: 0.08,
            duration: 0.65,
            ease: "power2.out",
            clearProps: "all",
        })
    }, { scope: sectionRef })

    return (
        <section
            id="why-choose-us"
            ref={sectionRef}
            className="relative bg-white py-10 sm:py-16 md:py-24 font-figtree overflow-hidden border-t border-slate-100 scroll-mt-24"
        >
            {/* Subtle Ambient Background Accent */}
            <div className="absolute top-0 right-[-10%] w-[520px] h-[520px] bg-[#794d00]/[0.03] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-[-10%] w-[480px] h-[480px] bg-blue-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

            <div className="container-custom mx-auto px-4 sm:px-6 relative z-10">
                {/* ── Section Header ── */}
                <div className="wcu-header flex flex-col lg:flex-row justify-between items-start lg:items-end gap-2.5 sm:gap-5 md:gap-8 mb-6 sm:mb-10 md:mb-14">
                    <div className="space-y-1 sm:space-y-2.5 md:space-y-3">
                        <span className="text-[#794d00] font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase block">
                            Educational Framework
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#794d00] tracking-tight uppercase leading-[1.08]">
                            Excellence <span className="text-slate-900">Framework.</span>
                        </h2>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-base md:text-lg max-w-xl leading-relaxed">
                        Six core pillars that set AIMS apart as Abu Dhabi&apos;s trusted training center for career-defining professional development since 2010.
                    </p>
                </div>

                {/* ── 12-Column Editorial Bento Grid ── */}
                <div className="wcu-bento grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-5">
                    {/* 01 — ACTVET Licenced (Hero Spotlight Card) */}
                    <div className="wcu-card md:col-span-2 lg:col-span-7 relative overflow-hidden rounded-[18px] sm:rounded-[28px] bg-[#0F172A] border border-slate-800/50 text-white p-4 sm:p-7 lg:p-9 flex flex-col justify-between gap-4 sm:gap-8 shadow-[0_14px_40px_rgba(15,23,42,0.14)] group">
                        {/* Footer Background Shading */}
                        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
                        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

                        <div className="relative z-10 flex items-center justify-end">
                            <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/10 border border-white/15 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-amber-200">
                                Gov. Licenced
                            </span>
                        </div>

                        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 items-end gap-4 sm:gap-6">
                            <div className="sm:col-span-7 space-y-2">
                                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-tight">
                                    ACTVET Licenced
                                </h3>
                                <p className="text-slate-300 text-xs sm:text-sm lg:text-[15px] leading-relaxed font-normal">
                                    Official government recognition ensuring every program meets the highest Abu Dhabi regulatory and accreditation standards.
                                </p>
                            </div>

                            {/* Authentic ACTVET Seal Box */}
                            <div className="sm:col-span-5">
                                <div className="bg-white rounded-2xl px-4 py-3 sm:p-4 shadow-lg border border-white/20 flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-3 sm:gap-1.5">
                                    <Image
                                        src="/logo/ACTEVET LOGO PNG.png"
                                        alt="ACTVET Abu Dhabi Accreditation"
                                        width={160}
                                        height={44}
                                        loading="lazy"
                                        className="h-9 sm:h-12 w-auto object-contain"
                                    />
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 text-right sm:text-center">
                                        Approved Center · Abu Dhabi
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 02 — Practical Learning */}
                    <div className="wcu-card md:col-span-2 lg:col-span-5 rounded-[18px] sm:rounded-[28px] bg-[#fffbf5] border border-[#794d00]/15 p-4 sm:p-7 lg:p-9 flex flex-col justify-between gap-3.5 sm:gap-7 hover:border-[#794d00]/35 hover:shadow-[0_14px_34px_rgba(121,77,0,0.08)] transition-all duration-300">
                        <div className="flex items-center justify-end">
                            <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#794d00] text-white text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">
                                100% Practical
                            </span>
                        </div>

                        <div className="space-y-2.5 sm:space-y-4">
                            <div className="space-y-1 sm:space-y-2">
                                <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                                    Practical Learning
                                </h3>
                                <p className="text-slate-600 text-xs sm:text-sm lg:text-[15px] leading-relaxed">
                                    Hands-on projects and live simulations built around real-world UAE industry case studies—not passive slides.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-0.5 sm:pt-1">
                                {["Live Labs", "Industry Case Studies", "Real Projects"].map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white border border-[#794d00]/15 text-[10px] sm:text-[11px] font-bold text-[#794d00]"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 03 — Flexible Schedules */}
                    <div className="wcu-card lg:col-span-4 rounded-[18px] sm:rounded-[28px] bg-white border border-slate-200/80 p-4 sm:p-7 flex flex-col justify-between gap-3 sm:gap-6 shadow-[0_6px_24px_rgba(15,23,42,0.03)] hover:shadow-[0_14px_34px_rgba(15,23,42,0.07)] hover:border-[#794d00]/30 transition-all duration-300">
                        <div className="flex items-center justify-end">
                            <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">
                                All Timings
                            </span>
                        </div>

                        <div className="space-y-2.5 sm:space-y-4">
                            <div className="space-y-1">
                                <h3 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight">
                                    Flexible Schedules
                                </h3>
                                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                                    Morning, evening, and weekend batches tailored for busy working professionals and students.
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-0.5 sm:pt-1">
                                {["Morning", "Evening", "Weekend"].map((slot) => (
                                    <div
                                        key={slot}
                                        className="text-center py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-[#f8f9fb] border border-slate-100 text-[10px] sm:text-[11px] font-bold text-slate-700"
                                    >
                                        {slot}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 04 — Performance Tracking */}
                    <div className="wcu-card lg:col-span-4 rounded-[18px] sm:rounded-[28px] bg-white border border-slate-200/80 p-4 sm:p-7 flex flex-col justify-between gap-3 sm:gap-6 shadow-[0_6px_24px_rgba(15,23,42,0.03)] hover:shadow-[0_14px_34px_rgba(15,23,42,0.07)] hover:border-[#794d00]/30 transition-all duration-300">
                        <div className="flex items-center justify-end">
                            <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">
                                Mock Tested
                            </span>
                        </div>

                        <div className="space-y-2.5 sm:space-y-4">
                            <div className="space-y-1">
                                <h3 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight">
                                    Performance Tracking
                                </h3>
                                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                                    Regular mock tests, personalized trainer feedback, and diagnostic reports to track every milestone.
                                </p>
                            </div>

                            {/* Clean Progress Visual */}
                            <div className="space-y-1.5 pt-0.5 sm:pt-1">
                                <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-slate-600">
                                    <span>Exam &amp; Skill Readiness</span>
                                    <span className="text-[#794d00]">Tracked Weekly</span>
                                </div>
                                <div className="h-1.5 sm:h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                                    <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-[#794d00] to-amber-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 05 — Job-Ready Results */}
                    <div className="wcu-card md:col-span-2 lg:col-span-4 rounded-[18px] sm:rounded-[28px] bg-white border border-slate-200/80 p-4 sm:p-7 flex flex-col justify-between gap-3 sm:gap-6 shadow-[0_6px_24px_rgba(15,23,42,0.03)] hover:shadow-[0_14px_34px_rgba(15,23,42,0.07)] hover:border-[#794d00]/30 transition-all duration-300">
                        <div className="flex items-center justify-end">
                            <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#794d00]/10 text-[#794d00] text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase">
                                95% Pass Rate
                            </span>
                        </div>

                        <div className="space-y-2.5 sm:space-y-4">
                            <div className="space-y-1">
                                <h3 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight">
                                    Job-Ready Results
                                </h3>
                                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                                    Industry-aligned curriculum engineered to give you an immediate competitive edge across UAE employers.
                                </p>
                            </div>

                            <p className="text-[11px] sm:text-xs font-bold text-[#794d00]">
                                Recognized by leading UAE organizations
                            </p>
                        </div>
                    </div>

                    {/* 06 — Modern Facilities (Full-Width Horizontal Showcase) */}
                    <div className="wcu-card md:col-span-2 lg:col-span-12 rounded-[18px] sm:rounded-[28px] bg-[#f5f5f7] border border-slate-200/80 p-4 sm:p-8 lg:p-10 hover:border-[#794d00]/25 transition-all duration-300">
                        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-4 sm:gap-7 lg:gap-10">
                            <div className="lg:col-span-6 space-y-2.5 sm:space-y-4">
                                <div>
                                    <span className="inline-block px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white border border-slate-200/80 text-slate-800 text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase">
                                        Since 2010
                                    </span>
                                </div>

                                <div className="space-y-1 sm:space-y-2">
                                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-slate-950 tracking-tight">
                                        Modern Smart-Campus Facilities
                                    </h3>
                                    <p className="text-slate-600 text-xs sm:text-sm lg:text-[15px] leading-relaxed max-w-xl">
                                        Purpose-built computer labs, licensed professional software workstations, and interactive classrooms located right in the heart of Abu Dhabi.
                                    </p>
                                </div>
                            </div>

                            {/* Facility Highlights */}
                            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3.5">
                                <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-slate-200/70 shadow-sm space-y-0.5 sm:space-y-1">
                                    <span className="text-[9px] sm:text-[10px] font-extrabold tracking-[0.18em] uppercase text-[#794d00]">
                                        01 · Labs
                                    </span>
                                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                                        CAD &amp; IT Labs
                                    </h4>
                                    <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                                        High-spec workstations with licensed engineering &amp; design tools.
                                    </p>
                                </div>

                                <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-slate-200/70 shadow-sm space-y-0.5 sm:space-y-1">
                                    <span className="text-[9px] sm:text-[10px] font-extrabold tracking-[0.18em] uppercase text-[#794d00]">
                                        02 · Learning
                                    </span>
                                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                                        Smart Classrooms
                                    </h4>
                                    <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                                        Small-group setups built for focused, interactive mentoring.
                                    </p>
                                </div>

                                <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-slate-200/70 shadow-sm space-y-0.5 sm:space-y-1">
                                    <span className="text-[9px] sm:text-[10px] font-extrabold tracking-[0.18em] uppercase text-[#794d00]">
                                        03 · Campus
                                    </span>
                                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                                        Central Abu Dhabi
                                    </h4>
                                    <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                                        Accessible campus on Hamdan Bin Mohammed Street.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Footer bar ── */}
                <div className="mt-6 sm:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 pt-6 sm:pt-10 border-t border-slate-100/50">
                    <div className="flex items-center gap-3 text-[#794d00] font-bold text-[11px] sm:text-xs tracking-widest uppercase">
                        Standardised Excellence Since 2010
                    </div>
                    <Link
                        href="/about"
                        className="group inline-flex items-center gap-3 text-[10px] font-black tracking-widest uppercase text-[#794d00] hover:text-slate-900 transition-colors self-end sm:self-auto"
                    >
                        Learn More About AIMS
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
