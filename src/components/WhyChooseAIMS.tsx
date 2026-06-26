"use client"

import { GraduationCap, Briefcase, Users, Layout, BookOpen, Network, Rocket } from "lucide-react"

const features = [
    {
        icon: <Users className="text-blue-500" size={32} />,
        title: "Learn from Industry-Active Mentors",
        description: "Guidance from professionals who are active in their fields, not just classroom theory."
    },
    {
        icon: <Layout className="text-blue-500" size={32} />,
        title: "Experience Project-First Learning",
        description: "Work on real case studies and practical builds that mirror industry challenges."
    },
    {
        icon: <GraduationCap className="text-blue-500" size={32} />,
        title: "Hybrid Learning Model",
        description: "Flexible learning options including live interactive sessions and physical classroom training."
    },
    {
        icon: <BookOpen className="text-blue-500" size={32} />,
        title: "Cutting-Edge, Evolving Curriculum",
        description: "Our syllabus is updated regularly to match the latest tools, workflows, and market demands."
    },
    {
        icon: <Network className="text-blue-500" size={32} />,
        title: "Lifetime Access to Resources & Community",
        description: "Continue learning with access to updated content, alumni events, and mentor support forever."
    },
    {
        icon: <Briefcase className="text-blue-500" size={32} />,
        title: "Strong Placement Network & Partnerships",
        description: "We connect you with a network of enterprises and startups actively hiring talent."
    },
    {
        icon: <Rocket className="text-blue-500" size={32} />,
        title: "Skill-Based Excellence",
        description: "Focused training on high-demand professional skills to ensure your career-ready success."
    }
]

export default function WhyChooseAIMS() {
    return (
        <section className="bg-[#fffbf5] pt-10 pb-20 md:pt-12 md:pb-24 font-figtree overflow-hidden">
            <div className="container-custom mx-auto px-6">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#794d00] tracking-tight uppercase max-w-xl font-figtree">
                        Why Choose AIMS ?
                    </h2>
                    <p className="text-slate-600 text-lg max-w-xl font-figtree leading-relaxed">
                        Our programs combine hands-on projects, mentorship from industry experts, and the latest tools to prepare you for real-world success.
                    </p>
                </div>

                {/* ── Top Row: 4 Features ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mb-4 sm:mb-5">
                    {features.slice(0, 4).map((feature, i) => (
                        <div 
                            key={i} 
                            className="group bg-white p-5 rounded-2xl border border-slate-100 shadow-md shadow-slate-200/40 hover:shadow-lg hover:shadow-slate-200/60 transition-all duration-300 flex flex-col gap-4"
                        >
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-base sm:text-[17px] font-bold text-slate-900 leading-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Bottom Row: 3 Features Centered ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-[1000px] mx-auto">
                    {features.slice(4).map((feature, i) => (
                        <div 
                            key={i} 
                            className="group bg-white p-5 rounded-2xl border border-slate-100 shadow-md shadow-slate-200/40 hover:shadow-lg hover:shadow-slate-200/60 transition-all duration-300 flex flex-col gap-4"
                        >
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-base sm:text-[17px] font-bold text-slate-900 leading-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
