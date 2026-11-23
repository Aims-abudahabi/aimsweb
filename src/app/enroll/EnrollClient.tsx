"use client"

import { useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, AlertCircle, BookOpen, GraduationCap } from "lucide-react"
import FAQ from "@/components/FAQ"
import { coursesData } from "@/data/courses"
import _ from "lodash"
import { useForm } from "react-hook-form"

type FormValues = {
    name: string;
    contact: string;
    email: string;
    course: string;
    location: string;
};

export default function EnrollClient() {
    const heroRef = useRef<HTMLElement>(null)
    const formRef = useRef<HTMLFormElement>(null)

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
        defaultValues: { name: "", contact: "", email: "", course: "", location: "" }
    })

    const [isSubmitted, setIsSubmitted] = useState(false)

    // Get list of courses for the dropdown
    const courseList = _.sortBy(_.map(coursesData, 'title'))

    useGSAP(() => {
        gsap.from(".reveal-item", {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out",
            clearProps: "all"
        })
    }, { scope: heroRef })

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
            } else {
                alert("Failed to submit enrollment. Please try again later.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("An error occurred. Please check your connection.");
        }
    }

    return (
        <main className="enroll-page min-h-screen bg-[#020617] font-figtree">

            {/* Hero Section with Background Image (Header Section kept the same) */}
            <section ref={heroRef} className="relative min-h-0 lg:min-h-screen pt-24 sm:pt-40 lg:pt-48 pb-12 sm:pb-16 lg:pb-20 overflow-hidden flex items-center">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/contact_hero_bg.png"
                        alt="Enroll at AIMS"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/95 via-[#020617]/80 to-transparent"></div>
                </div>

                <div className="container-custom relative z-10 mx-auto px-4 sm:px-6 max-w-[1300px]">
                    <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-20 items-center">

                        {/* Left Side: Enrollment Information */}
                        <div className="flex flex-col gap-6 sm:gap-10 lg:gap-14">
                            <div className="flex flex-col gap-5 sm:gap-8 lg:gap-12">
                                <div className="reveal-item space-y-3 sm:space-y-6">
                                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.08] sm:leading-[1.1]">
                                        Start Your <span className="text-blue-500">Journey.</span>
                                    </h1>
                                    <p className="text-sm sm:text-lg text-white/60 max-w-lg leading-relaxed">
                                        Join over 10,000+ graduates who have transformed their careers with AIMS Training Center. Secure your seat in our next batch today.
                                    </p>
                                </div>

                                <div className="reveal-item flex flex-col gap-3.5 sm:gap-8">
                                    <div className="flex items-center gap-4 group">
                                        <div>
                                            <p className="text-white font-bold text-sm sm:text-base">Expert-Led Training</p>
                                            <p className="text-white/40 text-xs sm:text-sm">Learn from industry veterans.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 group">
                                        <div>
                                            <p className="text-white font-bold text-sm sm:text-base">Global Certifications</p>
                                            <p className="text-white/40 text-xs sm:text-sm">Standardized UAE &amp; International awards.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Enrollment Form */}
                        <div className="relative w-full flex justify-center lg:justify-end z-20">
                            {isSubmitted ? (
                                <div className="w-full max-w-[550px] bg-slate-900/80 backdrop-blur-3xl px-5 py-10 sm:px-10 sm:py-20 rounded-[20px] sm:rounded-[2.5rem] border border-blue-500/30 shadow-[0_50px_100px_-20px_rgba(30,58,138,0.5)] flex flex-col items-center text-center space-y-5 sm:space-y-8 animate-in fade-in zoom-in duration-500">
                                    <div className="w-16 h-16 sm:w-24 sm:h-24 bg-blue-600/20 rounded-full flex items-center justify-center border border-blue-500/30">
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/40">
                                            <svg className="w-6 h-6 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="space-y-2 sm:space-y-4">
                                        <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight">Application Received!</h2>
                                        <p className="text-xs sm:text-base text-white/60 leading-relaxed font-figtree">
                                            Your enrollment request has been submitted successfully. Our admissions counselor will contact you shortly to complete the process.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-blue-400 font-bold hover:text-blue-300 transition-colors uppercase tracking-widest text-xs"
                                    >
                                        Submit Another Application
                                    </button>
                                </div>
                            ) : (
                                <form
                                    ref={formRef}
                                    onSubmit={handleSubmit(onSubmit)}
                                    toolname="enroll_in_course"
                                    tooldescription="Submit an enrollment application for a course at AIMS Training Center Abu Dhabi."
                                    className="reveal-item w-full max-w-[550px] bg-slate-900/60 backdrop-blur-3xl px-4 py-6 sm:px-12 sm:py-14 rounded-[20px] sm:rounded-[2.5rem] border border-white/20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] space-y-5 sm:space-y-10 overflow-hidden relative group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                                    <div className="space-y-3.5 sm:space-y-6 relative z-10 font-figtree">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-6">
                                            <div className="space-y-1.5 sm:space-y-2">
                                                <label className="text-xs sm:text-[14px] font-medium text-white ml-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="John Doe"
                                                    {...register("name", { required: "Name is required" })}
                                                    className={`w-full px-3.5 py-2.5 sm:px-5 sm:py-4 rounded-lg bg-white/[0.03] border ${errors.name ? 'border-red-500/50' : 'border-white/10'} focus:border-blue-500/40 focus:bg-white/[0.05] outline-none transition-all text-white text-sm sm:text-base placeholder:text-white/15`}
                                                />
                                                {errors.name && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.name.message}</p>}
                                            </div>
                                            <div className="space-y-1.5 sm:space-y-2">
                                                <label className="text-xs sm:text-[14px] font-medium text-white ml-1">Contact Number</label>
                                                <input
                                                    type="text"
                                                    placeholder="+971 -- --- ----"
                                                    {...register("contact", {
                                                        required: "Contact number is required",
                                                        pattern: { value: /^[0-9+\s-]{7,15}$/, message: "Invalid contact number" }
                                                    })}
                                                    className={`w-full px-3.5 py-2.5 sm:px-5 sm:py-4 rounded-lg bg-white/[0.03] border ${errors.contact ? 'border-red-500/50' : 'border-white/10'} focus:border-blue-500/40 focus:bg-white/[0.05] outline-none transition-all text-white text-sm sm:text-base placeholder:text-white/15`}
                                                />
                                                {errors.contact && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.contact.message}</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-1.5 sm:space-y-2">
                                            <label className="text-xs sm:text-[14px] font-medium text-white ml-1">Email Address</label>
                                            <input
                                                type="email"
                                                placeholder="john@example.com"
                                                {...register("email", {
                                                    required: "Email is required",
                                                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" }
                                                })}
                                                className={`w-full px-3.5 py-2.5 sm:px-5 sm:py-4 rounded-lg bg-white/[0.03] border ${errors.email ? 'border-red-500/50' : 'border-white/10'} focus:border-blue-500/40 focus:bg-white/[0.05] outline-none transition-all text-white text-sm sm:text-base placeholder:text-white/15`}
                                            />
                                            {errors.email && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.email.message}</p>}
                                        </div>

                                        <div className="space-y-1.5 sm:space-y-2">
                                            <label className="text-xs sm:text-[14px] font-medium text-white ml-1">Select Program</label>
                                            <select
                                                {...register("course", { required: "Please select a course" })}
                                                className={`w-full px-3.5 py-2.5 sm:px-5 sm:py-4 rounded-lg bg-slate-900 border ${errors.course ? 'border-red-500/50' : 'border-white/10'} focus:border-blue-500/40 outline-none transition-all text-white/90 text-sm sm:text-base appearance-none`}
                                            >
                                                <option value="" disabled className="bg-slate-900">Choose a course...</option>
                                                {courseList.map((course, i) => (
                                                    <option key={i} value={course} className="bg-slate-900">{course}</option>
                                                ))}
                                            </select>
                                            {errors.course && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.course.message}</p>}
                                        </div>

                                        <div className="space-y-1.5 sm:space-y-2">
                                            <label className="text-xs sm:text-[14px] font-medium text-white ml-1">Current Location</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Abu Dhabi, UAE"
                                                {...register("location", { required: "Location is required" })}
                                                className={`w-full px-3.5 py-2.5 sm:px-5 sm:py-4 rounded-lg bg-white/[0.03] border ${errors.location ? 'border-red-500/50' : 'border-white/10'} focus:border-blue-500/40 focus:bg-white/[0.05] outline-none transition-all text-white text-sm sm:text-base placeholder:text-white/15`}
                                            />
                                            {errors.location && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.location.message}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-4 sm:space-y-8 pt-1 sm:pt-4 text-center relative z-10">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-3.5 sm:py-6 rounded-xl font-bold text-sm sm:text-base transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-blue-900/40 flex items-center justify-center gap-3"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    Complete Enrollment
                                                    <ArrowRight size={20} />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Redesigned Body: Why AIMS / Right Place Section (No Icons) ── */}
            <section className="relative bg-white py-10 sm:py-20 md:py-28 font-figtree border-t border-slate-100 overflow-hidden">
                <div className="absolute top-0 right-[-10%] w-[520px] h-[520px] bg-[#794d00]/[0.03] rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-[-10%] w-[460px] h-[460px] bg-blue-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

                <div className="container-custom mx-auto px-4 sm:px-6 relative z-10">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-3 sm:gap-8 mb-6 sm:mb-14">
                        <div className="space-y-1.5 sm:space-y-3">
                            <span className="text-[#794d00] font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase block">
                                Educational Excellence
                            </span>
                            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#794d00] tracking-tight uppercase leading-[1.08]">
                                You Are In The <span className="text-slate-900">Right Place.</span>
                            </h2>
                        </div>
                        <p className="text-slate-600 text-xs sm:text-base md:text-lg max-w-xl leading-relaxed">
                            At AIMS Training Center, we bring together industry experts who craft high-impact classes and practical course materials that accelerate student knowledge and careers across Abu Dhabi.
                        </p>
                    </div>

                    {/* 12-Column Editorial Bento Cards (Zero Icons) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3.5 sm:gap-5 mb-10 sm:mb-20">
                        {/* Card 01 — Passion For Teaching */}
                        <div className="lg:col-span-5 rounded-[18px] sm:rounded-[28px] bg-[#fffbf5] border border-[#794d00]/15 p-4 sm:p-8 lg:p-9 flex flex-col justify-between gap-4 sm:gap-6 hover:border-[#794d00]/35 hover:shadow-[0_14px_34px_rgba(121,77,0,0.08)] transition-all duration-300">
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-[11px] sm:text-xs font-extrabold tracking-[0.18em] uppercase text-[#794d00]/70">
                                    01
                                </span>
                                <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#794d00] text-white text-[9px] sm:text-[11px] font-bold tracking-wider uppercase">
                                    Domain Experts
                                </span>
                            </div>

                            <div className="space-y-2 sm:space-y-3">
                                <h3 className="text-lg sm:text-2xl font-extrabold text-slate-950 tracking-tight">
                                    Passion For Teaching
                                </h3>
                                <p className="text-slate-600 text-xs sm:text-[15px] leading-relaxed">
                                    We partner with trainers who are genuinely passionate about mentoring in their domain, backed by verified industry expertise and recognized domain certifications.
                                </p>
                                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-0.5 sm:pt-1">
                                    {["Certified Expertise", "Mentorship Focus", "Hands-On Delivery"].map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white border border-[#794d00]/15 text-[10px] sm:text-[11px] font-bold text-[#794d00]"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Card 02 — Love To Share Content */}
                        <div className="lg:col-span-4 rounded-[18px] sm:rounded-[28px] bg-white border border-slate-200/80 p-4 sm:p-8 lg:p-9 flex flex-col justify-between gap-4 sm:gap-6 shadow-[0_6px_24px_rgba(15,23,42,0.04)] hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)] hover:border-[#794d00]/30 transition-all duration-300">
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-[11px] sm:text-xs font-extrabold tracking-[0.18em] uppercase text-slate-400">
                                    02
                                </span>
                                <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-slate-100 text-slate-700 text-[9px] sm:text-[11px] font-bold tracking-wider uppercase">
                                    Updated Materials
                                </span>
                            </div>

                            <div className="space-y-2 sm:space-y-3">
                                <h3 className="text-lg sm:text-2xl font-extrabold text-slate-950 tracking-tight">
                                    Love To Share Content
                                </h3>
                                <p className="text-slate-500 text-xs sm:text-[15px] leading-relaxed">
                                    Great training continues beyond the classroom—sharing up-to-date study guides, real templates, and project resources with learners after every session.
                                </p>
                                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-0.5 sm:pt-1">
                                    {["Practical Workbooks", "Live Case Studies"].map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#f8f9fb] border border-slate-200/70 text-[10px] sm:text-[11px] font-bold text-slate-700"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Card 03 — Your Dream. Our Mission. */}
                        <div className="md:col-span-2 lg:col-span-3 relative overflow-hidden rounded-[18px] sm:rounded-[28px] bg-[#1e2a3b] text-white p-4 sm:p-8 flex flex-col justify-between gap-4 sm:gap-6 shadow-[0_14px_40px_rgba(15,23,42,0.14)]">
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:26px_26px] pointer-events-none" />
                            <div className="relative z-10 flex items-center justify-between">
                                <span className="text-[11px] sm:text-xs font-extrabold tracking-[0.18em] uppercase text-slate-400">
                                    03
                                </span>
                                <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/10 border border-white/15 text-[9px] sm:text-[10px] font-bold tracking-wider uppercase text-amber-200">
                                    Start Today
                                </span>
                            </div>

                            <div className="relative z-10 space-y-4 sm:space-y-5">
                                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight leading-tight text-white">
                                    Your Dream.
                                    <br />
                                    <span className="text-amber-300">Our Mission.</span>
                                </h3>
                                <Link
                                    href="/courses"
                                    className="inline-flex items-center justify-center w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white text-slate-950 hover:bg-[#fffbf5] font-extrabold text-[11px] uppercase tracking-[0.15em] transition-all active:scale-95"
                                >
                                    Explore Programs
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* ── Core Values & Vision Quote Showcase (Zero Icons) ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center pt-8 sm:pt-14 border-t border-slate-100">
                        <div className="lg:col-span-5 space-y-2 sm:space-y-4">
                            <span className="text-[#794d00] font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase block">
                                Core Values &amp; Vision
                            </span>
                            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-400 leading-[1.08] tracking-tight uppercase">
                                We Believe In
                                <br />
                                <span className="text-slate-950">
                                    Hard Work And Dedication.
                                </span>
                            </h3>
                        </div>

                        <div className="lg:col-span-7 rounded-[18px] sm:rounded-[28px] bg-[#f5f5f7] border border-slate-200/80 p-5 sm:p-10 lg:p-12 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#794d00] via-amber-600 to-[#1e2a3b]" />

                            <div className="space-y-4 sm:space-y-8">
                                <p className="text-base sm:text-2xl lg:text-[26px] text-slate-900 font-bold leading-[1.45] tracking-tight">
                                    &ldquo;Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing or learning to do.&rdquo;
                                </p>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-slate-200/80">
                                    <div className="space-y-0.5">
                                        <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] text-[#794d00] block">
                                            The AIMS Standard
                                        </span>
                                        <span className="text-[11px] sm:text-xs font-semibold text-slate-500">
                                            Our Unwavering Philosophy · Abu Dhabi Since 2010
                                        </span>
                                    </div>
                                    <Link
                                        href="/about"
                                        className="group inline-flex items-center gap-2.5 sm:gap-3 text-[10px] font-black tracking-widest uppercase text-[#794d00] hover:text-slate-900 transition-colors"
                                    >
                                        Learn More About AIMS
                                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Help Section */}
            <section className="bg-[#fffbf5]">
                <FAQ />
            </section>
        </main>
    )
}
