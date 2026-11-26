"use client"

import { useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function CTA() {
    const sectionRef = useRef<HTMLElement>(null)

    useGSAP(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger)
        }
        gsap.from(".cta-banner", {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
            },
            y: 24,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
            clearProps: "all",
        })
    }, { scope: sectionRef })

    return (
        <section
            ref={sectionRef}
            className="py-8 sm:py-12 md:py-16 bg-[#fffbf5] relative font-figtree border-t border-slate-100/60"
        >
            <div className="container-custom mx-auto px-4 sm:px-6">
                <div className="cta-banner relative overflow-hidden rounded-[20px] sm:rounded-[28px] bg-[#0F172A] border border-slate-800/50 text-white p-5 sm:p-9 md:p-11 lg:p-14 shadow-[0_18px_48px_rgba(15,23,42,0.16)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 sm:gap-8">
                    {/* Footer Background Shading */}
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
                    <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

                    {/* Content Left */}
                    <div className="relative z-10 max-w-2xl space-y-2.5 sm:space-y-3.5">
                        <span className="inline-block text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-amber-300">
                            Take The Next Step · Abu Dhabi
                        </span>
                        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-white leading-[1.1] tracking-tight uppercase">
                            <span className="text-[#c8915a]">Next Can Be You.</span>{" "}
                            <br className="hidden sm:block" />
                            Turn Your Passion Into a Professional Career.
                        </h2>
                        <p className="text-slate-300 text-xs sm:text-sm md:text-base font-medium leading-relaxed max-w-xl">
                            Gain practical skills and ACTVET-approved certifications through hands-on training and expert guidance.
                        </p>
                    </div>

                    {/* Button Right */}
                    <div className="relative z-10 w-full sm:w-auto shrink-0">
                        <Link
                            href="/courses"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-9 py-3.5 sm:py-4 bg-white hover:bg-[#fffbf5] text-slate-950 rounded-full font-extrabold text-[11px] sm:text-xs tracking-[0.16em] uppercase transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl"
                        >
                            Start Learning
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
