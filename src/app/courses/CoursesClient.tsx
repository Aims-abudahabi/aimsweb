"use client"

import { useState, useEffect, useRef, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Search, BookOpen, Clock, ChevronRight, TrendingUp, ArrowRight, Star, X } from "lucide-react"
import _ from "lodash"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useCourses } from "@/hooks/useCourse"
import ContactForm from "@/components/ContactForm"
import FAQ from "@/components/FAQ"

gsap.registerPlugin(ScrollTrigger)

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
    'engineering-cad',
    'office-administration',
    'graphic-design-animation',
    'finance-accounting',
    'network-it',
    'language-courses'
]

function CoursesContent() {
    const [searchTerm, setSearchTerm] = useState("")
    const [activeCategory, setActiveCategory] = useState<string | null>(null)
    const { courses: coursesData, loading } = useCourses()
    const containerRef = useRef<HTMLDivElement>(null)
    const stickyBarRef = useRef<HTMLDivElement>(null)
    const searchParams = useSearchParams()

    // Filter using lodash
    const filteredCourses = useMemo(() => _.filter(coursesData, course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
    ), [coursesData, searchTerm])

    // Grouped & ordered - Exclude signature cards from the list using lodash reject/groupBy
    const groupedCourses = useMemo(() => 
        _.groupBy(
            _.reject(filteredCourses, course => SIGNATURE_COURSE_IDS.includes(course.id)), 
            'category'
        ), 
    [filteredCourses])

    const categories = useMemo(() =>
        CATEGORY_ORDER.filter(cat => groupedCourses[cat]?.length > 0),
        [groupedCourses]
    )

    // Popular (most searched) courses
    const popularCourses = useMemo(() =>
        coursesData.filter(c => c.popular).slice(0, 4),
        [coursesData]
    )

    // Handle category from URL
    useEffect(() => {
        if (!loading && coursesData.length > 0) {
            const cat = searchParams.get("category")
            if (cat) {
                // Small delay to ensure layout is ready
                setTimeout(() => {
                    scrollToCategory(decodeURIComponent(cat))
                }, 500)
            }
        }
    }, [loading, searchParams, coursesData])

    useGSAP(() => {
        if (loading || coursesData.length === 0) return
        gsap.from(".hero-reveal", {
            y: 30,
            opacity: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
        })
    }, { dependencies: [loading, coursesData.length], scope: containerRef })

    const scrollToCategory = (cat: string) => {
        setActiveCategory(cat)
        const el = document.getElementById(`cat-${cat.replace(/\s+/g, "-").toLowerCase()}`)
        el?.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    return (
        <div ref={containerRef} className="courses-page min-h-screen bg-[#fffbf5] font-figtree">

            {/* ── Hero ── */}
            <section className="relative bg-[#fffbf5] pt-28 pb-16 overflow-hidden border-b border-slate-100/60">
                {/* Subtle warm background circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#794d00]/[0.03] rounded-full blur-[80px] pointer-events-none" />

                <div className="container-custom relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12">
                    <div className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto">

                        <div className="hero-reveal inline-flex items-center gap-2 px-4 py-2 bg-[#794d00]/10 border border-[#794d00]/20 rounded-full text-[#794d00] text-xs font-black uppercase tracking-[0.2em]">
                            <BookOpen size={13} /> 50+ Professional Programs
                        </div>

                        <h1 className="hero-reveal font-extrabold text-slate-900 leading-[1.1] tracking-tight text-4xl sm:text-5xl xl:text-[64px]">
                            Explore Our Complete <br className="hidden md:block" />
                            <span className="text-[#794d00]">Training Catalog</span>
                        </h1>

                        <p className="hero-reveal text-slate-500 text-sm sm:text-base font-medium leading-relaxed max-w-xl">
                            Industry-recognised certifications crafted for ambitious professionals in the UAE. Find the program that accelerates your career.
                        </p>

                        {/* Search bar — matches site's card aesthetic */}
                        <div className="hero-reveal w-full max-w-2xl group">
                            <div className="relative flex items-center bg-white rounded-[20px] border border-slate-200 shadow-xl shadow-slate-200/50 transition-all focus-within:border-[#794d00]/40 focus-within:shadow-2xl focus-within:shadow-[#794d00]/10">
                                <Search className="ml-6 text-slate-400 group-focus-within:text-[#794d00] transition-colors shrink-0" size={22} />
                                <input
                                    type="text"
                                    placeholder="Search by course or category…"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-4 pr-6 py-5 outline-none text-[17px] font-medium text-slate-900 bg-transparent placeholder:text-slate-400"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="mr-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Sticky Category Bar ── */}
            {!loading && categories.length > 0 && (
                <div
                    ref={stickyBarRef}
                    className="sticky top-[76px] z-30 bg-[#fffbf5]/90 backdrop-blur-md border-b border-slate-100"
                >
                    <div className="container-custom max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 py-3 overflow-x-auto scrollbar-hide">
                        <div className="flex items-center gap-2 min-w-max">
                            {searchTerm === "" && (
                                <button
                                    onClick={() => {
                                        window.scrollTo({ top: 0, behavior: "smooth" })
                                        setActiveCategory(null)
                                    }}
                                    className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === null ? "bg-[#794d00] text-white" : "text-slate-500 hover:text-[#794d00] hover:bg-[#794d00]/5"}`}
                                >
                                    Top Picks
                                </button>
                            )}
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => scrollToCategory(cat)}
                                    className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat ? "bg-[#794d00] text-white" : "text-slate-500 hover:text-[#794d00] hover:bg-[#794d00]/5"}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="container-custom max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 py-12 md:py-16 space-y-16 md:space-y-20">

                {/* ── Most Searched / Popular ── */}
                {!loading && searchTerm === "" && popularCourses.length > 0 && (
                    <div className="popular-section space-y-10">
                        {/* Section header — same style as FeaturedCourses */}
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                            <div className="space-y-3">
                                <span className="text-[#794d00] font-bold tracking-widest text-xs uppercase flex items-center gap-2">
                                    <TrendingUp size={14} className="text-blue-500" /> Most Searched Programs
                                </span>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#794d00] tracking-tight uppercase max-w-xl leading-tight">
                                    Top Picks <span className="text-slate-900">This Month.</span>
                                </h2>
                            </div>
                            <p className="text-slate-600 text-base max-w-sm leading-relaxed">
                                The most requested certifications by professionals across the UAE right now.
                            </p>
                        </div>

                        {/* Popular cards — same styling as FeaturedCourses cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {popularCourses.map((course, idx) => (
                                <div
                                    key={course.id}
                                    className="bg-white p-5 pb-3 sm:p-8 rounded-[20px] border border-slate-100 shadow-xl shadow-slate-200/50 transition-all hover:scale-[1.01] duration-300 flex flex-col gap-3 sm:gap-6 group relative"
                                >
                                    {/* Trending badge */}
                                    <div className="absolute top-5 right-5 text-amber-500 bg-amber-50 p-1.5 rounded-lg z-20">
                                        <Star size={14} fill="currentColor" />
                                    </div>

                                    {/* Icon row */}
                                    <div className="flex items-center justify-between">
                                        <div className="text-blue-500 transform group-hover:scale-110 transition-transform duration-300">
                                            <BookOpen size={window.innerWidth < 640 ? 24 : 32} />
                                        </div>
                                        <span className="text-2xl sm:text-3xl font-black text-slate-100 group-hover:text-slate-200 transition-colors select-none">
                                            0{idx + 1}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-1 sm:space-y-3 flex-1">
                                        <h3 className="text-[16px] sm:text-[19px] font-bold text-[#0f172a] leading-[1.3]">
                                            {course.title}
                                        </h3>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                            {course.category}
                                        </p>
                                        <p className="text-[12px] sm:text-[14px] text-slate-500 font-medium leading-relaxed line-clamp-2">
                                            {course.description}
                                        </p>
                                    </div>

                                    {/* CTA - Hidden on mobile, matches FeaturedCourses */}
                                    <Link
                                        href={`/courses/${course.id}`}
                                        className="block group/link"
                                    >
                                        <span className="absolute inset-0 z-10 sm:hidden"></span>
                                        <div className="hidden sm:flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
                                            <span className="text-[10px] font-black tracking-widest uppercase text-[#794d00]">Learn More</span>
                                            <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-[#794d00] group-hover/link:bg-[#794d00] group-hover/link:text-white transition-all duration-300">
                                                <ArrowRight size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* Footer divider */}
                        <div className="pt-10 border-t border-slate-100/80" />
                    </div>
                )}

                {/* ── Loading State ── */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white/50 animate-pulse h-[280px] rounded-[20px] border border-slate-100" />
                        ))}
                    </div>
                )}

                {/* ── Categorized Courses ── */}
                {!loading && (
                    <div className="space-y-24">
                        {categories.map((cat) => (
                            <div
                                key={cat}
                                id={`cat-${cat.replace(/\s+/g, "-").toLowerCase()}`}
                                className="scroll-mt-40 space-y-10"
                            >
                                {/* Category header — matching FeaturedCourses style */}
                                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-4 border-b border-slate-100">
                                    <div className="space-y-2">
                                        <span className="text-[#794d00] font-bold tracking-widest text-xs uppercase flex items-center gap-2">
                                            <BookOpen size={13} className="text-blue-500" />
                                            {groupedCourses[cat].length} Specialized Tracks
                                        </span>
                                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#794d00] tracking-tight uppercase leading-tight">
                                            {cat}
                                        </h2>
                                    </div>
                                    <Link
                                        href={`#cat-${cat.replace(/\s+/g, "-").toLowerCase()}`}
                                        className="group inline-flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-[#794d00] hover:text-slate-900 transition-colors shrink-0"
                                    >
                                        View All {cat}
                                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>

                                {/* Course cards — matching FeaturedCourses card style */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {groupedCourses[cat].map((course) => (
                                        <div
                                            key={course.id}
                                            className="group relative bg-white p-5 pb-3 sm:p-8 rounded-[20px] border border-slate-100 shadow-xl shadow-slate-200/50 transition-all hover:scale-[1.01] duration-300 flex flex-col gap-3 sm:gap-6"
                                        >
                                            {/* Top row */}
                                            <div className="flex items-center justify-between">
                                                <div className="text-blue-500 transform group-hover:scale-110 transition-transform duration-300">
                                                    <BookOpen size={window.innerWidth < 640 ? 24 : 32} />
                                                </div>
                                                <span className="px-3 py-1 bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                                    {course.level}
                                                </span>
                                            </div>

                                            {/* Content */}
                                            <div className="space-y-1 sm:space-y-3 flex-1">
                                                <h3 className="text-[16px] sm:text-[19px] font-bold text-[#0f172a] leading-[1.25]">
                                                    {course.title}
                                                </h3>
                                                <p className="text-[12px] sm:text-[14px] text-slate-500 font-medium leading-relaxed line-clamp-2">
                                                    {course.description}
                                                </p>
                                                <div className="flex items-center gap-2 text-[11px] sm:text-[12px] text-slate-400 font-bold mt-1 sm:mt-2">
                                                    <Clock size={14} className="text-blue-500" />
                                                    {course.duration}
                                                </div>
                                            </div>

                                            {/* CTA - Matches FeaturedCourses */}
                                            <Link
                                                href={`/courses/${course.id}`}
                                                className="block group/link"
                                            >
                                                <span className="absolute inset-0 z-10 sm:hidden"></span>
                                                <div className="hidden sm:flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
                                                    <span className="text-[10px] font-black tracking-widest uppercase text-[#794d00]">View Details</span>
                                                    <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-[#794d00] group-hover/link:bg-[#794d00] group-hover/link:text-white transition-all duration-300">
                                                        <ArrowRight size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ── Empty State ── */}
                {!loading && categories.length === 0 && (
                    <div className="text-center py-32 space-y-8">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-[#794d00]/5 rounded-full">
                            <Search size={40} className="text-[#794d00]/40" />
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-2xl font-bold text-slate-900">No programs found</h3>
                            <p className="text-slate-500 max-w-md mx-auto text-base font-medium">
                                We couldn&apos;t find any courses matching <strong>&quot;{searchTerm}&quot;</strong>. Try a different keyword like &quot;Excel&quot; or &quot;AutoCAD&quot;.
                            </p>
                        </div>
                        <button
                            onClick={() => setSearchTerm("")}
                            className="bg-[#794d00] text-white px-8 py-4 rounded-2xl font-bold text-[15px] transition-all hover:bg-[#1e2a3b] hover:text-blue-500 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-[#794d00]/20"
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
        <Suspense fallback={
            <div className="min-h-screen bg-[#fffbf5] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#794d00]/20 border-t-[#794d00] rounded-full animate-spin" />
            </div>
        }>
            <CoursesContent />
        </Suspense>
    )
}
