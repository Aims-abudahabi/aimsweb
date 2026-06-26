"use client"

import Link from "next/link"
import { FileText, BookOpen, CreditCard, ShieldAlert, Scale, AlertCircle, RefreshCw, UserX, Gavel, ArrowLeft, ArrowRight, Mail, Phone } from "lucide-react"
import ContactForm from "@/components/ContactForm"

const sections = [
    {
        icon: <BookOpen size={20} />,
        title: "Acceptance of Terms",
        items: [
            "By accessing our website at aimstrainingcenter.com, enrolling in any course, or engaging with our services, you confirm that you have read, understood, and agree to be bound by these Terms of Service.",
            "If you do not agree to any part of these terms, you must not use our website or services.",
            "AIMS Training Center reserves the right to update these terms at any time. Continued use of our services following any changes will be deemed acceptance of the revised terms.",
        ]
    },
    {
        icon: <FileText size={20} />,
        title: "Course Enrolment & Eligibility",
        items: [
            "Enrolment in any AIMS programme is subject to meeting the stated prerequisites, completion of the registration process, and payment of the applicable fees.",
            "AIMS Training Center reserves the right to decline or cancel an enrolment at its sole discretion, particularly in cases of misrepresentation of eligibility.",
            "Students must be at least 18 years of age to independently enrol. Those under 18 require written consent from a legal guardian.",
            "Course schedules, batch timings, and instructors are subject to periodic changes. Reasonable advance notice will be provided in such cases.",
        ]
    },
    {
        icon: <CreditCard size={20} />,
        title: "Fees, Payment & Refund Policy",
        items: [
            "All course fees are quoted in UAE Dirhams (AED) and are payable upon registration unless a specific instalment plan has been agreed upon in writing.",
            "Refund requests made more than 7 days before a course commences will receive a full refund, minus a 10% administrative fee.",
            "No refunds will be issued for cancellations made within 7 days of a course starting, or after the course has begun.",
            "In the rare event that AIMS cancels a course, enrolled students will receive a full refund or the option to transfer to an equivalent programme.",
        ]
    },
    {
        icon: <ShieldAlert size={20} />,
        title: "Intellectual Property",
        items: [
            "All course materials, lecture notes, presentations, assessments, and website content are the exclusive intellectual property of AIMS Training Center.",
            "Students may not reproduce, distribute, share, record, or resell any course materials without prior written consent from AIMS.",
            "AIMS logos, trademarks, and branding may not be used by any third party without explicit written authorisation.",
        ]
    },
    {
        icon: <UserX size={20} />,
        title: "Code of Conduct",
        items: [
            "Students are expected to maintain a professional, respectful atmosphere in all in-person and online interactions with instructors, staff, and fellow students.",
            "AIMS Training Center has a zero-tolerance policy for harassment, discrimination, plagiarism, or cheating. Violation may result in immediate expulsion without refund.",
            "Students are responsible for the integrity of all submitted assessments. Academic dishonesty will be reported to the relevant certification bodies.",
        ]
    },
    {
        icon: <Scale size={20} />,
        title: "Limitation of Liability",
        items: [
            "AIMS Training Center makes no guarantee of specific employment outcomes or salary increases following course completion.",
            "To the maximum extent permitted by UAE law, AIMS shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.",
            "Our liability to any individual student shall not exceed the total fees paid by that student for the relevant course.",
        ]
    },
    {
        icon: <Gavel size={20} />,
        title: "Governing Law",
        items: [
            "These Terms of Service are governed exclusively by the laws of the Emirate of Abu Dhabi and the United Arab Emirates.",
            "Any dispute arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Abu Dhabi, UAE.",
            "AIMS Training Center operates in full compliance with ACTVET (Abu Dhabi Centre for Technical and Vocational Education and Training) regulations.",
        ]
    },
    {
        icon: <RefreshCw size={20} />,
        title: "Amendments",
        items: [
            "AIMS Training Center may revise these Terms of Service at any time by posting an updated version on this page.",
            "Registered students will be notified of material changes via email.",
            "These Terms were last revised in April 2026.",
        ]
    },
]

