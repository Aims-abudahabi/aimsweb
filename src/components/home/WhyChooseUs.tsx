"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CheckCircle, ShieldCheck, Clock, Award, Zap, Layout, Sparkles, ArrowRight, Plus, Minus } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const features = [
    {
        title: "ACTVET Licenced",
        description: "Official government recognition ensuring your training meets the highest UAE regulatory standards.",
        stat: "Gov. Licenced",
        variant: "large", // spans 4 columns on lg
        image: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Practical Learning",
        description: "Hands-on projects and live simulations with real-world industry case studies.",
        stat: "100% Practical",
        variant: "small", // spans 2 columns on lg
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Flexible Schedules",
        description: "Morning, evening, and weekend batches for busy working professionals.",
        stat: "All Timings",
        variant: "small",
        image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Performance Tracking",
        description: "Regular mock tests and diagnostic reports to closely track your progress.",
        stat: "Mock Tested",
        variant: "medium", // spans 3 columns on lg
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Job-Ready Results",
        description: "Industry-aligned curriculum giving you an immediate competitive edge.",
        stat: "95% Pass Rate",
        variant: "medium",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Modern Facilities",
        description: "State-of-the-art labs and a smart-campus environment for immersive learning.",
        stat: "Since 2010",
        variant: "full", // spans 6 columns on lg
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop"
    },
]

export default function WhyChooseUs() {
    const sectionRef = useRef<HTMLElement>(null)

    useGSAP(() => {
        // Snappier animations for mobile
        gsap.from(".wcu-header", {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 95%",
            },
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            clearProps: "all",
        })
        gsap.from(".feature-card", {
            scrollTrigger: {
                trigger: ".features-grid",
                start: "top 95%",
            },
            y: 20,
            opacity: 0,
            stagger: 0.05,
            duration: 0.6,
            ease: "power2.out",
            clearProps: "all",
        })
    }, { scope: sectionRef })

    return (
        <section
            id="why-choose-us"
            ref={sectionRef}
            className="relative bg-white py-10 md:py-20 font-figtree overflow-hidden border-t border-slate-100 scroll-mt-24"
        >
            <div className="container-custom mx-auto px-6 relative">

                {/* ── Header ── */}
                <div className="wcu-header flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 md:gap-6 mb-8 md:mb-16 relative">
                    <div className="space-y-1 md:space-y-4">
                        <span className="text-[#794d00] font-bold tracking-widest text-[10px] sm:text-xs uppercase flex items-center gap-2">Educational Framework
                        </span>
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#794d00] tracking-tight uppercase leading-tight">
                            Excellence <span className="text-slate-900">Framework.</span>
                        </h2>
                    </div>
                    <p className="text-slate-600 text-sm md:text-lg max-w-xl leading-relaxed">
                        Six pillars that separate AIMS from every other training centre in the UAE.
                    </p>
                </div>

                {/* ── Bento Grid ── */}
                <div className="features-grid grid grid-cols-2 lg:grid-cols-6 gap-3 md:gap-4 auto-rows-auto md:auto-rows-[180px] relative">
                    {features.map((f, i) => {
                        const isLarge = f.variant === "large"
                        const isMedium = f.variant === "medium"
                        const isFull = f.variant === "full"
                        const isSmall = f.variant === "small"

                        return (
                            <div
                                key={i}
                                className={`feature-card relative overflow-hidden rounded-2xl md:rounded-3xl border border-slate-800 shadow-lg transition-all duration-500 group cursor-default p-4 md:p-6 flex flex-col justify-between bg-slate-950 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/20
                                    ${isLarge ? 'col-span-2 lg:col-span-4 lg:row-span-2' : ''}
                                    ${isSmall ? 'col-span-1 lg:col-span-2 lg:row-span-1' : ''}
                                    ${isMedium ? 'col-span-1 md:col-span-1 lg:col-span-3 lg:row-span-1' : ''}
                                    ${isFull ? 'col-span-2 lg:col-span-6 lg:row-span-1' : ''}
                                    min-h-[140px] md:min-h-0
                                `}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={f.image}
                                        alt={f.title}
                                        className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-all duration-700 group-hover:scale-110"
                                    />
                                </div>

                                <div className="flex items-start justify-end relative z-10 mb-2 md:mb-0">
                                    <span className="text-[10px] md:text-xl font-black text-white/40 group-hover:text-white/70 transition-colors select-none uppercase tracking-tighter">
                                        {f.stat}
                                    </span>
                                </div>

                                <div className="space-y-1 relative z-10">
                                    <h3 className="text-[13px] md:text-[18px] font-bold text-white leading-tight">
                                        {f.title}
                                    </h3>
                                    <p className="text-[10px] md:text-[13px] text-slate-100 font-medium leading-relaxed line-clamp-2 md:line-clamp-3">
                                        {f.description}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* ── Footer bar ── */}
                <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-100">
                    <div className="flex items-center gap-3 text-[#794d00] font-bold text-[10px] sm:text-xs tracking-widest uppercase">
                        Standardised Excellence Since 2010
                    </div>
                    <Link
                        href="/about"
                        className="group inline-flex items-center gap-3 text-[10px] font-black tracking-widest uppercase text-[#794d00] hover:text-slate-900 transition-colors"
                    >
                        Learn More About AIMS
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>
        </section>
    )
}

