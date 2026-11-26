"use client"

import { useCourse, useCourses } from "@/hooks/useCourse"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { coursesData } from "@/data/courses"
import _ from "lodash"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import WhyChooseAIMS from "@/components/WhyChooseAIMS"
import ContactForm from "@/components/ContactForm"
import FAQ from "@/components/FAQ"

type FormValues = {
    name: string;
    contact: string;
    email: string;
    course: string;
};

/* ─────────────────────────────────────────
   Glassmorphic Enquiry Form (original design, zero icons)
───────────────────────────────────────── */
function CourseEnquiryForm({
    submitLabel = "Submit Now",
    defaultCourse,
}: {
    submitLabel?: string
    defaultCourse?: string
}) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormValues>({
        defaultValues: {
            name: "",
            contact: "",
            email: "",
            course: defaultCourse || "",
        },
    })

    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState(defaultCourse || "")
    const dropdownRef = useRef<HTMLDivElement>(null)

    const watchedCourse = watch("course")

    const filteredCourses = _.filter(
        Object.values(coursesData),
        (course) =>
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const groupedCourses = _.mapValues(
        _.groupBy(filteredCourses, "category"),
        (courses) => _.uniq(_.map(courses, "title"))
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
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                setIsSubmitted(true)
                reset()
                setSearchTerm(defaultCourse || "")
            } else {
                alert("Failed to send message. Please try again later.")
            }
        } catch (error) {
            console.error("Submission error:", error)
            alert("An error occurred. Please check your connection.")
        }
    }

    if (isSubmitted) {
        return (
            <div className="w-full bg-white/10 backdrop-blur-xl px-5 py-10 sm:px-10 sm:py-16 rounded-[20px] sm:rounded-[2.5rem] border border-white/20 shadow-2xl flex flex-col items-center text-center space-y-5 sm:space-y-6">
                <span className="px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-extrabold uppercase tracking-widest">
                    Confirmed
                </span>
                <div className="space-y-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">Message Sent!</h2>
                    <p className="text-white/60 text-xs sm:text-sm">
                        Thank you for reaching out. We&apos;ll get back to you soon.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="text-blue-400 font-bold hover:text-blue-300 transition-colors uppercase tracking-widest text-xs cursor-pointer"
                >
                    Send Another Message
                </button>
            </div>
        )
    }

    const inputCls = (field: keyof FormValues) =>
        `w-full px-3.5 py-2.5 sm:px-5 sm:py-4 rounded-lg bg-white/[0.03] border ${
            errors[field] ? "border-red-500/50" : "border-white/10"
        } focus:border-blue-500/40 focus:bg-white/[0.05] outline-none transition-all text-white text-sm sm:text-base font-normal`

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full bg-white/10 backdrop-blur-xl px-4 py-6 sm:px-12 sm:py-14 rounded-[20px] sm:rounded-[2.5rem] border border-white/20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] space-y-5 sm:space-y-8 relative"
        >
            <div className="space-y-4 sm:space-y-6 relative z-50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-6">
                    <div className="space-y-1.5 sm:space-y-2">
                        <label className="text-xs sm:text-[14px] font-medium text-white ml-1">Full Name</label>
                        <input
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            className={inputCls("name")}
                        />
                        {errors.name && (
                            <p className="text-[10px] text-red-400 ml-1">{errors.name.message}</p>
                        )}
                    </div>
                    <div className="space-y-1.5 sm:space-y-2">
                        <label className="text-xs sm:text-[14px] font-medium text-white ml-1">
                            Contact Number
                        </label>
                        <input
                            type="text"
                            {...register("contact", {
                                required: "Contact number is required",
                                pattern: {
                                    value: /^[0-9+\s-]{7,15}$/,
                                    message: "Invalid contact number",
                                },
                            })}
                            className={inputCls("contact")}
                        />
                        {errors.contact && (
                            <p className="text-[10px] text-red-400 ml-1">{errors.contact.message}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-6">
                    <div className="space-y-1.5 sm:space-y-2">
                        <label className="text-xs sm:text-[14px] font-medium text-white ml-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email format",
                                },
                            })}
                            className={inputCls("email")}
                        />
                        {errors.email && (
                            <p className="text-[10px] text-red-400 ml-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-1.5 sm:space-y-2 relative" ref={dropdownRef}>
                        <label className="text-xs sm:text-[14px] font-medium text-white ml-1">
                            Course Interested
                        </label>
                        <input
                            type="text"
                            placeholder="Type to search..."
                            {...register("course", { required: "Please select a course" })}
                            readOnly={!!defaultCourse}
                            onFocus={() => !defaultCourse && setIsDropdownOpen(true)}
                            onChange={(e) => {
                                const val = e.target.value
                                setSearchTerm(val)
                                setValue("course", val, { shouldValidate: true })
                                setIsDropdownOpen(true)
                            }}
                            className={`${inputCls("course")} ${
                                defaultCourse ? "opacity-80 cursor-not-allowed" : "cursor-text"
                            }`}
                        />

                        {isDropdownOpen && !defaultCourse && (
                            <div
                                data-lenis-prevent
                                className="absolute top-[calc(100%+8px)] left-0 w-full z-[100] bg-[#0f172a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl max-h-[280px] overflow-y-auto overscroll-contain p-2"
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
                                                            setValue("course", title, {
                                                                shouldValidate: true,
                                                            })
                                                            setSearchTerm(title)
                                                            setIsDropdownOpen(false)
                                                        }}
                                                        className={`w-full text-left px-4 py-2.5 rounded-xl text-[13px] transition-all font-medium ${
                                                            watchedCourse === title
                                                                ? "bg-white/15 text-white"
                                                                : "text-white/80 hover:text-white hover:bg-white/10"
                                                        }`}
                                                    >
                                                        {title}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-4 py-8 text-center space-y-2">
                                        <p className="text-[13px] text-white/40 italic">
                                            No matching courses found.
                                        </p>
                                        <p className="text-[11px] text-[#c8915a] font-bold uppercase tracking-widest">
                                            You can keep typing your own...
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                        {errors.course && (
                            <p className="text-[10px] text-red-400 ml-1 mt-1">
                                {errors.course.message}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2 text-center relative z-10">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white py-3.5 sm:py-5 rounded-xl font-bold text-sm sm:text-base transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Sending...
                        </>
                    ) : (
                        submitLabel
                    )}
                </button>
                <p className="text-xs sm:text-[13px] font-normal text-white opacity-60 leading-relaxed">
                    From zero to job-ready. Apply in 60 seconds.
                </p>
            </div>
        </form>
    )
}

