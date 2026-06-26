"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

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
            <BrandSlider />
            <CTA />
            <WhyChooseAIMS />
            <Stats />
            <ContactForm />
            <FAQ />
        </div>
    )
}
