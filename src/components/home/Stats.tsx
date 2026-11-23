"use client"

import { motion } from "framer-motion"

const quickFacts = [
    { label: "Programs", value: "50+ Tracks" },
    { label: "Google Rating", value: "4.9 / 5.0" },
    { label: "Training Style", value: "100% Practical" },
    { label: "Schedules", value: "Flexible UAE Batches" },
]

export default function Stats() {
    return (
        <section className="relative bg-white py-10 sm:py-16 md:py-24 font-figtree overflow-hidden border-t border-slate-100">
            {/* Subtle Ambient Background Accents */}
            <div className="absolute top-0 left-[-10%] w-[480px] h-[480px] bg-[#794d00]/[0.03] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-[-10%] w-[460px] h-[460px] bg-blue-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

            <div className="container-custom relative z-10 mx-auto px-4 sm:px-6">
                {/* ── Section Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-3 sm:gap-8 mb-6 sm:mb-14"
                >
                    <div className="space-y-1 sm:space-y-2.5">
                        <span className="text-[#794d00] font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase block">
                            Performance Metrics
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#794d00] tracking-tight uppercase leading-[1.08]">
                            Measurable <span className="text-slate-950">Success.</span>
                        </h2>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-base md:text-lg max-w-xl leading-relaxed">
                        We don&apos;t just teach; we deliver measurable career outcomes. Every training track is structured around verified skills and employer expectations across Abu Dhabi.
                    </p>
                </motion.div>

                {/* ── Redesigned 12-Column Editorial Metrics Grid (Zero Icons) ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-5">
                    {/* 01 — 95% Career Transformation (Dark Spotlight) */}
                    <motion.article
                        initial={{ opacity: 0, y: 22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="md:col-span-2 lg:col-span-5 relative overflow-hidden rounded-[20px] sm:rounded-[28px] bg-[#1e2a3b] text-white p-4 sm:p-8 lg:p-9 flex flex-col justify-between gap-4 sm:gap-7 shadow-[0_14px_40px_rgba(15,23,42,0.14)]"
                    >
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:26px_26px] pointer-events-none" />
                        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#794d00]/25 blur-[80px] pointer-events-none" />

                        <div className="relative z-10 flex items-center justify-between gap-3">
                            <span className="text-[11px] sm:text-xs font-extrabold tracking-[0.2em] uppercase text-slate-400">
                                01
                            </span>
                            <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/10 border border-white/15 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-amber-200">
                                Within 6 Months
                            </span>
                        </div>

                        <div className="relative z-10 space-y-2.5 sm:space-y-4">
                            <div className="space-y-1">
                                <span className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-amber-300 block leading-none">
                                    95%
                                </span>
                                <h3 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight pt-0.5 sm:pt-1">
                                    Career Transformation
                                </h3>
                            </div>
                            <p className="text-slate-300 text-xs sm:text-sm lg:text-[15px] leading-relaxed">
                                Over 95% of our trainees report a promotion, new role, or measurable career transition within 6 months of completing their program.
                            </p>

                            {/* Progress Bar */}
                            <div className="space-y-1.5 pt-0.5 sm:pt-1">
                                <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-slate-300">
                                    <span>Career Advancement Rate</span>
                                    <span className="text-amber-300">95%</span>
                                </div>
                                <div className="h-1.5 sm:h-2 w-full rounded-full bg-white/10 overflow-hidden">
                                    <div className="h-full w-[95%] rounded-full bg-gradient-to-r from-[#794d00] via-amber-500 to-amber-300" />
                                </div>
                            </div>
                        </div>
                    </motion.article>

                    {/* 02 — 15+ Years Industry Mastery */}
                    <motion.article
                        initial={{ opacity: 0, y: 22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-4 rounded-[20px] sm:rounded-[28px] bg-[#fffbf5] border border-[#794d00]/15 p-4 sm:p-8 lg:p-9 flex flex-col justify-between gap-4 sm:gap-7 hover:border-[#794d00]/35 hover:shadow-[0_14px_34px_rgba(121,77,0,0.08)] transition-all duration-300"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <span className="text-[11px] sm:text-xs font-extrabold tracking-[0.2em] uppercase text-[#794d00]/60">
                                02
                            </span>
                            <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#794d00] text-white text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">
                                Since 2010
                            </span>
                        </div>

                        <div className="space-y-2.5 sm:space-y-4">
                            <div className="space-y-1">
                                <span className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#794d00] block leading-none">
                                    15+
                                </span>
                                <h3 className="text-lg sm:text-2xl font-extrabold text-slate-950 tracking-tight pt-0.5 sm:pt-1">
                                    Years of Mastery
                                </h3>
                            </div>
                            <p className="text-slate-600 text-xs sm:text-sm lg:text-[15px] leading-relaxed">
                                Over a decade and a half delivering ACTVET-approved technical, accounting, IT, and language programs trusted by Abu Dhabi professionals.
                            </p>
                            <p className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#794d00]">
                                ACTVET Licenced · Abu Dhabi
                            </p>
                        </div>
                    </motion.article>

                    {/* 03 — 10K+ Global Alumni Network */}
                    <motion.article
                        initial={{ opacity: 0, y: 22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.55, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-3 rounded-[20px] sm:rounded-[28px] bg-[#f5f5f7] border border-slate-200/80 p-4 sm:p-8 flex flex-col justify-between gap-4 sm:gap-7 hover:bg-white hover:border-[#794d00]/30 hover:shadow-[0_14px_34px_rgba(15,23,42,0.07)] transition-all duration-300"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <span className="text-[11px] sm:text-xs font-extrabold tracking-[0.2em] uppercase text-slate-400">
                                03
                            </span>
                            <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white border border-slate-200/80 text-slate-700 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">
                                UAE &amp; Global
                            </span>
                        </div>

                        <div className="space-y-2.5 sm:space-y-4">
                            <div className="space-y-1">
                                <span className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 block leading-none">
                                    10K+
                                </span>
                                <h3 className="text-lg sm:text-2xl font-extrabold text-slate-950 tracking-tight pt-0.5 sm:pt-1">
                                    Alumni Network
                                </h3>
                            </div>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                Join more than 10,000 graduates working across leading engineering, healthcare, finance, and corporate organizations in the Emirates.
                            </p>
                        </div>
                    </motion.article>
                </div>

                {/* ── Bottom Compact Fact Strip ── */}
                <div className="mt-3 sm:mt-5 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                    {quickFacts.map((fact) => (
                        <div
                            key={fact.label}
                            className="rounded-xl sm:rounded-2xl bg-[#fffbf5] border border-[#794d00]/10 px-3.5 py-2.5 sm:px-5 sm:py-4 flex flex-col gap-0.5"
                        >
                            <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
                                {fact.label}
                            </span>
                            <span className="text-xs sm:text-base font-extrabold text-slate-900">
                                {fact.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