function CurriculumItem({ index, item }: { index: number; item: string }) {
    return (
        <div className="flex items-start sm:items-center gap-3 sm:gap-4 px-3.5 py-3 sm:px-6 sm:py-5 border border-slate-200/80 rounded-xl sm:rounded-2xl bg-white shadow-[0_4px_18px_rgba(15,23,42,0.03)] hover:border-[#794d00]/30 transition-all duration-300">
            <span className="text-[11px] sm:text-xs font-black tracking-[0.16em] text-[#794d00] bg-[#fffbf5] border border-[#794d00]/15 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg shrink-0">
                {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-xs sm:text-[15px] font-bold text-slate-800 leading-snug flex-1">
                {item}
            </span>
        </div>
    )
}

const SIGNATURE_COURSE_IDS = [
    "finance-accounting",
    "office-administration",
    "engineering-cad",
    "graphic-design-animation",
    "network-it",
]

export default function CourseDetail() {
    const { id } = useParams()
    const { course, loading } = useCourse(id as string)
    const { courses: allCourses } = useCourses()
    const containerRef = useRef<HTMLDivElement>(null)

    let relatedCourses = _.take(
        _.reject(
            allCourses,
            (c) =>
                c.id === course?.id ||
                SIGNATURE_COURSE_IDS.includes(c.id) ||
                c.category !== course?.category
        ),
        3
    )

    if (relatedCourses.length === 0 && course && allCourses.length > 0) {
        relatedCourses = _.take(
            _.reject(allCourses, (c) => c.id === course.id || SIGNATURE_COURSE_IDS.includes(c.id)),
            3
        )
    }

    const CATEGORY_IMAGES: Record<string, string> = {
        "Finance & Accounting": "/images/course-finance.png",
        "Office Administration": "/images/course-office.png",
        "Engineering and CAD": "/images/course-engineering.png",
        "Graphic Design and Animation": "/images/course-design.png",
        "Project Management": "/images/course-pm.png",
        "IT & Networking": "/images/course-it.png",
        "Soft Skills": "/images/brown-hero-student.png",
        "Language Courses": "/images/hero-light.png",
        Language: "/images/hero-light.png",
    }
    const categoryImage = course
        ? CATEGORY_IMAGES[course.category] ?? "/images/excellence.png"
        : "/images/excellence.png"

    useGSAP(
        () => {
            if (!loading && course && allCourses.length > 0) {
                if (typeof window !== "undefined") {
                    gsap.registerPlugin(ScrollTrigger)
                }
                gsap.from(".hero-reveal", {
                    y: 26,
                    opacity: 0,
                    stagger: 0.08,
                    duration: 0.7,
                    ease: "power3.out",
                    clearProps: "all",
                })
            }
        },
        { dependencies: [loading, course, allCourses.length], scope: containerRef }
    )

    if (loading) {
        return (
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
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-[#fffbf5] font-figtree flex items-center justify-center px-6">
                <div className="max-w-lg text-center space-y-6 py-32">
                    <span className="inline-block px-3.5 py-1 rounded-full bg-white border border-[#794d00]/15 text-[11px] font-extrabold uppercase tracking-wider text-[#794d00]">
                        404 · Course Not Found
                    </span>
                    <div className="space-y-2">
                        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
                            Course Not Found
                        </h1>
                        <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed">
                            The program you&apos;re looking for might have been moved or doesn&apos;t exist.
                        </p>
                    </div>
                    <Link
                        href="/courses"
                        className="inline-flex items-center justify-center rounded-full bg-[#794d00] hover:bg-[#0f172a] text-white px-7 py-3.5 font-bold text-xs uppercase tracking-widest transition-all"
                    >
                        Back to All Courses
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div ref={containerRef} className="course-detail-page min-h-screen bg-white font-figtree">
            {/* ── ① HERO — Original dark color & glassmorphic form design (Zero Icons) ── */}
            <section className="relative w-full min-h-0 lg:min-h-screen flex items-center overflow-hidden bg-[#020617]">
                {/* Background image — identical setup to original header */}
                <div className="absolute inset-0 z-0 bg-[url('/contact_hero_bg.png')] bg-cover bg-center bg-no-repeat transform scale-105">
                    <div className="absolute inset-0 bg-[#020617]/60 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 pt-24 sm:pt-36 pb-12 sm:pb-20">
                    {/* Redesigned Breadcrumb Routes */}
                    <nav
                        aria-label="Breadcrumb"
                        className="hero-reveal flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-slate-400 mb-5 sm:mb-9"
                    >
                        <Link href="/" className="hover:text-white transition-colors">
                            Home
                        </Link>
                        <span className="text-slate-600">/</span>
                        <Link href="/courses" className="hover:text-white transition-colors">
                            Courses
                        </Link>
                        <span className="text-slate-600">/</span>
                        <Link
                            href={`/courses?category=${encodeURIComponent(course.category)}`}
                            className="hover:text-white transition-colors"
                        >
                            {course.category}
                        </Link>
                        <span className="text-slate-600">/</span>
                        <span className="text-[#c8915a] truncate max-w-[180px] sm:max-w-xs">
                            {course.title}
                        </span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-7 sm:gap-10 lg:gap-20 items-start">
                        {/* Left: Redesigned Hero Texts & Routes */}
                        <div className="space-y-4 sm:space-y-7">
                            {/* Category & Accreditation Row */}
                            <div className="hero-reveal flex flex-wrap items-center gap-2">
                                <Link
                                    href={`/courses?category=${encodeURIComponent(course.category)}`}
                                    className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 bg-[#794d00]/30 hover:bg-[#794d00]/45 border border-[#794d00]/40 rounded-full text-[#c8915a] text-[10px] sm:text-[11px] font-black uppercase tracking-[0.16em] sm:tracking-[0.2em] transition-colors"
                                >
                                    {course.category}
                                </Link>
                                <span className="inline-flex items-center px-3 sm:px-3.5 py-1 sm:py-1.5 bg-white/[0.06] border border-white/10 rounded-full text-slate-300 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em]">
                                    ACTVET Approved · Abu Dhabi
                                </span>
                            </div>

                            {/* Title */}
                            <div className="hero-reveal space-y-2.5 sm:space-y-3">
                                <h1 className="font-black text-white leading-[1.06] tracking-tight text-2xl sm:text-5xl xl:text-[54px] uppercase">
                                    {course.title}
                                </h1>
                                <p className="text-slate-300 text-xs sm:text-base lg:text-[17px] font-medium leading-relaxed max-w-xl">
                                    {course.description}
                                </p>
                            </div>

                            {/* Compact Key Course Facts */}
                            <div className="hero-reveal grid grid-cols-3 gap-2 sm:gap-3 max-w-lg pt-0.5 sm:pt-1">
                                {[
                                    { label: "Duration", value: course.duration },
                                    { label: "Level", value: course.level },
                                    { label: "Batches", value: course.seats || "Available" },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        className="rounded-xl sm:rounded-2xl bg-white/[0.05] border border-white/10 px-2.5 py-2.5 sm:px-3.5 sm:py-3 backdrop-blur-sm"
                                    >
                                        <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[#c8915a] mb-0.5">
                                            {item.label}
                                        </p>
                                        <p className="text-[11px] sm:text-sm font-bold text-white leading-snug">
                                            {item.value}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Quick Section & Navigation Routes */}
                            <div className="hero-reveal flex flex-wrap items-center gap-2.5 sm:gap-3 pt-0.5 sm:pt-1">
                                <a
                                    href="#curriculum"
                                    className="inline-flex items-center justify-center bg-white text-[#0f172a] px-5 sm:px-8 py-3 sm:py-4 rounded-full font-black text-[11px] sm:text-[13px] tracking-widest uppercase transition-all hover:bg-[#fffbf5] hover:scale-[1.02] active:scale-[0.98] shadow-xl"
                                >
                                    Explore Syllabus
                                </a>
                                <a
                                    href="#overview"
                                    className="inline-flex items-center justify-center border border-white/25 text-white px-5 sm:px-7 py-3 sm:py-4 rounded-full font-bold text-[11px] sm:text-[13px] tracking-widest uppercase transition-all hover:border-white/50 hover:bg-white/5"
                                >
                                    Course Overview
                                </a>
                            </div>
                        </div>

                        {/* Right: glassmorphic enroll form */}
                        <div id="enroll-form" className="hero-reveal scroll-mt-28">
                            <CourseEnquiryForm submitLabel="Submit Now" defaultCourse={course.title} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── ② OVERVIEW ── */}
            <section id="overview" className="scroll-mt-24 bg-white border-b border-slate-100 py-10 sm:py-20">
                <div className="container-custom mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-14 items-center">
                        <div className="lg:col-span-6 space-y-4 sm:space-y-6">
                            <span className="text-[#794d00] font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase block">
                                Program Overview
                            </span>
                            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-slate-950 tracking-tight uppercase leading-tight">
                                About This <span className="text-[#794d00]">Course.</span>
                            </h2>
                            <div className="space-y-3 sm:space-y-4">
                                <p className="text-xs sm:text-base text-slate-600 font-medium leading-relaxed">
                                    {course.overview ?? course.description}
                                </p>
                                {!course.overview && (
                                    <p className="text-xs sm:text-base text-slate-500 font-medium leading-relaxed">
                                        Our learning model is hands-on and project-driven. Each module ends with practical applications that go directly into your professional portfolio, preparing you for employers across Abu Dhabi and the UAE.
                                    </p>
                                )}
                            </div>

                            {/* Stat pills */}
                            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1 sm:pt-2">
                                {[
                                    { label: "Duration", value: course.duration },
                                    { label: "Format", value: "Live + Hands-On" },
                                    { label: "Level", value: course.level },
                                ].map((s) => (
                                    <div
                                        key={s.label}
                                        className="border border-slate-200/80 rounded-xl sm:rounded-2xl px-2.5 py-2.5 sm:px-5 sm:py-3.5 bg-[#fffbf5]"
                                    >
                                        <p className="text-[8px] sm:text-[9px] font-black tracking-widest uppercase text-[#794d00] mb-0.5 sm:mb-1">
                                            {s.label}
                                        </p>
                                        <p className="text-[11px] sm:text-[13px] font-extrabold text-slate-900 uppercase tracking-tight leading-tight">
                                            {s.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Visual Card */}
                        <div className="lg:col-span-6">
                            <div className="relative rounded-[20px] sm:rounded-[28px] overflow-hidden bg-[#0F172A] shadow-xl border border-slate-800/50">
                                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
                                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
                                <div className="relative z-10 w-full h-[175px] sm:h-[260px] overflow-hidden">
                                    <Image
                                        src={categoryImage}
                                        alt={course.title}
                                        fill
                                        quality={85}
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        className="object-cover object-center"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/35 to-transparent" />
                                </div>

                                <div className="relative z-10 p-4 sm:p-8 space-y-1 sm:space-y-1.5">
                                    <p className="text-[9px] sm:text-[10px] font-black tracking-[0.2em] uppercase text-amber-300">
                                        {course.category}
                                    </p>
                                    <h3 className="text-lg sm:text-2xl font-extrabold text-white leading-tight uppercase">
                                        {course.title}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── ③ COURSE HIGHLIGHTS (No Icons) ── */}
            {course.courseHighlights && course.courseHighlights.length > 0 && (
                <section className="bg-[#fffbf5] border-b border-slate-100 py-9 sm:py-16">
                    <div className="container-custom mx-auto px-4 sm:px-6 space-y-4 sm:space-y-6">
                        <div className="space-y-1 sm:space-y-1.5">
                            <span className="text-[#794d00] font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase block">
                                Key Advantages
                            </span>
                            <h2 className="text-xl sm:text-3xl font-bold text-slate-950 tracking-tight uppercase">
                                Course <span className="text-[#794d00]">Highlights.</span>
                            </h2>
                        </div>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            {course.courseHighlights.map((hl, i) => (
                                <span
                                    key={i}
                                    className="px-3 sm:px-5 py-1.5 sm:py-3 bg-white border border-slate-200/80 rounded-full text-[11px] sm:text-sm font-bold text-slate-800 shadow-sm hover:border-[#794d00]/40 hover:text-[#794d00] transition-colors"
                                >
                                    {hl}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── ④ PREREQUISITE & WHO THIS COURSE IS FOR (No Icons) ── */}
            {(course.prerequisite || (course.courseIsFor && course.courseIsFor.length > 0)) && (
                <section className="bg-white py-10 sm:py-20 border-b border-slate-100">
                    <div className="container-custom mx-auto px-4 sm:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                            {course.prerequisite && (
                                <div className="rounded-[18px] sm:rounded-[28px] border border-[#794d00]/15 bg-[#fffbf5] p-4 sm:p-8 space-y-3 sm:space-y-4">
                                    <span className="inline-block px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-[#794d00] text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider">
                                        Prerequisite
                                    </span>
                                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 tracking-tight">
                                        Before You Enroll
                                    </h3>
                                    <p className="text-xs sm:text-[15px] text-slate-600 font-medium leading-relaxed">
                                        {course.prerequisite}
                                    </p>
                                </div>
                            )}

                            {course.courseIsFor && course.courseIsFor.length > 0 && (
                                <div className="rounded-[18px] sm:rounded-[28px] border border-slate-200/80 bg-[#f5f5f7] p-4 sm:p-8 space-y-3 sm:space-y-4">
                                    <span className="inline-block px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-[#0f172a] text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider">
                                        Who Should Attend
                                    </span>
                                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 tracking-tight">
                                        This Course Is For
                                    </h3>
                                    <ul className="space-y-2.5 sm:space-y-3">
                                        {course.courseIsFor.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2.5 sm:gap-3">
                                                <span className="text-[10px] sm:text-[11px] font-black text-[#794d00] mt-0.5 shrink-0">
                                                    {String(i + 1).padStart(2, "0")}
                                                </span>
                                                <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* ── ⑤ CURRICULUM & RELATED PROGRAMS (Original dark Brochure Form + Catalog-Matched Related Cards) ── */}
            <section id="curriculum" className="scroll-mt-24 py-10 sm:py-20 bg-[#fffbf5]">
                <div className="container-custom mx-auto px-4 sm:px-6">
                    <div className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-10">
                        <span className="text-[#794d00] font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase block">
                            Syllabus &amp; Modules
                        </span>
                        <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#794d00] tracking-tight uppercase leading-tight">
                            What You Will <span className="text-slate-900">Learn.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-6 sm:gap-8 lg:gap-10 items-start">
                        <div className="space-y-2.5 sm:space-y-3">
                            {(course.whatYouWillLearn ?? course.curriculum).map((item, i) => (
                                <CurriculumItem key={i} index={i} item={item} />
                            ))}
                        </div>

                        {/* Brochure Form — Original solid dark #0a0f12 glassmorphic form design */}
                        <div className="lg:sticky lg:top-28">
                            <div className="relative rounded-[20px] sm:rounded-[2.5rem] overflow-hidden shadow-xl bg-[#0a0f12]">
                                <div className="relative z-10 w-full p-1.5 sm:p-2">
                                    <div className="px-4 sm:px-8 pt-4 sm:pt-8 pb-0">
                                        <h3 className="text-base sm:text-[17px] font-bold text-white tracking-wide">
                                            Download Brochure
                                        </h3>
                                    </div>
                                    <CourseEnquiryForm
                                        submitLabel="Submit & Download"
                                        defaultCourse={course.title}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Programs (Matches /courses catalog cards, zero icons) */}
                    {relatedCourses.length > 0 && (
                        <div className="mt-12 sm:mt-20 pt-9 sm:pt-16 border-t border-slate-200/70">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-4 pb-3 sm:pb-4 mb-6 sm:mb-8 border-b border-slate-200/70">
                                <div className="space-y-0.5 sm:space-y-1">
                                    <span className="text-[#794d00] font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase block">
                                        More from {course.category}
                                    </span>
                                    <h2 className="text-xl sm:text-3xl font-bold text-[#794d00] tracking-tight uppercase leading-tight">
                                        Related <span className="text-slate-950">Programs.</span>
                                    </h2>
                                </div>
                                <Link
                                    href="/courses"
                                    className="inline-flex items-center px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white border border-slate-200/80 text-[10px] font-black tracking-widest uppercase text-[#794d00] hover:border-[#794d00] hover:text-slate-950 transition-colors shrink-0"
                                >
                                    View All Courses
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                                {relatedCourses.map((rc, idx) => (
                                    <article
                                        key={rc.id}
                                        className="group relative bg-white rounded-[18px] sm:rounded-[24px] border border-slate-200/80 p-4 sm:p-7 flex flex-col justify-between gap-3.5 sm:gap-5 shadow-[0_6px_24px_rgba(15,23,42,0.03)] hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)] hover:border-[#794d00]/35 transition-all duration-300"
                                    >
                                        <Link
                                            href={`/courses/${rc.id}`}
                                            className="absolute inset-0 z-20 cursor-pointer"
                                            aria-label={`Explore ${rc.title}`}
                                        />

                                        {/* Top Meta Row */}
                                        <div className="flex items-center justify-between gap-3 pointer-events-none">
                                            <span className="text-[11px] sm:text-xs font-extrabold tracking-[0.16em] text-slate-400">
                                                {String(idx + 1).padStart(2, "0")}
                                            </span>
                                            <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#f5f5f7] text-[9px] sm:text-[10px] font-extrabold text-slate-700 uppercase tracking-wider group-hover:bg-[#fffbf5] group-hover:text-[#794d00] transition-colors">
                                                {rc.level}
                                            </span>
                                        </div>

                                        {/* Body */}
                                        <div className="space-y-1.5 sm:space-y-2.5 flex-1 pointer-events-none">
                                            <h3 className="text-base sm:text-xl font-extrabold text-slate-950 leading-snug tracking-tight group-hover:text-[#794d00] transition-colors">
                                                {rc.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2">
                                                {rc.description}
                                            </p>
                                        </div>

                                        {/* Footer Row */}
                                        <div className="pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between gap-3 pointer-events-none">
                                            <span className="text-[11px] font-bold text-slate-500">
                                                {rc.duration}
                                            </span>
                                            <span className="text-[10px] font-black tracking-widest uppercase text-[#794d00] group-hover:text-slate-950 transition-colors">
                                                View Details
                                            </span>
                                        </div>
                                    </article>
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
