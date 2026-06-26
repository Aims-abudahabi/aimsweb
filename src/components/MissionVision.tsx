"use client"

import { useState, useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
    Users,
    Zap,
    Monitor,
    Lightbulb,
    Award,
    Target,
    Rocket,
    Globe,
    Compass,
    Plus,
    Minus,
    ArrowRight,
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface CardData {
    title: string
    description: string
    icon: React.ReactNode
    stat: string
}

function SectionCard({ data, index, activeIndex, onToggle }: {
    data: CardData
    index: number
    activeIndex: number | null
    onToggle: (i: number) => void
}) {
    const isActive = activeIndex === index

    return (
        <div
            onClick={() => onToggle(index)}
            className={`feature-card bg-white p-5 pb-3 sm:p-8 rounded-[20px] border border-slate-100 shadow-xl shadow-slate-200/50 transition-all duration-300 flex flex-col gap-3 sm:gap-6 group cursor-pointer ${isActive ? "scale-[1.02] border-blue-100 ring-1 ring-blue-50" : "hover:scale-[1.01]"}`}
        >
            {/* Icon + Stat row */}
            <div className="flex items-center justify-between">
                <div className="text-blue-500 transform group-hover:scale-110 transition-transform duration-300 w-6 h-6 sm:w-8 sm:h-8 [&>svg]:w-full [&>svg]:h-full">
                    {data.icon}
                </div>
                <span className="text-2xl sm:text-3xl font-black text-slate-100 group-hover:text-slate-200 transition-colors select-none">
                    {data.stat}
                </span>
            </div>

            {/* Title + expandable description */}
            <div className="space-y-1 sm:space-y-3">
                <div className="flex items-center justify-between gap-4">
                    <h3 className="text-[17px] sm:text-[19px] font-bold text-[#0f172a] leading-[1.2]">
                        {data.title}
                    </h3>
                    <div className={`w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center transition-transform duration-300 sm:hidden relative ${isActive ? "rotate-180 bg-blue-50" : ""}`}>
                        <Plus size={12} className={`text-slate-400 transition-opacity absolute ${isActive ? "opacity-0" : "opacity-100"}`} />
                        <Minus size={12} className={`text-blue-500 transition-opacity absolute ${isActive ? "opacity-100" : "opacity-0"}`} />
                    </div>
                </div>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out sm:max-h-none sm:opacity-100 sm:mt-3 ${isActive ? "max-h-[200px] opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"}`}>
                    <p className="text-[13px] sm:text-[14px] text-slate-500 font-medium leading-relaxed">
                        {data.description}
                    </p>
                </div>
            </div>
        </div>
    )
}

const coreValues: CardData[] = [
    {
        title: "Qualified Trainers",
        description: "Our greatest asset; highly experienced Trainers and well trained support staff who work as one team.",
        icon: <Users size={32} />,
        stat: "Expert"
    },
    {
        title: "Efficient Methodology",
        description: "Compassionate and individualized Training with the right attitude in a safe and ambient environment.",
        icon: <Zap size={32} />,
        stat: "Proven"
    },
    {
        title: "Best Facilities",
        description: "Advanced technology support in the Training industry to carry out day-to-day activities.",
        icon: <Monitor size={32} />,
        stat: "Modern"
    },
    {
        title: "Innovation",
        description: "Committed to a supportive environment that encourages new ideas and creativity.",
        icon: <Lightbulb size={32} />,
        stat: "Creative"
    },
    {
        title: "Excellence",
        description: "High standard of excellence and honesty in everything we deliver to our trainees.",
        icon: <Award size={32} />,
        stat: "Top Rated"
    },
]

const missionObjectives: CardData[] = [
    {
        title: "Career Success",
        description: "Provide self-development and dynamic skills to help professionals and students succeed in their career and social objectives.",
        icon: <Rocket size={32} />,
        stat: "Careers"
    },
    {
        title: "Accessible Education",
        description: "A venue where innovative teaching methodologies are available to all strata of communities at an economical rate.",
        icon: <Globe size={32} />,
        stat: "For All"
    },
    {
        title: "Subject Connection",
        description: "Unique and innovative approach that helps trainees and service users connect deeply with the subject matter.",
        icon: <Compass size={32} />,
        stat: "Focused"
    },
]

export default function MissionVision() {
    const sectionRef = useRef<HTMLElement>(null)
    const [visionActive, setVisionActive] = useState<number | null>(null)
    const [missionActive, setMissionActive] = useState<number | null>(null)

    useGSAP(() => {
        gsap.from(".mv-header", {
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "all",
        })
        gsap.from(".mv-card", {
            scrollTrigger: { trigger: ".mv-grid-vision", start: "top 85%" },
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "all",
        })
    }, { scope: sectionRef })

    return (
        <section
            ref={sectionRef}
            className="bg-[#fffbf5] pt-6 pb-6 md:pt-12 md:pb-12 font-figtree overflow-hidden border-t border-slate-100/50"
        >
            <div className="container-custom mx-auto px-6">

                {/* ── Vision ── */}
                <div className="mb-10 sm:mb-16">
                    <div className="mv-header flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8 mb-8 sm:mb-12">
                        <div className="space-y-2 sm:space-y-4">
                            <span className="text-[#794d00] font-bold tracking-widest text-[10px] sm:text-xs uppercase flex items-center gap-2">
                                <Target size={12} className="text-blue-500 sm:w-[14px] sm:h-[14px]" /> Our Vision
                            </span>
                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#794d00] tracking-tight uppercase max-w-xl leading-tight">
                                Strategic <span className="text-slate-900">Excellence.</span>
                            </h2>
                        </div>
                        <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed">
                            To be one of the best training centers in the region — delivering top quality training, focused on continuous service excellence.
                        </p>
                    </div>

                    <div className="mv-grid-vision grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {coreValues.map((v, i) => (
                            <div key={i} className="mv-card">
                                <SectionCard
                                    data={v}
                                    index={i}
                                    activeIndex={visionActive}
                                    onToggle={(idx) => setVisionActive(visionActive === idx ? null : idx)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Mission ── */}
                <div>
                    <div className="mv-header flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8 mb-8 sm:mb-12">
                        <div className="space-y-2 sm:space-y-4">
                            <span className="text-[#794d00] font-bold tracking-widest text-[10px] sm:text-xs uppercase flex items-center gap-2">
                                <Zap size={12} className="text-blue-500 sm:w-[14px] sm:h-[14px]" /> Our Mission
                            </span>
                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#794d00] tracking-tight uppercase max-w-xl leading-tight">
                                Empowering <span className="text-slate-900">Human Talent.</span>
                            </h2>
                        </div>
                        <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed">
                            Ensuring the best talents, latest technology, and an ambient environment for trainees to experience true training value.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {missionObjectives.map((obj, i) => (
                            <div key={i} className="mv-card">
                                <SectionCard
                                    data={obj}
                                    index={i}
                                    activeIndex={missionActive}
                                    onToggle={(idx) => setMissionActive(missionActive === idx ? null : idx)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Footer bar ── */}
                <div className="mt-6 sm:mt-16 flex flex-col md:flex-row items-center justify-between gap-6 pt-6 sm:pt-10 border-t border-slate-100/50">
                    <div className="flex items-center gap-3 text-[#794d00] font-bold text-xs tracking-widest uppercase">
                        <Target size={18} className="text-blue-500" />
                        Vision &amp; Mission — Driving Every Decision
                    </div>
                    <a
                        href="#contact"
                        className="group inline-flex items-center gap-3 text-[10px] font-black tracking-widest uppercase text-[#794d00] hover:text-slate-900 transition-colors self-end md:self-auto"
                    >
                        Get In Touch
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

            </div>
        </section>
    )
}
