"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { BadgeCheck, Sparkles } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function Stats() {
    const sectionRef = useRef<HTMLElement>(null)

    useGSAP(() => {
        gsap.from(".outcome-card", {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
            },
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "all"
        })
    }, { scope: sectionRef })

    const outcomes = [
        {
            title: "Career Transformation",
            description: "Over 95% of our students report significant career advancement or transition within 6 months.",
            stat: "95%",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "Industry Mastery",
            description: "Providing high-impact training that connects trainees deeply with the subject matter.",
            stat: "15+ Years",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "Global Alumni Network",
            description: "Join a community of 10,000+ graduates working in leading enterprises across the Emirates.",
            stat: "10K+"
        }
    ]

    return (
        <section ref={sectionRef} className="relative bg-white py-16 md:py-24 font-figtree overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-full bg-[#fffbf5]/50 pointer-events-none" />

            <div className="container-custom relative z-10 mx-auto px-6">

                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12 md:mb-16">
                    <div className="space-y-3 md:space-y-4">
                        <span className="text-[#794d00] font-bold tracking-widest text-[10px] sm:text-xs uppercase flex items-center gap-2">Performance Metrics
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#794d00] tracking-tight uppercase leading-tight">
                            Measurable <span className="text-slate-900">Success.</span>
                        </h2>
                    </div>
                    <p className="text-slate-600 text-sm md:text-lg max-w-xl leading-relaxed">
                        We don't just teach; we deliver measurable results. Our focused approach ensures that every trainee experiences the true value of professional development.
                    </p>
                </div>

                {/* Outcomes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8">
                    {outcomes.map((outcome, i) => (
                        <div 
                            key={i} 
                            className="outcome-card group relative p-5 md:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-[#fffbf5] border border-slate-100 shadow-xl shadow-slate-200/40 transition-all duration-700 hover:-translate-y-2 hover:border-[#794d00]/20 hover:shadow-2xl hover:shadow-[#794d00]/5 cursor-default flex flex-col justify-center min-h-[160px] md:min-h-[350px]"
                        >
                            <div className="space-y-3 md:space-y-6 relative z-10">
                                <div className="space-y-2">
                                    <span className="text-[#794d00] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight block transform group-hover:scale-110 transition-transform duration-500 origin-left">
                                        {outcome.stat}
                                    </span>
                                    <h3 className="text-xl md:text-2xl font-bold text-[#0f172a] leading-tight">
                                        {outcome.title}
                                    </h3>
                                </div>
                                <p className="text-[14px] md:text-[16px] text-slate-500 font-medium leading-relaxed">
                                    {outcome.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
