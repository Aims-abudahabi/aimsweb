"use client"

import { useCourse, useCourses } from "@/hooks/useCourse"
import { useParams } from "next/navigation"
import {
    Clock, BookOpen, ArrowLeft,
    Plus, Minus, ArrowRight,
    AlertCircle, Check, Download, Search, ChevronDown
} from "lucide-react"
import { coursesData } from "@/data/courses"
import Link from "next/link"
import _ from "lodash"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import WhyChooseAIMS from "@/components/WhyChooseAIMS"
import ContactForm from "@/components/ContactForm"
import FAQ from "@/components/FAQ"

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────
   Exact clone of ContactForm – glassmorphic style
   Used in Hero (enroll) and Curriculum (brochure)
───────────────────────────────────────── */

type FormValues = {
    name: string;
    contact: string;
    email: string;
    course: string;
};

function CourseEnquiryForm({ submitLabel = "Submit Now", defaultCourse }: { submitLabel?: string, defaultCourse?: string }) {
    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
        defaultValues: {
            name: "",
            contact: "",
            email: "",
            course: defaultCourse || ""
        }
    })

    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState(defaultCourse || "")
    const dropdownRef = useRef<HTMLDivElement>(null)

    const watchedCourse = watch('course')

    // Group courses by category, applying search filter using lodash
    const filteredCourses = _.filter(Object.values(coursesData), (course) => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const groupedCourses = _.mapValues(
        _.groupBy(filteredCourses, 'category'),
        (courses) => _.uniq(_.map(courses, 'title'))
    )

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const onSubmit = async (data: FormValues) => {
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setIsSubmitted(true);
                reset();
                setSearchTerm(defaultCourse || "");
            } else {
                alert("Failed to send message. Please try again later.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("An error occurred. Please check your connection.");
        }
    }

    if (isSubmitted) {
        return (
            <div className="w-full bg-white/10 backdrop-blur-xl px-10 py-16 rounded-[2.5rem] border border-white/20 shadow-2xl flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center border border-blue-500/30">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <Check className="text-white w-6 h-6" />
                    </div>
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white">Message Sent!</h2>
                    <p className="text-white/60 text-sm">Thank you for reaching out. We&apos;ll get back to you soon.</p>
                </div>
                <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-blue-400 font-bold hover:text-blue-300 transition-colors uppercase tracking-widest text-xs"
                >
                    Send Another Message
                </button>
            </div>
        )
    }

    const inputCls = (field: keyof FormValues) =>
        `w-full px-5 py-4 rounded-lg bg-white/[0.03] border ${errors[field] ? "border-red-500/50" : "border-white/10"} focus:border-blue-500/40 focus:bg-white/[0.05] outline-none transition-all text-white font-normal`

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white/10 backdrop-blur-xl px-8 py-10 sm:px-12 sm:py-14 rounded-[2.5rem] border border-white/20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] space-y-8 relative">
            <div className="space-y-6 relative z-50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[14px] font-medium text-white ml-1">Full Name</label>
                        <input
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            className={inputCls("name")}
                        />
                        {errors.name && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} />{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-[14px] font-medium text-white ml-1">Contact Number</label>
                        <input
                            type="text"
                            {...register("contact", { 
                                required: "Contact number is required",
                                pattern: { value: /^[0-9+\s-]{7,15}$/, message: "Invalid contact number" }
                            })}
                            className={inputCls("contact")}
                        />
                        {errors.contact && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} />{errors.contact.message}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[14px] font-medium text-white ml-1">Email Address</label>
                        <input
                            type="email"
                            {...register("email", { 
                                required: "Email is required",
                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" }
                            })}
                            className={inputCls("email")}
                        />
                        {errors.email && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} />{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2 relative" ref={dropdownRef}>
                        <label className="text-[14px] font-medium text-white ml-1">Course Interested</label>
                        <div className="relative group/input">
                            <input
                                type="text"
                                placeholder="Type to search..."
                                {...register("course", { required: "Please select a course" })}
                                readOnly={!!defaultCourse}
                                onFocus={() => !defaultCourse && setIsDropdownOpen(true)}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setSearchTerm(val)
                                    setValue('course', val, { shouldValidate: true })
                                    setIsDropdownOpen(true)
                                }}
                                className={`w-full px-5 py-4 ${!defaultCourse ? 'pr-12' : ''} rounded-lg bg-white/[0.03] border ${errors.course ? 'border-red-500/50' : 'border-white/10'} focus:border-blue-500/40 focus:bg-white/[0.05] outline-none transition-all text-white font-normal ${defaultCourse ? 'opacity-80 cursor-not-allowed' : 'cursor-text'}`}
                            />
                            {!defaultCourse && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-white/40 group-focus-within/input:text-blue-400 transition-colors pointer-events-none">
                                    <Search size={18} />
                                    <ChevronDown size={18} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </div>
                            )}
                        </div>

                        {/* Custom Searchable Dropdown */}
                        {isDropdownOpen && !defaultCourse && (
                            <div 
                                data-lenis-prevent
                                className="absolute top-[calc(100%+8px)] left-0 w-full z-[100] bg-[#0f172a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl max-h-[280px] overflow-y-auto overscroll-contain scrollbar-thin scrollbar-thumb-white/10 p-2 animate-in fade-in slide-in-from-top-2 duration-200"
                            >
                                {Object.keys(groupedCourses).length > 0 ? (
                                    Object.entries(groupedCourses).map(([category, titles]) => (
                                        <div key={category} className="mb-2 last:mb-0">
                                            <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#c8915a] bg-[#794d00]/10 rounded-lg mb-1 sticky top-0 z-10 backdrop-blur-md">
                                                {category}
                                            </div>
                                            <div className="space-y-0.5">
                                                {titles.map((title, i) => (
                                                    <button
                                                        key={i}
                                                        type="button"
                                                        onClick={() => {
                                                            setValue('course', title, { shouldValidate: true })
                                                            setSearchTerm(title)
                                                            setIsDropdownOpen(false)
                                                        }}
                                                        className="w-full text-left px-4 py-2.5 rounded-xl text-[13px] text-white/80 hover:text-white hover:bg-white/10 transition-all font-medium flex items-center justify-between group"
                                                    >
                                                        {title}
                                                        <Check size={14} className={`text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity ${watchedCourse === title ? 'opacity-100' : ''}`} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-4 py-8 text-center space-y-2">
                                        <p className="text-[13px] text-white/40 italic">No matching courses found.</p>
                                        <p className="text-[11px] text-[#c8915a] font-bold uppercase tracking-widest">You can keep typing your own...</p>
                                    </div>
                                )}
                            </div>
                        )}
                        {errors.course && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1 mt-1"><AlertCircle size={10} />{errors.course.message}</p>}
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-2 text-center relative z-10">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white py-5 rounded-xl font-bold text-base transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Sending...
                        </>
                    ) : submitLabel}
                </button>
                <p className="text-[13px] font-normal text-white opacity-60 leading-relaxed">
                    From zero to job-ready. Apply in 60 seconds.
                </p>
            </div>
        </form>
    )
}

/* ─────────────────────────────────────────
   Expandable curriculum accordion item
───────────────────────────────────────── */
function CurriculumItem({ index, item }: { index: number; item: string }) {
    const [open, setOpen] = useState(false)
    return (
        <div className="border border-slate-200 rounded-xl mb-4 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:border-slate-300">
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center gap-4 px-6 py-5 text-left group hover:bg-blue-50 transition-colors"
            >
                <div className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
                    {open ? <Minus className="text-blue-600" size={16} /> : <Plus className="text-slate-400 group-hover:text-blue-600" size={16} />}
                </div>
                <span className={`text-[14px] font-bold transition-colors flex-1 ${open ? "text-[#794d00]" : "text-slate-800"}`}>
                    {item}
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? "max-h-[500px] opacity-100 border-t border-blue-50" : "max-h-0 opacity-0"}`}
            >
                <div className="px-14 pb-6 pt-5 text-[13px] text-slate-500 font-medium leading-relaxed">
                    Hands-on training covering all core aspects of {item.toLowerCase()}, with practical exercises
                    tailored to UAE industry standards and employer expectations.
                </div>
            </div>
        </div>
    )
}

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */

const SIGNATURE_COURSE_IDS = [
    'finance-accounting',
    'office-administration',
    'engineering-cad',
    'graphic-design-animation',
    'network-it'
]

export default function CourseDetail() {
    const { id } = useParams()
    const { course, loading } = useCourse(id as string)
    const { courses: allCourses } = useCourses()
    const containerRef = useRef<HTMLDivElement>(null)

    let relatedCourses = _.take(
        _.reject(allCourses, c => c.id === course?.id || SIGNATURE_COURSE_IDS.includes(c.id) || c.category !== course?.category),
        3
    )

    if (relatedCourses.length === 0 && course && allCourses.length > 0) {
        relatedCourses = _.take(
            _.reject(allCourses, c => c.id === course.id || SIGNATURE_COURSE_IDS.includes(c.id)),
            3
        )
    }

    // Category → generated course image mapping
    const CATEGORY_IMAGES: Record<string, string> = {
        "Finance & Accounting": "/images/course-finance.png",
        "Office Administration": "/images/course-office.png",
        "Engineering and CAD": "/images/course-engineering.png",
        "Graphic Design and Animation": "/images/course-design.png",
        "Project Management": "/images/course-pm.png",
        "IT & Networking": "/images/course-it.png",
        "Soft Skills": "/images/brown-hero-student.png",
        "Language": "/images/hero-light.png",
    }
    const categoryImage = course ? (CATEGORY_IMAGES[course.category] ?? "/images/excellence.png") : "/images/excellence.png"

    useGSAP(() => {
        if (!loading && course && allCourses.length > 0) {
            gsap.from(".hero-reveal", {
                y: 40, opacity: 0, stagger: 0.1, duration: 0.9, ease: "power3.out",
            })
            gsap.from(".overview-reveal", {
                y: 30, opacity: 0, stagger: 0.08, duration: 0.7, ease: "power2.out",
                scrollTrigger: { trigger: ".overview-section", start: "top 85%" },
            })
            gsap.from(".curriculum-reveal", {
                y: 30, opacity: 0, stagger: 0.06, duration: 0.7, ease: "power2.out",
                scrollTrigger: { trigger: ".curriculum-section", start: "top 85%" },
            })
        }
    }, { dependencies: [loading, course, allCourses.length], scope: containerRef })

    /* ── Loading skeleton ── */
    if (loading) return (
        <div className="min-h-screen bg-[#0f172a] pt-36 pb-20 font-figtree">
            <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 space-y-10">
                <div className="h-4 w-28 bg-white/10 animate-pulse rounded-full" />
                <div className="h-12 w-2/3 bg-white/10 animate-pulse rounded-2xl" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="h-[360px] bg-white/10 animate-pulse rounded-[20px]" />
                    <div className="h-[360px] bg-white/10 animate-pulse rounded-[20px]" />
                </div>
            </div>
        </div>
    )

    /* ── Not found ── */
    if (!course) return (
        <div className="min-h-screen bg-[#fffbf5] font-figtree flex items-center justify-center">
            <div className="text-center space-y-8 py-32 px-6">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-[#794d00]/5 rounded-full">
                    <BookOpen size={40} className="text-[#794d00]/40" />
                </div>
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold text-slate-900">Course Not Found</h2>
                    <p className="text-slate-500 max-w-md mx-auto text-base font-medium">
                        The program you&apos;re looking for might have been moved or doesn&apos;t exist.
                    </p>
                </div>
                <Link href="/courses" className="inline-flex items-center gap-3 bg-[#794d00] text-white px-8 py-4 rounded-2xl font-bold text-[15px] transition-all hover:bg-[#1e2a3b] hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-[#794d00]/20">
                    <ArrowLeft size={18} /> Back to All Courses
                </Link>
            </div>
        </div>
    )

    return (
        <div ref={containerRef} className="course-detail-page min-h-screen font-figtree">

            {/* ══════════════════════════════════════════════════════
                ① HERO — same bg image as ContactForm + glassmorphic form
            ══════════════════════════════════════════════════════ */}
            <section className="relative w-full min-h-screen flex items-center overflow-hidden">

                {/* Background image — identical setup to ContactForm.tsx */}
                <div className="absolute inset-0 z-0 bg-[url('/contact_hero_bg.png')] bg-cover bg-center bg-no-repeat transform scale-105">
                    <div className="absolute inset-0 bg-[#020617]/60 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 pt-36 pb-20">


                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-14 lg:gap-20 items-start">

                        {/* Left: title block */}
                        <div className="space-y-7">
                            {/* Category pill */}
                            <div className="hero-reveal inline-flex items-center gap-2 px-4 py-1.5 bg-[#794d00]/30 border border-[#794d00]/40 rounded-full text-[#c8915a] text-[11px] font-black uppercase tracking-[0.2em]">
                                <BookOpen size={11} />
                                {course.category}
                            </div>

                            {/* Title */}
                            <h1 className="hero-reveal font-extrabold text-white leading-[1.05] tracking-tight text-4xl sm:text-5xl xl:text-[56px] uppercase">
                                {course.title}
                            </h1>

                            {/* Description */}
                            <p className="hero-reveal text-slate-300 text-base sm:text-[17px] font-medium leading-relaxed max-w-xl">
                                {course.description}
                            </p>

                            {/* CTAs */}
                            <div className="hero-reveal flex flex-wrap items-center gap-4 pt-2">
                                <a
                                    href="#enroll-form"
                                    className="inline-flex items-center gap-3 bg-white text-[#1e2a3b] px-8 py-4 rounded-full font-black text-[13px] tracking-widest uppercase transition-all hover:bg-[#fffbf5] hover:scale-[1.02] active:scale-[0.98] shadow-xl group"
                                >
                                    Start Learning
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                                <a
                                    href="#curriculum"
                                    className="inline-flex items-center gap-3 border-2 border-white/25 text-white px-8 py-4 rounded-full font-black text-[13px] tracking-widest uppercase transition-all hover:border-white/50 hover:bg-white/5 hover:scale-[1.01]"
                                >
                                    <Download size={14} />
                                    View Curriculum
                                </a>
                            </div>
                        </div>

                        {/* Right: glassmorphic enroll form */}
                        <div id="enroll-form" className="hero-reveal">
                            <CourseEnquiryForm submitLabel="Submit Now" defaultCourse={course.title} />
                        </div>

                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                ② OVERVIEW — white · left: text + stat pills · right: dark course card
            ══════════════════════════════════════════════════════ */}
            <section className="overview-section bg-white border-b border-slate-100">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                        {/* Left: overview text */}
                        <div className="space-y-8">
                            <div className="overview-reveal inline-flex items-center px-4 py-1.5 bg-[#794d00]/10 border border-[#794d00]/20 rounded-full text-[#794d00] text-[11px] font-black uppercase tracking-[0.2em]">
                                Overview
                            </div>

                            <div className="overview-reveal space-y-4">
                                <p className="text-[15px] text-slate-700 font-medium leading-relaxed">
                                    {course.description}
                                </p>
                                <p className="text-[15px] text-slate-500 font-medium leading-relaxed">
                                    Our learning model is hands-on and project-driven. Each module ends with practical applications
                                    that go directly into your professional portfolio. By the end, you&apos;ll have a set of
                                    industry-ready skills that make you stand out to employers across the UAE.
                                </p>
                            </div>

                            {/* Stat pills */}
                            <div className="overview-reveal flex flex-wrap gap-3 pt-2">
                                {[
                                    { label: "Duration", value: course.duration },
                                    { label: "Format", value: "Live + Hands-On" },
                                    { label: "Level", value: course.level },
                                ].map((s, i) => (
                                    <div key={i} className="border border-slate-200 rounded-2xl px-5 py-3 bg-white shadow-sm min-w-[120px]">
                                        <p className="text-[9px] font-black tracking-widest uppercase text-[#794d00] mb-1">{s.label}</p>
                                        <p className="text-[13px] font-extrabold text-slate-900 uppercase tracking-tight leading-tight">{s.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: dark course card with category image */}
                        <div className="overview-reveal">
                            <div className="relative rounded-[24px] overflow-hidden bg-[#1e2a3b] shadow-2xl shadow-slate-900/40">

                                {/* ── Course image banner ── */}
                                <div className="relative w-full h-[240px] overflow-hidden">
                                    <img
                                        src={categoryImage}
                                        alt={course.category}
                                        className="w-full h-full object-cover object-center"
                                    />
                                    {/* Gradient fade into card body */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e2a3b] via-[#1e2a3b]/30 to-transparent" />
                                    {/* Category icons overlay */}
                                    <div className="absolute top-4 left-4 flex items-center gap-2">
                                    </div>
                                </div>

                                {/* ── Card body ── */}
                                <div className="relative z-10 p-8 space-y-6">
                                    {/* Glow blobs */}
                                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                        <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#794d00]/15 rounded-full blur-[60px]" />
                                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-800/15 rounded-full blur-[60px]" />
                                    </div>

                                    <div className="relative z-10 space-y-2">
                                        <p className="text-[10px] font-black tracking-widest uppercase text-[#c8915a]">{course.category}</p>
                                        <h3 className="text-[26px] md:text-[30px] font-extrabold text-white leading-[1.1] tracking-tight uppercase">
                                            {course.title}
                                        </h3>
                                    </div>

                                    <div className="relative z-10 grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                                        {[
                                            { label: "Duration", value: course.duration },
                                            { label: "Level", value: course.level },
                                            { label: "Seats Open", value: course.seats },
                                            { label: "Modules", value: `${course.curriculum.length} Topics` },
                                        ].map((s, i) => (
                                            <div key={i}>
                                                <p className="text-[9px] font-black tracking-widest uppercase text-white/40 mb-0.5">{s.label}</p>
                                                <p className="text-[13px] font-bold text-white">{s.value}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <a
                                        href="#enroll-form"
                                        className="relative z-10 inline-flex items-center gap-2 text-[11px] font-black tracking-widest uppercase text-[#c8915a] hover:text-white transition-colors group/link"
                                    >
                                        Enroll in This Program
                                        <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            {/* ══════════════════════════════════════════════════════
                ③ CURRICULUM & RELATED — Integrated Section
            ══════════════════════════════════════════════════════ */}
            <section id="curriculum" className="curriculum-section scroll-mt-24 py-24 bg-[#fffbf5]">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12">

                    {/* Heading */}
                    <div className="curriculum-reveal mb-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#794d00] tracking-tight uppercase leading-tight">
                            COURSE <span className="text-slate-900">CURRICULUM</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 items-start">

                        {/* Accordion List */}
                        <div className="curriculum-reveal">
                            {course.curriculum.map((item, i) => (
                                <CurriculumItem key={i} index={i} item={item} />
                            ))}
                        </div>

                        {/* Brochure Form — same hero design but solid dark bg */}
                        <div className="curriculum-reveal sticky top-28">
                            <div className="relative rounded-[2.5rem] overflow-hidden shadow-xl bg-[#0a0f12]">
                                <div className="relative z-10 w-full p-2">
                                    <div className="px-8 pt-8 pb-0">
                                        <h3 className="text-[17px] font-bold text-white tracking-wide">Download Brochure</h3>
                                    </div>
                                    <CourseEnquiryForm submitLabel="Submit & Download" defaultCourse={course.title} />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* ══════════════════════════════════════════════════════
                        ④ RELATED COURSES (Nested directly under curriculum)
                    ══════════════════════════════════════════════════════ */}
                    {relatedCourses.length > 0 && (
                        <div className="related-section mt-16 pt-16 border-t border-slate-200/60">

                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                                <div className="space-y-2">
                                    <span className="text-[#794d00] font-bold tracking-widest text-xs uppercase flex items-center gap-2">
                                        <BookOpen size={13} className="text-blue-500" />
                                        More from {course.category}
                                    </span>
                                    <h2 className="text-2xl md:text-3xl font-bold text-[#794d00] tracking-tight uppercase leading-tight">
                                        Related <span className="text-slate-900">Programs.</span>
                                    </h2>
                                </div>
                                <Link
                                    href="/courses"
                                    className="group inline-flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-[#794d00] hover:text-slate-900 transition-colors shrink-0"
                                >
                                    View All Courses
                                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                                {relatedCourses.map((rc) => (
                                    <div
                                        key={rc.id}
                                        className="group bg-white p-8 rounded-[20px] border border-slate-100 shadow-xl shadow-slate-200/50 transition-all hover:scale-[1.02] duration-300 flex flex-col gap-6"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="text-blue-500 group-hover:scale-110 transition-transform duration-300">
                                                <BookOpen size={28} />
                                            </div>
                                            <span className="px-3 py-1 bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                                {rc.level}
                                            </span>
                                        </div>
                                        <div className="space-y-2 flex-1">
                                            <h3 className="text-[18px] font-bold text-[#0f172a] leading-[1.25]">{rc.title}</h3>
                                            <p className="text-[13px] text-slate-500 font-medium leading-relaxed line-clamp-2">{rc.description}</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-[12px] text-slate-400 font-bold">
                                            <Clock size={14} className="text-blue-500" />
                                            {rc.duration}
                                        </div>
                                        <div className="pt-4 border-t border-slate-50">
                                            <Link
                                                href={`/courses/${rc.id}`}
                                                className="inline-flex items-center gap-3 text-[10px] font-black tracking-widest uppercase text-[#794d00] hover:text-slate-900 transition-colors group/link"
                                            >
                                                View Details
                                                <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </section>
            <WhyChooseAIMS />
            <ContactForm defaultCourse={course.title} />
            <FAQ />
        </div>
    )
}
