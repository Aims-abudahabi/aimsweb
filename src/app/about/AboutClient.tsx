"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { Download, FileText } from "lucide-react"

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
        gsap.from(".reveal-item", {
            y: 50,
            opacity: 0,
            stagger: 0.15,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top 80%",
            }
        })
    }, { scope: heroRef })

    return (
        <div className="about-page font-figtree">
            {/* Redesigned Hero Header Section */}
            <section ref={heroRef} className="relative bg-[#fffbf5] pt-48 pb-20 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 bg-[url('/contact_hero_bg.png')] bg-cover bg-center bg-no-repeat opacity-[0.25] pointer-events-none" />

                {/* Background Blur Blobs */}
                <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[#794d00]/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#794d0006_1px,transparent_1px),linear-gradient(to_bottom,#794d0006_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

                <div className="container-custom relative z-10 mx-auto px-6 text-center">
                    <div className="max-w-4xl mx-auto flex flex-col items-center">
                        {/* Glowing Sub-header / Badge */}
                        <div className="reveal-item inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-[#794d00]/10 shadow-sm shadow-[#794d00]/5 hover:scale-[1.02] hover:border-[#794d00]/25 transition-all duration-300 group mb-8 cursor-pointer">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#794d00] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#794d00]"></span>
                            </span>
                            <span className="text-[11px] sm:text-xs font-black tracking-[0.15em] text-[#794d00] uppercase">
                                About AIMS Training Center - ABU DHABI
                            </span>
                        </div>

                        {/* Main Title Area */}
                        <div className="space-y-6">
                            <h1 className="reveal-item font-black text-slate-900 leading-[1.08] tracking-tight text-5xl sm:text-7xl xl:text-8xl max-w-4xl">
                                Start Your Success <br className="hidden sm:block" /> Journey with <span className="text-[#794d00] inline-block relative hover:scale-[1.02] transition-transform duration-300">
                                    AIMS
                                    <span className="absolute bottom-1 left-0 w-full h-[4px] sm:h-[8px] bg-[#794d00]/15 rounded-full -skew-x-12"></span>
                                </span>
                            </h1>

                            {/* Short Intro */}
                            <p className="reveal-item text-slate-500 text-base sm:text-xl font-medium leading-[1.6] max-w-2xl mt-6">
                                Empowering professionals in AIMS through specialized training in Technical, Vocational, and Soft Skills development.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <MissionVision />

            {/* Redesigned Company Profile Download Section */}
            <section className="py-20 bg-white relative overflow-hidden font-figtree">
                {/* Decorative blobs */}
                <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] bg-[#794d00]/5 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[90px] pointer-events-none" />

                <div className="container-custom mx-auto px-6 relative z-10">
                    <div className="bg-[#fffbf5] border border-[#794d00]/10 rounded-[32px] p-8 md:p-16 shadow-xl shadow-slate-100 flex flex-col lg:flex-row items-center justify-between gap-12 max-w-5xl mx-auto group">

                        {/* Visual Mockup Column */}
                        <div className="w-full lg:w-1/3 flex justify-center">
                            <div className="relative w-48 h-64 bg-white rounded-[24px] shadow-2xl border border-slate-100 flex flex-col justify-between p-6 transform group-hover:-translate-y-2 group-hover:rotate-1 transition-all duration-500 ease-out">
                                {/* Top bar */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <div className="w-8 h-8 rounded-lg bg-[#794d00]/10 flex items-center justify-center">
                                            <FileText size={16} className="text-[#794d00]" />
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">PDF Profile</span>
                                    </div>
                                    <div className="space-y-1.5 pt-2">
                                        <div className="h-4 bg-slate-100 rounded w-5/6" />
                                        <div className="h-3 bg-slate-50 rounded w-full" />
                                        <div className="h-3 bg-slate-50 rounded w-4/6" />
                                    </div>
                                </div>

                                {/* Logo / Bottom */}
                                <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-800 leading-none">AIMS Profile</h4>
                                        <span className="text-[9px] text-slate-400 font-medium">2026 Edition</span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                        <Download size={14} className="animate-bounce" />
                                    </div>
                                </div>

                                {/* Decorative cover circles */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-[#794d00]/5 rounded-bl-full pointer-events-none rounded-tr-[24px]" />
                            </div>
                        </div>

                        {/* Text and Download Actions Column */}
                        <div className="w-full lg:w-2/3 space-y-6 text-center lg:text-left">
                            <div className="space-y-2">
                                <span className="text-[11px] font-bold tracking-[0.2em] text-[#794d00] uppercase block">Corporate Overview</span>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                                    Download AIMS Corporate Brochure & Profile
                                </h2>
                            </div>

                            <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-xl font-medium">
                                Get immediate access to our detailed company profile. Explore our technical & soft skills courses, ACTVET licensing details, infrastructure, corporate partners, and learning pathways.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                                <a
                                    href="/doc/Aims Business Profile_AIC.pdf"
                                    download="Aims Business Profile_AIC.pdf"
                                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#794d00] hover:bg-[#633e00] text-white rounded-2xl font-bold transition-all shadow-lg shadow-[#794d00]/20 hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    <Download size={18} />
                                    Download Profile PDF
                                </a>
                                <a
                                    href="/doc/Aims Business Profile_AIC.pdf"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl font-semibold transition-all hover:border-slate-300"
                                >
                                    View in Browser
                                </a>
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