export default function TermsClient() {
    return (
        <div className="min-h-screen bg-[#fffbf5] font-figtree">

            {/* ── Hero ── */}
            <section className="relative w-full min-h-[480px] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-[url('/contact_hero_bg.png')] bg-cover bg-center bg-no-repeat transform scale-105">
                    <div className="absolute inset-0 bg-[#020617]/70 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 pt-40 pb-24">
                    <div className="max-w-2xl space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#794d00]/30 border border-[#794d00]/40 rounded-full text-[#c8915a] text-[11px] font-black uppercase tracking-[0.2em]">
                            <FileText size={11} /> Legal Document
                        </div>
                        <h1 className="font-extrabold text-white leading-[1.05] tracking-tight text-4xl sm:text-5xl xl:text-[56px] uppercase">
                            Terms of <span className="text-[#c8915a]">Service</span>
                        </h1>
                        <p className="text-slate-300 text-base sm:text-[17px] font-medium leading-relaxed max-w-xl">
                            Please read these terms carefully before enrolling in any AIMS programme or using our services. They govern your relationship with us.
                        </p>
                        <p className="text-white/40 text-sm font-medium">Effective: April 2026 &nbsp;·&nbsp; aimstrainingcenter.com &amp; all AIMS programmes</p>
                    </div>
                </div>
            </section>

            {/* ── Content ── */}
            <section className="py-24 bg-white border-b border-slate-100">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12">

                    {/* Intro notice */}
                    <div className="max-w-[860px] mx-auto mb-14">
                        <div className="flex gap-4 bg-amber-50 border border-amber-100 rounded-2xl p-6">
                            <AlertCircle size={20} className="text-[#794d00] shrink-0 mt-0.5" />
                            <p className="text-slate-700 font-medium leading-relaxed text-[15px]">
                                These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you and AIMS Training Center (&quot;AIMS&quot;, &quot;we&quot;, &quot;our&quot;). By using our website or enrolling in a course, you acknowledge that you have read and agree to these Terms in their entirety.
                            </p>
                        </div>
                    </div>

                    {/* Sections */}
                    <div className="max-w-[860px] mx-auto space-y-6">
                        {sections.map((section, i) => (
                            <div key={i} className="bg-[#fffbf5] border border-slate-100 rounded-[20px] p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-[#794d00]/10 text-[#794d00] flex items-center justify-center shrink-0">
                                        {section.icon}
                                    </div>
                                    <h2 className="text-[18px] font-bold text-slate-900 tracking-tight">{section.title}</h2>
                                </div>
                                <ul className="space-y-3">
                                    {section.items.map((item, j) => (
                                        <li key={j} className="flex gap-3 text-[14px] text-slate-600 font-medium leading-relaxed">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#794d00] shrink-0 mt-[7px]" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Contact block */}
                    <div className="max-w-[860px] mx-auto mt-10">
                        <div className="bg-[#0f172a] rounded-[20px] p-8 space-y-4">
                            <div className="flex items-center gap-3">
                                <Gavel size={20} className="text-[#c8915a]" />
                                <h3 className="text-white font-bold text-lg">Questions About These Terms?</h3>
                            </div>
                            <p className="text-slate-400 font-medium text-[14px] leading-relaxed">
                                If you have any questions or concerns about these Terms of Service, please don&apos;t hesitate to reach out:
                            </p>
                            <div className="flex flex-wrap gap-x-8 gap-y-2 text-[13px] text-slate-300 font-medium pt-1">
                                <a href="mailto:contactus@edu-aims.com" className="flex items-center gap-2 text-[#c8915a] hover:text-amber-300 transition-colors">
                                    <Mail size={13} /> contactus@edu-aims.com
                                </a>
                                <a href="tel:+971026724334" className="flex items-center gap-2 text-[#c8915a] hover:text-amber-300 transition-colors"><Phone size={13} /> +971 26724334</a>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="max-w-[860px] mx-auto mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <Link href="/" className="inline-flex items-center gap-2 text-[#794d00] font-black text-[11px] uppercase tracking-widest hover:text-slate-900 transition-colors group">
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>
                        <Link href="/privacy" className="inline-flex items-center gap-2 text-slate-500 font-black text-[11px] uppercase tracking-widest hover:text-[#794d00] transition-colors">
                            Privacy Policy <ArrowRight size={13} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── CTA Form ── */}
            <ContactForm />
        </div>
    )
}
