"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import Image from "next/image"
import { Send, MapPin, Phone, Mail, ArrowRight, AlertCircle } from "lucide-react"
import FAQ from "@/components/FAQ"
import GoogleMap from "@/components/GoogleMap"
import { useForm } from "react-hook-form"
import { coursesData } from "@/data/courses"
import _ from "lodash"

type FormValues = {
    name: string;
    contact: string;
    email: string;
    course: string;
};

export default function ContactClient() {
    const heroRef = useRef<HTMLElement>(null)
    const formRef = useRef<HTMLFormElement>(null)

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
        defaultValues: { name: "", contact: "", email: "", course: "" }
    })

    const [isSubmitted, setIsSubmitted] = useState(false)

    // Dynamic courses grouping logic
    const groupedCourses = _.mapValues(
        _.groupBy(Object.values(coursesData), 'category'),
        (courses) => _.uniq(_.map(courses, 'title'))
    )

    const priorityOrder = [
        "Engineering and CAD",
        "Office Administration",
        "Graphic Design and Animation",
        "Finance & Accounting",
        "Project Management",
        "IT & Networking",
        "Language Courses"
    ];

    const sortedCategories = _.sortBy(Object.entries(groupedCourses), ([category]) => {
        const idx = priorityOrder.indexOf(category);
        return idx !== -1 ? idx : priorityOrder.length;
    });

    useGSAP(() => {
        // GSAP Reveal for all items including the form
        gsap.from(".reveal-item", {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out",
            clearProps: "all" // Ensure properties are cleared after animation
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
                alert("Failed to send message. Please try again later.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("An error occurred. Please check your connection.");
        }
    }

    return (
        <main className="contact-page min-h-screen bg-[#020617] font-figtree">

            {/* Hero Section with Background Image */}
            <section ref={heroRef} className="relative min-h-screen pt-48 pb-20 overflow-hidden flex items-center">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0 text-white font-figtree">
                    <Image
                        src="/contact_hero_bg.png"
                        alt="Contact AIMS"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/95 via-[#020617]/80 to-transparent"></div>
                </div>

                <div className="container-custom relative z-10 mx-auto px-6 max-w-[1300px] font-figtree">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">

                        {/* Left Side: Contact Information */}
                        <div className="flex flex-col gap-14">
                            <div className="flex flex-col gap-12">
                                {/* Call Us */}
                                <div className="reveal-item space-y-4">
                                    <span className="inline-block px-4 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold rounded-full text-[10px] uppercase tracking-wider">
                                        Call Us:
                                    </span>
                                    <p className="text-lg sm:text-xl font-normal text-white/90 leading-relaxed font-figtree tracking-tight">+971 26724334</p>
                                </div>

                                {/* Send Message */}
                                <div className="reveal-item space-y-4">
                                    <span className="inline-block px-4 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold rounded-full text-[10px] uppercase tracking-wider">
                                        Send Us a Message:
                                    </span>
                                    <p className="text-lg sm:text-xl font-normal text-white/90 leading-relaxed font-figtree break-all">contactus@edu-aims.com</p>
                                </div>

                                {/* Visit Us */}
                                <div className="reveal-item space-y-4">
                                    <span className="inline-block px-4 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold rounded-full text-[10px] uppercase tracking-wider">
                                        Visit Us:
                                    </span>
                                    <p className="text-lg sm:text-xl font-normal text-white/90 leading-relaxed max-w-md font-figtree">
                                        Lulu Express Building, Benkaram Tower - Mezzanine 02 - Hamdan Bin Mohammed St, Abu Dhabi - UAE
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Contact Form or Success Message */}
                        <div className="relative w-full flex justify-center lg:justify-end z-20">
                            {isSubmitted ? (
                                // Success Message Card
                                <div className="w-full max-w-[550px] bg-slate-900/80 backdrop-blur-3xl px-10 py-20 rounded-[2.5rem] border border-blue-500/30 shadow-[0_50px_100px_-20px_rgba(30,58,138,0.5)] flex flex-col items-center text-center space-y-8 animate-in fade-in zoom-in duration-500">
                                    <div className="w-24 h-24 bg-blue-600/20 rounded-full flex items-center justify-center border border-blue-500/30">
                                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/40">
                                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h2 className="text-3xl font-bold text-white tracking-tight">Message Sent!</h2>
                                        <p className="text-white/60 font-figtree leading-relaxed">
                                            Thank you for reaching out. Our team will get back to you within 24 hours.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-blue-400 font-bold hover:text-blue-300 transition-colors uppercase tracking-widest text-xs"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                // Original Form Card
                                <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="reveal-item w-full max-w-[550px] bg-slate-900/60 backdrop-blur-3xl px-10 py-12 sm:px-14 sm:py-16 rounded-[2.5rem] border border-white/20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] space-y-12 overflow-hidden relative group">
                                    {/* Subtle Inner Glow / Hover Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                                    <div className="space-y-8 relative z-10 font-figtree transition-all">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 font-figtree">
                                            <div className="space-y-3">
                                                <label className="text-[14px] font-medium text-white ml-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    {...register("name", { required: "Name is required" })}
                                                    className={`w-full px-5 py-4 rounded-lg bg-white/[0.03] border ${errors.name ? 'border-red-500/50' : 'border-white/10'} focus:border-blue-500/40 focus:bg-white/[0.05] outline-none transition-all text-white font-normal`}
                                                />
                                                {errors.name && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.name.message}</p>}
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[14px] font-medium text-white ml-1">Contact Number</label>
                                                <input
                                                    type="text"
                                                    {...register("contact", {
                                                        required: "Contact number is required",
                                                        pattern: { value: /^[0-9+\s-]{7,15}$/, message: "Invalid contact number" }
                                                    })}
                                                    className={`w-full px-5 py-4 rounded-lg bg-white/[0.03] border ${errors.contact ? 'border-red-500/50' : 'border-white/10'} focus:border-blue-500/40 focus:bg-white/[0.05] outline-none transition-all text-white font-normal`}
                                                />
                                                {errors.contact && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.contact.message}</p>}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 font-figtree">
                                            <div className="space-y-3">
                                                <label className="text-[14px] font-medium text-white ml-1 font-figtree">Email Address</label>
                                                <input
                                                    type="email"
                                                    {...register("email", {
                                                        required: "Email is required",
                                                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" }
                                                    })}
                                                    className={`w-full px-5 py-4 rounded-lg bg-white/[0.03] border ${errors.email ? 'border-red-500/50' : 'border-white/10'} focus:border-blue-500/40 focus:bg-white/[0.05] outline-none transition-all text-white font-normal font-figtree`}
                                                />
                                                {errors.email && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.email.message}</p>}
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[14px] font-medium text-white ml-1 font-figtree">Course Interested</label>
                                                <select
                                                    {...register("course", { required: "Please select a course" })}
                                                    className={`w-full px-5 py-4 rounded-lg bg-white/[0.03] border ${errors.course ? 'border-red-500/50' : 'border-white/10'} focus:border-blue-500/40 focus:bg-white/[0.05] outline-none transition-all text-white font-normal font-figtree appearance-none cursor-pointer`}
                                                >
                                                    <option value="" className="bg-[#020617] text-white">Select a Course</option>
                                                    {sortedCategories.map(([category, titles]) => (
                                                        <optgroup key={category} label={category} className="bg-[#020617] text-blue-400 font-bold capitalize">
                                                            {titles.map((title) => (
                                                                <option key={title} value={title} className="text-white bg-[#020617]">
                                                                    {title}
                                                                </option>
                                                            ))}
                                                        </optgroup>
                                                    ))}
                                                </select>
                                                {errors.course && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.course.message}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-10 pt-4 text-center relative z-10">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-6 rounded-xl font-bold text-base transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-blue-900/40 flex items-center justify-center gap-3"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    Sending...
                                                </>
                                            ) : "Submit Now"}
                                        </button>
                                        <p className="text-[14px] font-normal text-white leading-relaxed font-figtree opacity-60">
                                            From zero to job-ready. Apply in 60 seconds.
                                        </p>
                                    </div>
                                </form>
                            )}
                        </div>

                    </div>
                </div>
            </section>

            {/* Live Google Map Integration - Full Width */}
            <section className="w-full bg-[#020617] font-figtree">
                <div className="w-full overflow-hidden shadow-2xl">
                    <GoogleMap address="Lulu Express Building, Benkaram Tower - Mezzanine 02 - Hamdan Bin Mohammed St, Abu Dhabi - UAE" />
                </div>
            </section>

            {/* Frequently Asked Questions Section */}
            <section className="bg-[#020617] font-figtree">
                <FAQ />
            </section>
        </main>
    )
}
