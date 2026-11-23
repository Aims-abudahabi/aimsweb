"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

interface StatItem {
    number: string
    label: string
    tag: string
    caption: string
}

const statsData: StatItem[] = [
    {
        number: "10,960",
        label: "Students Trained",
        tag: "Graduates",
        caption: "Professionals & learners upskilled across Abu Dhabi and the UAE.",
    },
    {
        number: "150,000",
        label: "Training Hours",
        tag: "Hands-On",
        caption: "Live classroom, lab, and project-based instructional hours delivered.",
    },
    {
        number: "48,000",
        label: "Corporate Learners",
        tag: "Enterprise",
        caption: "Employees trained across engineering, government, and private sectors.",
    },
    {
        number: "120",
        label: "Courses Offered",
        tag: "ACTVET",
        caption: "Specialized technical, finance, IT, creative, and language tracks.",
    },
]

function AnimatedCount({ end, inView }: { end: string; inView: boolean }) {
    const [display, setDisplay] = useState(end)
    const hasAnimated = useRef(false)

    useEffect(() => {
        if (!inView || hasAnimated.current) return
        hasAnimated.current = true

        const target = parseInt(end.replace(/,/g, ""), 10)
        if (isNaN(target)) return

        const duration = 1200
        const startTime = performance.now()
        let rafId = 0

        const tick = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(1, elapsed / duration)
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = Math.floor(eased * target)
            setDisplay(progress >= 1 ? end : current.toLocaleString())
            if (progress < 1) {
                rafId = requestAnimationFrame(tick)
            }
        }

        rafId = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(rafId)
    }, [end, inView])

    return <>{display}</>
}

export default function Stats() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

    return (
        <section
            ref={sectionRef}
            className="relative py-10 sm:py-20 md:py-24 bg-[#fffbf5] font-figtree overflow-hidden border-t border-slate-100"
        >
            <div className="container-custom relative z-10 mx-auto px-4 sm:px-6">
                {/* ── Header ── */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-3 sm:gap-8 mb-6 sm:mb-14">
                    <div className="space-y-1 sm:space-y-2.5">
                        <span className="text-[#794d00] font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase block">
                            Impact by Numbers
                        </span>
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#794d00] tracking-tight uppercase leading-[1.08]">
                            Proven <span className="text-slate-950">Track Record.</span>
                        </h2>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-base md:text-lg max-w-xl leading-relaxed">
                        Over 15 years of measurable impact empowering individuals and organizations across Abu Dhabi.
                    </p>
                </div>

                {/* ── 4 Editorial Stat Cards (2-col compact on mobile, Zero Icons) ── */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                    {statsData.map((stat, index) => {
                        const isDark = index === 0
                        return (
                            <motion.article
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                                className={`relative overflow-hidden rounded-[18px] sm:rounded-[26px] p-3.5 sm:p-7 flex flex-col justify-between gap-3 sm:gap-6 transition-all duration-300 ${
                                    isDark
                                        ? "bg-[#1e2a3b] text-white border border-slate-700/80 shadow-[0_14px_38px_rgba(15,23,42,0.14)]"
                                        : "bg-white border border-slate-200/80 shadow-[0_6px_24px_rgba(15,23,42,0.03)] hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)] hover:border-[#794d00]/35"
                                }`}
                            >
                                <div className="flex items-center justify-between gap-1.5">
                                    <span className="text-[10px] sm:text-xs font-extrabold tracking-[0.18em] text-slate-400">
                                        0{index + 1}
                                    </span>
                                    <span
                                        className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider ${
                                            isDark
                                                ? "bg-white/10 border border-white/15 text-amber-200"
                                                : "bg-[#fffbf5] border border-[#794d00]/15 text-[#794d00]"
                                        }`}
                                    >
                                        {stat.tag}
                                    </span>
                                </div>

                                <div className="space-y-1 sm:space-y-2">
                                    <div className="flex items-baseline gap-0.5 tabular-nums">
                                        <span
                                            className={`text-2xl sm:text-4xl font-black tracking-tight leading-none ${
                                                isDark ? "text-amber-300" : "text-[#794d00]"
                                            }`}
                                        >
                                            <AnimatedCount end={stat.number} inView={isInView} />
                                        </span>
                                        <span
                                            className={`text-lg sm:text-3xl font-black ${
                                                isDark ? "text-white" : "text-slate-900"
                                            }`}
                                        >
                                            +
                                        </span>
                                    </div>

                                    <h3
                                        className={`text-xs sm:text-lg font-extrabold tracking-tight leading-snug ${
                                            isDark ? "text-white" : "text-slate-950"
                                        }`}
                                    >
                                        {stat.label}
                                    </h3>

                                    <p
                                        className={`hidden sm:block text-xs leading-relaxed ${
                                            isDark ? "text-slate-300" : "text-slate-500"
                                        }`}
                                    >
                                        {stat.caption}
                                    </p>
                                </div>
                            </motion.article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
