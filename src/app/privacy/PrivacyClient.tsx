"use client"

import Link from "next/link"
import { Shield, Eye, Lock, Database, Globe, UserCheck, RefreshCw, ArrowLeft, ArrowRight, Mail, AlertCircle, Phone } from "lucide-react"
import ContactForm from "@/components/ContactForm"

const sections = [
    {
        icon: <Eye size={20} />,
        title: "Information We Collect",
        items: [
            "When you register for a course or submit an enquiry, we collect personal details such as your full name, email address, phone number, and professional background.",
            "We automatically collect certain technical data when you visit our website, including IP address, browser type, pages visited, and time spent — used solely for improving site performance.",
            "We may collect information about your educational interests and career goals to personalise course recommendations.",
        ]
    },
    {
        icon: <Database size={20} />,
        title: "How We Use Your Information",
        items: [
            "To process your course enrolment and communicate key programme updates, schedules, and assessments.",
            "To send you relevant training news, new programme announcements, and career development tips. You may opt out at any time.",
            "To improve our website experience, analyse traffic patterns, and optimise content delivery.",
            "To comply with applicable UAE regulations and legal obligations, including ACTVET licensing requirements.",
        ]
    },
    {
        icon: <Lock size={20} />,
        title: "Data Security",
        items: [
            "All personal data is stored on secured servers with industry-standard encryption (SSL/TLS). Access is strictly restricted to authorised personnel only.",
            "We do not sell, trade, or rent your personal information to third parties under any circumstances.",
            "In the event of a data breach that poses a risk to your rights, we will notify you within 72 hours as required by applicable law.",
        ]
    },
    {
        icon: <Globe size={20} />,
        title: "Cookies",
        items: [
            "Our website uses cookies to maintain your session, remember preferences, and analyse how visitors use the site. Cookies do not contain personally identifiable information.",
            "You may disable cookies through your browser settings. Note that doing so may affect certain functions of the website.",
            "We use Google Analytics (anonymised mode) to understand aggregate site usage. No personal data is transferred to Google in this process.",
        ]
    },
    {
        icon: <UserCheck size={20} />,
        title: "Your Rights",
        items: [
            "You have the right to request access to, correction of, or deletion of any personal data AIMS Training Center holds about you.",
            "You may withdraw consent for marketing communications at any time by contacting us or clicking the unsubscribe link in any email.",
            "To exercise any of your data rights, please contact us at: contactus@edu-aims.com",
        ]
    },
    {
        icon: <RefreshCw size={20} />,
        title: "Updates to This Policy",
        items: [
            "AIMS Training Center reserves the right to update this Privacy Policy periodically to reflect service changes or regulatory updates.",
            "Material changes will be communicated via email to registered users. Continued use of our website after changes are posted constitutes acceptance.",
            "This policy was last reviewed and updated in April 2026.",
        ]
    },
]

export default function PrivacyClient() {
    return (
        <div className="min-h-screen bg-[#fffbf5] font-figtree">

            {/* ── Hero ── */}
            <section className="relative w-full min-h-[480px] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-[url('/contact_hero_bg.png')] bg-cover bg-center bg-no-repeat transform scale-105">
                    <div className="absolute inset-0 bg-[#020617]/70 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 pt-40 pb-24">
                    <div className="max-w-2xl space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-[11px] font-black uppercase tracking-[0.2em]">
                            <Shield size={11} /> Legal Document
                        </div>
                        <h1 className="font-extrabold text-white leading-[1.05] tracking-tight text-4xl sm:text-5xl xl:text-[56px] uppercase">
                            Privacy <span className="text-blue-400">Policy</span>
                        </h1>
                        <p className="text-slate-300 text-base sm:text-[17px] font-medium leading-relaxed max-w-xl">
                            How AIMS Training Center collects, uses, and protects your personal information. Your trust is our commitment.
                        </p>
                        <p className="text-white/40 text-sm font-medium">Effective: April 2026 &nbsp;·&nbsp; aimstrainingcenter.com</p>
                    </div>
                </div>
            </section>

            {/* ── Content ── */}
            <section className="py-24 bg-white border-b border-slate-100">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12">

                    {/* Intro notice */}
                    <div className="max-w-[860px] mx-auto mb-14">
                        <div className="flex gap-4 bg-blue-50 border border-blue-100 rounded-2xl p-6">
                            <AlertCircle size={20} className="text-blue-600 shrink-0 mt-0.5" />
                            <p className="text-slate-700 font-medium leading-relaxed text-[15px]">
                                AIMS Training Center (&quot;AIMS&quot;, &quot;we&quot;, &quot;our&quot;) operates under ACTVET licensing in Abu Dhabi, UAE. This Privacy Policy governs all data collected via our website, training programmes, and enrolment processes. By using our services, you agree to the practices described below.
                            </p>
                        </div>
                    </div>

                    {/* Two-column grid */}
                    <div className="max-w-[860px] mx-auto space-y-6">
                        {sections.map((section, i) => (
                            <div key={i} className="bg-[#fffbf5] border border-slate-100 rounded-[20px] p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0">
                                        {section.icon}
                                    </div>
                                    <h2 className="text-[18px] font-bold text-slate-900 tracking-tight">{section.title}</h2>
                                </div>
                                <ul className="space-y-3">
                                    {section.items.map((item, j) => (
                                        <li key={j} className="flex gap-3 text-[14px] text-slate-600 font-medium leading-relaxed">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-[7px]" />
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
                                <Mail size={20} className="text-blue-400" />
                                <h3 className="text-white font-bold text-lg">Contact Our Data Protection Officer</h3>
                            </div>
                            <p className="text-slate-400 font-medium text-[14px] leading-relaxed">
                                If you have any questions or concerns about this Privacy Policy, please reach out:
                            </p>
                            <div className="flex flex-wrap gap-x-8 gap-y-2 text-[13px] text-slate-300 font-medium pt-1">
                                <a href="mailto:contactus@edu-aims.com" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                                    <Mail size={13} /> contactus@edu-aims.com
                                </a>
                                <a href="tel:+971026724334" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"><Phone size={13} /> +971 26724334</a>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="max-w-[860px] mx-auto mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <Link href="/" className="inline-flex items-center gap-2 text-[#794d00] font-black text-[11px] uppercase tracking-widest hover:text-slate-900 transition-colors group">
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>
                        <Link href="/terms" className="inline-flex items-center gap-2 text-slate-500 font-black text-[11px] uppercase tracking-widest hover:text-[#794d00] transition-colors">
                            Terms of Service <ArrowRight size={13} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── CTA Form ── */}
            <ContactForm />
        </div>
    )
}
