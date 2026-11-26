"use client"

import Link from "next/link"
import { motion } from "framer-motion"

interface PillarItem {
    title: string
    description: string
    stat: string
}

const coreValues: PillarItem[] = [
    {
        title: "Qualified Trainers",
        description:
            "Our greatest asset — highly experienced instructors and dedicated support staff working together for every learner's progress.",
        stat: "Expert",
    },
    {
        title: "Efficient Methodology",
        description:
            "Individualized, structured training delivered with the right mentorship in a welcoming and focused learning environment.",
        stat: "Proven",
    },
    {
        title: "Best Facilities",
        description:
            "Modern labs and industry-standard software workstations supporting practical, day-to-day technical training.",
        stat: "Modern",
    },
    {
        title: "Innovation",
        description:
            "A forward-thinking training culture that encourages fresh ideas, real problem solving, and creative application.",
        stat: "Creative",
    },
    {
        title: "Excellence",
        description:
            "High standards of integrity, transparency, and measurable outcomes across every program we deliver in Abu Dhabi.",
        stat: "Top Rated",
    },
]

const missionObjectives: PillarItem[] = [
    {
        title: "Career Success",
        description:
            "Equip professionals and students with practical, high-demand skills to achieve both career advancement and personal goals.",
        stat: "Careers",
    },
    {
        title: "Accessible Education",
        description:
            "Deliver innovative, ACTVET-approved training methodologies accessible across all communities at fair, transparent rates.",
        stat: "For All",
    },
    {
        title: "Subject Connection",
        description:
            "Hands-on, real-world training approaches that help learners connect deeply with their discipline and apply it immediately at work.",
        stat: "Focused",
    },
]

export default function MissionVision() {
    return (
        <section className="relative bg-[#fffbf5] py-10 sm:py-20 md:py-24 font-figtree overflow-hidden border-t border-slate-100">
            <div className="container-custom mx-auto px-4 sm:px-6 space-y-10 sm:space-y-20">
                {/* ── Vision ── */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-3 sm:gap-8 mb-6 sm:mb-12"
                    >
                        <div className="space-y-1 sm:space-y-2.5">
                            <span className="text-[#794d00] font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase block">
                                Our Vision
                            </span>
                            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#794d00] tracking-tight uppercase leading-[1.08]">
                                Strategic <span className="text-slate-950">Excellence.</span>
                            </h2>
                        </div>
                        <p className="text-slate-600 text-xs sm:text-base md:text-lg max-w-xl leading-relaxed">
                            To be one of the leading training centers in the region — delivering top-quality professional education focused on continuous service excellence.
                        </p>
                    </motion.div>

                    {/* 6-Column Asymmetric Bento Grid for 5 Vision Values (Zero Icons) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-5">
                        {coreValues.map((item, i) => {
                            const isDark = i === 0
                            const isWarm = i === 1
                            const spanCls = i < 2 ? "lg:col-span-3" : "lg:col-span-2"

                            return (
                                <motion.article
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                                    className={`${spanCls} relative overflow-hidden rounded-[18px] sm:rounded-[26px] p-4 sm:p-7 lg:p-8 flex flex-col justify-between gap-3.5 sm:gap-5 transition-all duration-300 ${
                                        isDark
                                            ? "bg-[#0F172A] text-white border border-slate-800/50 shadow-[0_14px_38px_rgba(15,23,42,0.14)]"
                                            : isWarm
                                                ? "bg-white border border-[#794d00]/20 shadow-[0_8px_28px_rgba(121,77,0,0.06)] hover:border-[#794d00]/40"
                                                : "bg-white border border-slate-200/80 shadow-[0_6px_24px_rgba(15,23,42,0.03)] hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)] hover:border-[#794d00]/35"
                                    }`}
                                >
                                    {isDark && (
                                        <>
                                            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
                                            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
                                        </>
                                    )}

                                    <div className="relative z-10 flex items-center justify-between gap-3">
                                        <span
                                            className={`text-[11px] sm:text-xs font-extrabold tracking-[0.18em] ${
                                                isDark ? "text-slate-400" : isWarm ? "text-[#794d00]/70" : "text-slate-400"
                                            }`}
                                        >
                                            0{i + 1}
                                        </span>
                                        <span
                                            className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider ${
                                                isDark
                                                    ? "bg-white/10 border border-white/15 text-amber-200"
                                                    : isWarm
                                                        ? "bg-[#794d00] text-white"
                                                        : "bg-[#f5f5f7] text-slate-700"
                                            }`}
                                        >
                                            {item.stat}
                                        </span>
                                    </div>

                                    <div className="relative z-10 space-y-1.5 sm:space-y-2">
                                        <h3
                                            className={`text-base sm:text-xl font-extrabold leading-snug tracking-tight ${
                                                isDark ? "text-white" : "text-slate-950"
                                            }`}
                                        >
                                            {item.title}
                                        </h3>
                                        <p
                                            className={`text-xs sm:text-sm leading-relaxed ${
                                                isDark ? "text-slate-300" : "text-slate-600"
                                            }`}
                                        >
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.article>
                            )
                        })}
                    </div>
                </div>

                {/* ── Mission ── */}
                <div className="pt-8 sm:pt-16 border-t border-slate-200/70">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-3 sm:gap-8 mb-6 sm:mb-12"
                    >
                        <div className="space-y-1 sm:space-y-2.5">
                            <span className="text-[#794d00] font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase block">
                                Our Mission
                            </span>
                            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#794d00] tracking-tight uppercase leading-[1.08]">
                                Empowering <span className="text-slate-950">Human Talent.</span>
                            </h2>
                        </div>
                        <p className="text-slate-600 text-xs sm:text-base md:text-lg max-w-xl leading-relaxed">
                            Bringing together expert instructors, up-to-date technology, and an inspiring environment so every trainee experiences lasting value.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5">
                        {missionObjectives.map((obj, i) => (
                            <motion.article
                                key={obj.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                                className="rounded-[18px] sm:rounded-[26px] bg-white border border-slate-200/80 p-4 sm:p-7 flex flex-col justify-between gap-3.5 sm:gap-5 shadow-[0_6px_24px_rgba(15,23,42,0.03)] hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)] hover:border-[#794d00]/35 transition-all duration-300"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-[11px] sm:text-xs font-extrabold tracking-[0.18em] text-slate-400">
                                        0{i + 1}
                                    </span>
                                    <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#fffbf5] border border-[#794d00]/15 text-[#794d00] text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider">
                                        {obj.stat}
                                    </span>
                                </div>

                                <div className="space-y-1.5 sm:space-y-2">
                                    <h3 className="text-base sm:text-xl font-extrabold text-slate-950 leading-snug tracking-tight">
                                        {obj.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                        {obj.description}
                                    </p>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>

                {/* ── Footer Bar (Zero Icons) ── */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-slate-200/70">
                    <span className="text-[#794d00] font-bold text-[11px] sm:text-xs tracking-widest uppercase">
                        Vision &amp; Mission — Driving Every Decision
                    </span>
                    <Link
                        href="/contact"
                        className="inline-flex items-center px-5 py-2.5 rounded-full bg-white border border-slate-200/80 text-[10px] font-black tracking-widest uppercase text-[#794d00] hover:border-[#794d00] hover:text-slate-950 transition-colors"
                    >
                        Get In Touch
                    </Link>
                </div>
            </div>
        </section>
    )
}
