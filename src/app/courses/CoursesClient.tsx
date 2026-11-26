"use client"

import { useState, useEffect, useRef, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import _ from "lodash"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useCourses } from "@/hooks/useCourse"
import ContactForm from "@/components/ContactForm"
import FAQ from "@/components/FAQ"

const CATEGORY_ORDER = [
    "Engineering and CAD",
    "Office Administration",
    "Graphic Design and Animation",
    "Finance & Accounting",
    "IT & Networking",
    "Language Courses",
    "Project Management",
    "Soft Skills",
]

const SIGNATURE_COURSE_IDS = [
    "engineering-cad",
    "office-administration",
    "graphic-design-animation",
    "finance-accounting",
    "network-it",
    "language-courses",
]

function CoursesContent() {
    const [searchTerm, setSearchTerm] = useState("")
    const [activeCategory, setActiveCategory] = useState<string | null>(null)
    const { courses: coursesData, loading } = useCourses()
    const containerRef = useRef<HTMLDivElement>(null)
    const searchParams = useSearchParams()

    const filteredCourses = useMemo(
        () =>
            _.filter(
                coursesData,
                (course) =>
                    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    course.category.toLowerCase().includes(searchTerm.toLowerCase())
            ),
        [coursesData, searchTerm]
    )

    const groupedCourses = useMemo(
        () =>
            _.groupBy(
                _.reject(filteredCourses, (course) => SIGNATURE_COURSE_IDS.includes(course.id)),
                "category"
            ),
        [filteredCourses]
    )

    const categories = useMemo(
        () => CATEGORY_ORDER.filter((cat) => groupedCourses[cat]?.length > 0),
        [groupedCourses]
    )

    const popularCourses = useMemo(
        () => coursesData.filter((c) => c.popular).slice(0, 4),
        [coursesData]
    )

    const scrollToCategory = (cat: string) => {
        setActiveCategory(cat)
        const el = document.getElementById(`cat-${cat.replace(/\s+/g, "-").toLowerCase()}`)
        if (!el) return
        if (window.__lenis) {
            window.__lenis.scrollTo(el, { offset: -140, duration: 0.85 })
        } else {
            el.scrollIntoView({ behavior: "smooth", block: "start" })
        }
    }

    useEffect(() => {
        if (!loading && coursesData.length > 0) {
            const cat = searchParams.get("category")
            if (cat) {
                setTimeout(() => {
                    scrollToCategory(decodeURIComponent(cat))
                }, 400)
            }
        }
    }, [loading, searchParams, coursesData])

    useGSAP(
        () => {
            if (loading || coursesData.length === 0) return
            if (typeof window !== "undefined") {
                gsap.registerPlugin(ScrollTrigger)
            }
            gsap.from(".hero-reveal", {
                y: 24,
                opacity: 0,
                stagger: 0.1,
                duration: 0.7,
                ease: "power3.out",
                clearProps: "all",
            })
        },
        { dependencies: [loading, coursesData.length], scope: containerRef }
    )

    return (
        <div ref={containerRef} className="courses-page min-h-screen bg-white font-figtree">
            {/* ── Dark Hero Header (Same model as Individual Courses & Enroll, no form) ── */}
            <section className="relative w-full bg-[#020617] pt-24 sm:pt-36 lg:pt-40 pb-10 sm:pb-20 overflow-hidden">
                {/* Background image — identical setup to CourseDetailClient & EnrollClient */}
                <div className="absolute inset-0 z-0 bg-[url('/contact_hero_bg.png')] bg-cover bg-center bg-no-repeat transform scale-105">
                    <div className="absolute inset-0 bg-[#020617]/65 bg-gradient-to-t from-[#020617] via-[#020617]/45 to-[#020617]/70" />
                </div>

                <div className="container-custom mx-auto px-4 sm:px-6 max-w-[1400px] relative z-10">
                    {/* Breadcrumb */}
                    <nav
                        aria-label="Breadcrumb"
                        className="hero-reveal flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400 mb-5 sm:mb-9"
                    >
                        <Link href="/" className="hover:text-white transition-colors">
                            Home
                        </Link>
                        <span className="text-slate-600">/</span>
                        <span className="text-[#c8915a]">Courses</span>
                    </nav>

                    <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-4 sm:space-y-7">
                        {/* Title & Description */}
                        <div className="hero-reveal space-y-2.5 sm:space-y-4 flex flex-col items-center">
                            <h1 className="font-black text-white leading-[1.06] tracking-tight text-3xl sm:text-5xl lg:text-6xl uppercase">
                                Explore Our{" "}
                                <span className="text-[#c8915a]">Training Catalog.</span>
                            </h1>

                            <p className="text-slate-300 text-xs sm:text-base lg:text-lg font-medium leading-relaxed max-w-2xl">
                                Industry-recognised certifications crafted for ambitious professionals in Abu Dhabi. Find the program that accelerates your career.
                            </p>
                        </div>

                        {/* Clean Dark-Glass Pill Search Bar (No Icons) */}
                        <div className="hero-reveal w-full max-w-2xl pt-0.5 sm:pt-1">
                            <div className="relative flex items-center bg-white/10 backdrop-blur-xl rounded-full border border-white/20 focus-within:border-[#c8915a]/70 focus-within:bg-white/15 shadow-2xl transition-all p-1 sm:p-1.5">
                                <input
                                    type="text"
                                    placeholder="Search by course or category (e.g. AutoCAD, IELTS, Excel)…"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-4 pr-3 py-2.5 sm:pl-5 sm:pr-4 sm:py-3.5 outline-none text-xs sm:text-base font-medium text-white bg-transparent placeholder:text-slate-300/70"
                                />
                                {searchTerm && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchTerm("")}
                                        className="mr-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/15 hover:bg-white/25 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Sticky Category Filter Bar ── */}
            {!loading && categories.length > 0 && (
                <div className="sticky top-[62px] sm:top-[82px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/70">
                    <div className="container-custom mx-auto px-4 sm:px-6 py-2.5 sm:py-3 overflow-x-auto no-scrollbar">
                        <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
                            {searchTerm === "" && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (window.__lenis) {
                                            window.__lenis.scrollTo(0, { duration: 0.85 })
                                        } else {
                                            window.scrollTo({ top: 0, behavior: "smooth" })
                                        }
                                        setActiveCategory(null)
                                    }}
                                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.12em] sm:tracking-[0.14em] transition-all whitespace-nowrap cursor-pointer ${
                                        activeCategory === null
                                            ? "bg-[#794d00] text-white shadow-sm"
                                            : "bg-[#fffbf5] border border-[#794d00]/15 text-slate-700 hover:border-[#794d00]/40 hover:text-[#794d00]"
                                    }`}
                                >
                                    Top Picks
                                </button>
                            )}
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => scrollToCategory(cat)}
                                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.12em] sm:tracking-[0.14em] transition-all whitespace-nowrap cursor-pointer ${
                                        activeCategory === cat
                                            ? "bg-[#794d00] text-white shadow-sm"
                                            : "bg-slate-50 border border-slate-200/80 text-slate-600 hover:border-[#794d00]/35 hover:text-[#794d00]"
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="container-custom mx-auto px-4 sm:px-6 py-8 sm:py-14 md:py-16 space-y-10 sm:space-y-20">
                {/* ── Top Picks / Most Searched Programs (No Icons) ── */}
                {!loading && searchTerm === "" && popularCourses.length > 0 && (
                    <section className="space-y-5 sm:space-y-10">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-2.5 sm:gap-6">
                            <div className="space-y-1 sm:space-y-2.5">
                                <span className="text-[#794d00] font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase block">
                                    Most Searched Programs
                                </span>
                                <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#794d00] tracking-tight uppercase leading-tight">
                                    Top Picks <span className="text-slate-900">This Month.</span>
                                </h2>
                            </div>
                            <p className="text-slate-600 text-xs sm:text-base max-w-md leading-relaxed">
                                The most requested certifications by professionals across Abu Dhabi right now.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                            {popularCourses.map((course, idx) => (
                                <article
                                    key={course.id}
                                    className="group relative bg-[#fffbf5] rounded-[18px] sm:rounded-[24px] border border-[#794d00]/15 p-4 sm:p-7 flex flex-col justify-between gap-3.5 sm:gap-5 hover:border-[#794d00]/40 hover:shadow-[0_14px_34px_rgba(121,77,0,0.08)] transition-all duration-300"
                                >
                                    <Link
                                        href={`/courses/${course.id}`}
                                        className="absolute inset-0 z-20 cursor-pointer"
                                        aria-label={`Explore ${course.title}`}
                                    />

                                    <div className="flex items-center justify-between gap-3 pointer-events-none">
                                        <span className="text-[11px] sm:text-xs font-black tracking-[0.18em] text-[#794d00]/70">
                                            0{idx + 1}
                                        </span>
                                        <span className="px-2.5 py-0.5 sm:py-1 rounded-full bg-[#794d00] text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider">
                                            Popular
                                        </span>
                                    </div>

                                    <div className="space-y-1.5 sm:space-y-2 flex-1 pointer-events-none">
                                        <p className="text-[9px] sm:text-[10px] text-[#794d00] font-extrabold uppercase tracking-[0.16em]">
                                            {course.category}
                                        </p>
                                        <h3 className="text-base sm:text-xl font-extrabold text-slate-950 leading-snug tracking-tight">
                                            {course.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                                            {course.description}
                                        </p>
                                    </div>

                                    <div className="pt-3 sm:pt-4 border-t border-[#794d00]/10 flex items-center justify-between pointer-events-none">
                                        <span className="text-[11px] font-bold text-slate-500">
                                            {course.duration}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest uppercase text-[#794d00] group-hover:text-slate-950 transition-colors">
                                            Explore
                                            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {/* ── Loading State ── */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                                key={i}
                                className="bg-slate-100 animate-pulse h-[180px] sm:h-[240px] rounded-[18px] sm:rounded-[24px]"
                            />
                        ))}
                    </div>
                )}

                {/* ── Categorized Courses (Redesigned Editorial Cards — Zero Icons) ── */}
                {!loading && (
                    <div className="space-y-10 sm:space-y-20">
                        {categories.map((cat) => (
                            <section
                                key={cat}
                                id={`cat-${cat.replace(/\s+/g, "-").toLowerCase()}`}
                                className="scroll-mt-32 sm:scroll-mt-36 space-y-4 sm:space-y-8"
                            >
                                {/* Category Header */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-slate-200/70">
                                    <div className="space-y-0.5 sm:space-y-1">
                                        <span className="text-[#794d00] font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase block">
                                            {groupedCourses[cat].length} Specialized {groupedCourses[cat].length === 1 ? "Track" : "Tracks"}
                                        </span>
                                        <h2 className="text-xl sm:text-3xl font-bold text-slate-950 tracking-tight uppercase leading-tight">
                                            {cat}
                                        </h2>
                                    </div>
                                    <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#f5f5f7] border border-slate-200/80 text-[10px] sm:text-[11px] font-bold text-slate-600">
                                        ACTVET Approved
                                    </span>
                                </div>

                                {/* Course Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                                    {groupedCourses[cat].map((course, idx) => (
                                        <article
                                            key={course.id}
                                            className="group relative bg-white rounded-[18px] sm:rounded-[24px] border border-slate-200/80 p-4 sm:p-7 flex flex-col justify-between gap-3.5 sm:gap-5 shadow-[0_6px_24px_rgba(15,23,42,0.03)] hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)] hover:border-[#794d00]/35 transition-all duration-300"
                                        >
                                            <Link
                                                href={`/courses/${course.id}`}
                                                className="absolute inset-0 z-20 cursor-pointer"
                                                aria-label={`Explore ${course.title}`}
                                            />

                                            {/* Top Meta Row */}
                                            <div className="flex items-center justify-between gap-3 pointer-events-none">
                                                <span className="text-[11px] sm:text-xs font-extrabold tracking-[0.16em] text-slate-400">
                                                    {String(idx + 1).padStart(2, "0")}
                                                </span>
                                                <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#f5f5f7] text-[9px] sm:text-[10px] font-extrabold text-slate-700 uppercase tracking-wider group-hover:bg-[#fffbf5] group-hover:text-[#794d00] transition-colors">
                                                    {course.level}
                                                </span>
                                            </div>

                                            {/* Body */}
                                            <div className="space-y-1.5 sm:space-y-2.5 flex-1 pointer-events-none">
                                                <h3 className="text-base sm:text-xl font-extrabold text-slate-950 leading-snug tracking-tight group-hover:text-[#794d00] transition-colors">
                                                    {course.title}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2">
                                                    {course.description}
                                                </p>
                                            </div>

                                            {/* Footer Row */}
                                            <div className="pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between gap-3 pointer-events-none">
                                                <span className="text-[11px] font-bold text-slate-500">
                                                    {course.duration}
                                                </span>
                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest uppercase text-[#794d00] group-hover:text-slate-950 transition-colors">
                                                    View Details
                                                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                                                </span>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                )}

                {/* ── Empty State (No Icons) ── */}
                {!loading && categories.length === 0 && (
                    <div className="max-w-xl mx-auto text-center py-10 sm:py-24 px-5 sm:px-6 bg-[#fffbf5] rounded-[20px] sm:rounded-[28px] border border-[#794d00]/15 space-y-4 sm:space-y-5">
                        <span className="inline-block px-3.5 py-1 rounded-full bg-white border border-[#794d00]/15 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#794d00]">
                            No Match Found
                        </span>
                        <div className="space-y-2">
                            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950">
                                No programs found
                            </h3>
                            <p className="text-slate-500 text-xs sm:text-base font-medium leading-relaxed">
                                We couldn&apos;t find any courses matching <strong>&quot;{searchTerm}&quot;</strong>. Try searching for &quot;Excel&quot;, &quot;AutoCAD&quot;, or &quot;IELTS&quot;.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setSearchTerm("")}
                            className="inline-flex items-center justify-center rounded-full bg-[#794d00] hover:bg-[#0f172a] text-white px-6 sm:px-7 py-3 sm:py-3.5 font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
                        >
                            View All Programs
                        </button>
                    </div>
                )}
            </div>

            <ContactForm />
            <FAQ />
        </div>
    )
}

export default function CoursesClient() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-[#fffbf5] flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-[#794d00]/20 border-t-[#794d00] rounded-full animate-spin" />
                </div>
            }
        >
            <CoursesContent />
        </Suspense>
    )
}
