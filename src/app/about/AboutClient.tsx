"use client"

import { useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import WhyChooseAIMS from "@/components/WhyChooseAIMS"
import Stats from "@/components/Stats"
import FAQ from "@/components/FAQ"
import MissionVision from "@/components/MissionVision"
import CTA from "@/components/home/CTA"
import ContactForm from "@/components/ContactForm"
import BrandSlider from "@/components/BrandSlider"

export default function AboutClient() {
    const heroRef = useRef<HTMLElement>(null)

    useGSAP(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger)
        }
        gsap.from(".reveal-item", {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.75,
            ease: "power3.out",
            clearProps: "all",
        })
    }, { scope: heroRef })

    return (
        <div className="about-page font-figtree">
            {/* Dark Hero Header Section (Same model as Individual Courses & Enroll, no form) */}
            <section ref={heroRef} className="relative w-full bg-[#020617] pt-24 sm:pt-36 lg:pt-40 pb-12 sm:pb-20 lg:pb-24 overflow-hidden">
                {/* Background image — identical setup to CourseDetailClient & EnrollClient */}
                <div className="absolute inset-0 z-0 bg-[url('/contact_hero_bg.png')] bg-cover bg-center bg-no-repeat transform scale-105">
                    <div className="absolute inset-0 bg-[#020617]/65 bg-gradient-to-t from-[#020617] via-[#020617]/45 to-[#020617]/70" />
                </div>

                <div className="container-custom relative z-10 mx-auto px-4 sm:px-6 max-w-[1400px]">
                    {/* Breadcrumb */}
                    <nav
                        aria-label="Breadcrumb"
                        className="reveal-item flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400 mb-5 sm:mb-9"
                    >
                        <Link href="/" className="hover:text-white transition-colors">
                            Home
                        </Link>
                        <span className="text-slate-600">/</span>
                        <span className="text-[#c8915a]">About Us</span>
                    </nav>

                    <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-5 sm:space-y-7">
                        {/* Title & Description */}
                        <div className="reveal-item space-y-3 sm:space-y-4 flex flex-col items-center">
                            <h1 className="font-black text-white leading-[1.06] tracking-tight text-3xl sm:text-5xl lg:text-6xl uppercase">
                                Start Your Success Journey With{" "}
                                <span className="text-[#c8915a]">AIMS.</span>
                            </h1>
                            <p className="text-slate-300 text-xs sm:text-base lg:text-lg font-medium leading-relaxed max-w-2xl">
                                Empowering professionals in Abu Dhabi since 2010 through specialized ACTVET-approved training in Technical, Vocational, and Soft Skills development.
                            </p>
                        </div>

                        {/* Compact Key Facts */}
                        <div className="reveal-item grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-lg pt-0.5 sm:pt-1">
                            {[
                                { label: "Established", value: "Since 2010" },
                                { label: "Graduates", value: "10,000+" },
                                { label: "Accreditation", value: "ACTVET" },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-xl sm:rounded-2xl bg-white/[0.05] border border-white/10 px-2 py-2.5 sm:px-3.5 sm:py-3 backdrop-blur-sm text-center"
                                >
                                    <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.12em] sm:tracking-[0.18em] text-[#c8915a] mb-0.5 truncate">
                                        {item.label}
                                    </p>
                                    <p className="text-[11px] sm:text-sm font-bold text-white leading-snug">
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Action Routes */}
                        <div className="reveal-item flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-1">
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

            <MissionVision />

            {/* Redesigned Company Profile Download Section (Zero Icons) */}
            <section className="py-10 sm:py-20 bg-white relative overflow-hidden font-figtree border-t border-slate-100">
                <div className="container-custom mx-auto px-4 sm:px-6 relative z-10">
                    <div className="rounded-[20px] sm:rounded-[28px] bg-[#0F172A] border border-slate-800/50 text-white p-5 sm:p-10 lg:p-14 shadow-[0_18px_48px_rgba(15,23,42,0.16)] relative overflow-hidden">
                        {/* Footer-Matched Ambient Blue Shading */}
                        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
                        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-6 sm:gap-8 lg:gap-12">
                            {/* Left: Corporate Brochure Copy & Actions */}
                            <div className="lg:col-span-7 space-y-3.5 sm:space-y-5">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="px-3 sm:px-3.5 py-1 rounded-full bg-[#794d00]/35 border border-[#794d00]/50 text-amber-200 text-[9px] sm:text-[11px] font-extrabold uppercase tracking-[0.16em] sm:tracking-[0.18em]">
                                        Corporate Overview
                                    </span>
                                    <span className="px-2.5 sm:px-3 py-1 rounded-full bg-white/10 border border-white/15 text-slate-300 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                                        2026 PDF Edition
                                    </span>
                                </div>

                                <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight uppercase leading-[1.1]">
                                    Download AIMS Corporate Brochure &amp; Profile.
                                </h2>

                                <p className="text-slate-300 text-xs sm:text-base leading-relaxed max-w-xl">
                                    Get immediate access to our detailed company profile — covering technical &amp; soft skills courses, ACTVET licensing, training labs, corporate partners, and learning pathways.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-1 sm:pt-2">
                                    <a
                                        href="/doc/Aims Business Profile_AIC.pdf"
                                        download="Aims Business Profile_AIC.pdf"
                                        className="inline-flex items-center justify-center px-5 sm:px-7 py-3 sm:py-3.5 bg-white hover:bg-[#fffbf5] text-slate-950 rounded-full font-extrabold text-[11px] sm:text-xs uppercase tracking-[0.14em] transition-all active:scale-95 shadow-lg"
                                    >
                                        Download Profile PDF
                                    </a>
                                    <a
                                        href="/doc/Aims Business Profile_AIC.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center px-5 sm:px-7 py-3 sm:py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-full font-bold text-[11px] sm:text-xs uppercase tracking-[0.14em] transition-all"
                                    >
                                        View in Browser
                                    </a>
                                </div>
                            </div>

                            {/* Right: Clean Editorial Document Spec Sheet */}
                            <div className="lg:col-span-5">
                                <div className="rounded-[18px] sm:rounded-[24px] bg-white/[0.06] border border-white/15 backdrop-blur-md p-4 sm:p-7 space-y-4 sm:space-y-5">
                                    <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10">
                                        <div>
                                            <p className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-300">
                                                Official Document
                                            </p>
                                            <h3 className="text-sm sm:text-base font-extrabold text-white mt-0.5">
                                                AIMS Business Profile
                                            </h3>
                                        </div>
                                        <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-white/10 text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-slate-200">
                                            PDF
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                        {[
                                            { num: "01", title: "Course Tracks" },
                                            { num: "02", title: "ACTVET License" },
                                            { num: "03", title: "Smart Campus" },
                                            { num: "04", title: "Client Partners" },
                                        ].map((item) => (
                                            <div
                                                key={item.num}
                                                className="rounded-xl bg-white/[0.05] border border-white/10 px-3 py-2.5 sm:px-3.5 sm:py-3 space-y-0.5"
                                            >
                                                <span className="text-[9px] sm:text-[10px] font-black tracking-widest text-amber-300 block">
                                                    {item.num}
                                                </span>
                                                <span className="text-[11px] sm:text-xs font-bold text-white">
                                                    {item.title}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <BrandSlider />
            <CTA />
            <WhyChooseAIMS />
            <Stats />
            <ContactForm />
            <FAQ />
        </div>
    )
}
