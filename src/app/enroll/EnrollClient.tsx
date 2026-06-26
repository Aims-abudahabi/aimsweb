"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import Image from "next/image"
import Link from "next/link"
import { Send, MapPin, Phone, Mail, ArrowRight, AlertCircle, BookOpen, GraduationCap, Wind } from "lucide-react"
import FAQ from "@/components/FAQ"
import GoogleMap from "@/components/GoogleMap"
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

            {/* Hero Section with Background Image */}
            <section ref={heroRef} className="relative min-h-screen pt-48 pb-20 overflow-hidden flex items-center">
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

                <div className="container-custom relative z-10 mx-auto px-6 max-w-[1300px]">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">

                        {/* Left Side: Enrollment Information */}
                        <div className="flex flex-col gap-14">
                            <div className="flex flex-col gap-12">
                                <div className="reveal-item space-y-6">
                                    <span className="inline-block px-4 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold rounded-full text-[10px] uppercase tracking-wide">
                                        Admission Open 2026
                                    </span>
                                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]">
                                        Start Your <span className="text-blue-500">Journey.</span>
                                    </h1>
                                    <p className="text-lg text-white/60 max-w-lg leading-relaxed">
                                        Join over 10,000+ graduates who have transformed their careers with AIMS Training Center. Secure your seat in our next batch today.
                                    </p>
                                </div>

                                <div className="reveal-item flex flex-col gap-8">
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            <GraduationCap size={24} />
                                        </div>
                                        <div>
                                            <p className="text-white font-bold">Expert-Led Training</p>
                                            <p className="text-white/40 text-sm">Learn from industry veterans.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            <BookOpen size={24} />
                                        </div>
                                        <div>
                                            <p className="text-white font-bold">Global Certifications</p>
                                            <p className="text-white/40 text-sm">Standardized UAE & International awards.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Enrollment Form */}
                        <div className="relative w-full flex justify-center lg:justify-end z-20">
                            {isSubmitted ? (
                                <div className="w-full max-w-[550px] bg-slate-900/80 backdrop-blur-3xl px-10 py-20 rounded-[2.5rem] border border-blue-500/30 shadow-[0_50px_100px_-20px_rgba(30,58,138,0.5)] flex flex-col items-center text-center space-y-8 animate-in fade-in zoom-in duration-500">
                                    <div className="w-24 h-24 bg-blue-600/20 rounded-full flex items-center justify-center border border-blue-500/30">
                                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/40">
                                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h2 className="text-3xl font-bold text-white tracking-tight">Application Received!</h2>
                                        <p className="text-white/60 leading-relaxed font-figtree">
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
                                <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="reveal-item w-full max-w-[550px] bg-slate-900/60 backdrop-blur-3xl px-10 py-12 sm:px-14 sm:py-16 rounded-[2.5rem] border border-white/20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] space-y-10 overflow-hidden relative group">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                                    <div className="space-y-6 relative z-10 font-figtree">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[14px] font-medium text-white ml-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="John Doe"
                                                    {...register("name", { required: "Name is required" })}
                                                    className={`w-full px-5 py-4 rounded-lg bg-white/[0.03] border ${errors.name ? 'border-red-500/50' : 'border-white/10'} focus:border-blue-500/40 focus:bg-white/[0.05] outline-none transition-all text-white placeholder:text-white/10`}
                                                />
                                                {errors.name && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.name.message}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[14px] font-medium text-white ml-1">Contact Number</label>
                                                <input
                                                    type="text"
                                                    placeholder="+971 -- --- ----"
                                                    {...register("contact", {
                                                        required: "Contact number is required",
                                                        pattern: { value: /^[0-9+\s-]{7,15}$/, message: "Invalid contact number" }
                                                    })}
                                                    className={`w-full px-5 py-4 rounded-lg bg-white/[0.03] border ${errors.contact ? 'border-red-500/50' : 'border-white/10'} focus:border-blue-500/40 focus:bg-white/[0.05] outline-none transition-all text-white placeholder:text-white/10`}
                                                />
                                                {errors.contact && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.contact.message}</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[14px] font-medium text-white ml-1">Email Address</label>
                                            <input
                                                type="email"
                                                placeholder="john@example.com"
                                                {...register("email", {
                                                    required: "Email is required",
                                                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" }
                                                })}
                                                className={`w-full px-5 py-4 rounded-lg bg-white/[0.03] border ${errors.email ? 'border-red-500/50' : 'border-white/10'} focus:border-blue-500/40 focus:bg-white/[0.05] outline-none transition-all text-white placeholder:text-white/10`}
                                            />
                                            {errors.email && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.email.message}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[14px] font-medium text-white ml-1">Select Program</label>
                                            <select
                                                {...register("course", { required: "Please select a course" })}
                                                className={`w-full px-5 py-4 rounded-lg bg-slate-900 border ${errors.course ? 'border-red-500/50' : 'border-white/10'} focus:border-blue-500/40 outline-none transition-all text-white/90 appearance-none`}
                                            >
                                                <option value="" disabled className="bg-slate-900">Choose a course...</option>
                                                {courseList.map((course, i) => (
                                                    <option key={i} value={course} className="bg-slate-900">{course}</option>
                                                ))}
                                            </select>
                                            {errors.course && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.course.message}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[14px] font-medium text-white ml-1">Current Location</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Abu Dhabi, UAE"
                                                {...register("location", { required: "Location is required" })}
                                                className={`w-full px-5 py-4 rounded-lg bg-white/[0.03] border ${errors.location ? 'border-red-500/50' : 'border-white/10'} focus:border-blue-500/40 focus:bg-white/[0.05] outline-none transition-all text-white placeholder:text-white/10`}
                                            />
                                            {errors.location && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.location.message}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-8 pt-4 text-center relative z-10">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-6 rounded-xl font-bold text-base transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-blue-900/40 flex items-center justify-center gap-3"
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
                                        <p className="text-[13px] font-medium text-white/40 leading-relaxed font-figtree">
                                            By clicking submit, you agree to our terms of admission and professional training guidelines.
                                        </p>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Why AIMS / Right Place Section ── */}
            <section className="bg-[#fffbf5] py-24 md:py-32 font-figtree border-t border-slate-100 overflow-hidden">
                <div className="container-custom mx-auto px-6">

                    {/* Header Label: Consistent with Home Page */}
                    <div className="fc-header mb-16 max-w-4xl">
                        <div className="reveal-item space-y-6">
                            <span className="text-[#794d00] font-bold tracking-widest text-[10px] md:text-xs uppercase flex items-center gap-2">
                                <Wind size={14} className="text-blue-500" /> Educational Excellence
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#794d00] tracking-tight leading-[1.1]">
                                You Are In The <span className="text-slate-900 underline decoration-blue-500/30 decoration-8 underline-offset-8">Right Place</span>
                            </h2>
                            <p className="text-lg md:text-2xl text-slate-600 leading-relaxed font-medium max-w-4xl pt-4">
                                At Aims Training Center, our aim is to create a group of industry-experts who, in turn, create high-quality classes and course materials that will help our students to boom their knowledge and thereby their career too.
                            </p>
                        </div>
                    </div>

                    {/* Standard Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
                        <div className="reveal-item bg-white p-10 rounded-[20px] border border-slate-100 shadow-xl shadow-slate-200/50 space-y-6 transition-all hover:scale-[1.01] duration-300">
                            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                                <GraduationCap size={28} />
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-xl font-bold text-[#794d00] uppercase tracking-tight">Passion For Teaching</h4>
                                <p className="text-slate-500 font-medium leading-[1.8] text-sm">
                                    You must have the passion to teach what you are in expertise. Domain expertise certificate is a must.
                                </p>
                            </div>
                        </div>

                        <div className="reveal-item bg-white p-10 rounded-[20px] border border-slate-100 shadow-xl shadow-slate-200/50 space-y-6 transition-all hover:scale-[1.01] duration-300">
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                <BookOpen size={28} />
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-xl font-bold text-[#794d00] uppercase tracking-tight">Love To Share Content</h4>
                                <p className="text-slate-500 font-medium leading-[1.8] text-sm">
                                    You must have the mind to share updated content materials to our students after each classes.
                                </p>
                            </div>
                        </div>

                        <div className="reveal-item p-10 rounded-[20px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center gap-6 group hover:border-blue-500/30 transition-all">
                            <div className="space-y-2">
                                <p className="text-[#794d00] font-black text-xl uppercase leading-tight">Your Dream.<br />Our Mission.</p>
                                <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">Start Today</p>
                            </div>
                            <Link
                                href="/courses"
                                className="inline-flex items-center gap-4 bg-amber-500 hover:bg-slate-900 text-white px-6 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-amber-200"
                            >
                                Explore Programs <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>

                    {/* Bottom Row: High-Impact Mission & Quote */}
                    <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start border-t border-slate-100 pt-32">
                        <div className="reveal-item space-y-6">
                            <span className="text-blue-500 font-bold tracking-widest text-[10px] uppercase block">Core Values & Vision</span>
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-400 leading-[1.1] tracking-tighter uppercase">
                                We Believe In <br />
                                <span className="text-slate-900">Hard Work And <br /> Dedication</span>
                            </h3>
                        </div>

                        <div className="reveal-item bg-white p-12 md:p-16 rounded-[20px] shadow-2xl shadow-slate-200/60 relative overflow-hidden border border-slate-50">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>

                            {/* Quote Content */}
                            <div className="relative z-10 space-y-12">
                                <div className="text-blue-500 font-serif text-6xl leading-none opacity-20 italic select-none">“</div>
                                <p className="text-xl md:text-3xl text-slate-800 font-bold leading-[1.4] italic tracking-tight">
                                    Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing or learning to do.
                                </p>
                                <div className="flex items-center justify-between pt-10 border-t border-slate-100">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 bg-[#794d00] rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-xl shadow-amber-900/20">
                                            Q
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#794d00] block">The AIMS Standard</span>
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Our Unwavering Philosophy</span>
                                        </div>
                                    </div>
                                    <Wind size={40} className="text-slate-100" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Help Section */}
            <section className="bg-[#020617]">
                <FAQ />
            </section>
        </main>
    )
}
