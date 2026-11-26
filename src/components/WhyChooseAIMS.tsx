"use client"

const features = [
    {
        tag: "Active Mentors",
        title: "Learn from Industry-Active Mentors",
        description:
            "Guidance from professionals actively working in UAE industries, focusing on real practice rather than classroom theory.",
        featured: true,
    },
    {
        tag: "Hands-On",
        title: "Experience Project-First Learning",
        description:
            "Work on live case studies and practical builds that mirror real workplace challenges and go straight into your portfolio.",
    },
    {
        tag: "Live + Campus",
        title: "Hybrid Learning Model",
        description:
            "Flexible delivery combining live interactive sessions and in-person classroom training on Hamdan Street, Abu Dhabi.",
    },
    {
        tag: "Updated Syllabus",
        title: "Cutting-Edge, Evolving Curriculum",
        description:
            "Our syllabus is updated regularly to match the latest software tools, workflows, and UAE employer expectations.",
    },
    {
        tag: "Alumni Access",
        title: "Lifetime Access to Resources & Community",
        description:
            "Continue growing with access to updated course materials, alumni networks, and ongoing mentor guidance.",
    },
    {
        tag: "Career Support",
        title: "Strong Placement Network & Partnerships",
        description:
            "Connect with our network of enterprises, engineering firms, and growing organizations hiring skilled talent across the UAE.",
    },
    {
        tag: "Job-Ready",
        title: "Skill-Based Excellence",
        description:
            "Focused, outcome-driven training on high-demand professional skills engineered for measurable career advancement.",
    },
]

export default function WhyChooseAIMS() {
    return (
        <section className="relative bg-white py-10 sm:py-20 md:py-24 font-figtree border-t border-slate-100 overflow-hidden">
            {/* Subtle Ambient Accents */}
            <div className="absolute top-0 right-[-10%] w-[460px] h-[460px] bg-[#794d00]/[0.03] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-[-10%] w-[420px] h-[420px] bg-blue-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

            <div className="container-custom mx-auto px-4 sm:px-6 relative z-10">
                {/* ── Header ── */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-3 sm:gap-8 mb-6 sm:mb-14">
                    <div className="space-y-1 sm:space-y-2.5">
                        <span className="text-[#794d00] font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase block">
                            The AIMS Advantage
                        </span>
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#794d00] tracking-tight uppercase leading-[1.08]">
                            Why Choose <span className="text-slate-950">AIMS?</span>
                        </h2>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-base md:text-lg max-w-xl leading-relaxed">
                        Our programs combine hands-on projects, mentorship from industry experts, and the latest tools to prepare you for real-world success in Abu Dhabi.
                    </p>
                </div>

                {/* ── Top Row: 3 Spotlight Cards ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5 mb-3 sm:mb-5">
                    {features.slice(0, 3).map((feature, i) => {
                        const isDark = feature.featured
                        return (
                            <article
                                key={feature.title}
                                className={`relative overflow-hidden rounded-[18px] sm:rounded-[26px] p-4 sm:p-7 flex flex-col justify-between gap-3.5 sm:gap-5 transition-all duration-300 ${
                                    isDark
                                        ? "bg-[#0F172A] text-white border border-slate-800/50 shadow-[0_14px_38px_rgba(15,23,42,0.14)]"
                                        : i === 1
                                            ? "bg-[#fffbf5] border border-[#794d00]/15 hover:border-[#794d00]/35 hover:shadow-[0_14px_34px_rgba(121,77,0,0.08)]"
                                            : "bg-white border border-slate-200/80 shadow-[0_6px_24px_rgba(15,23,42,0.03)] hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)] hover:border-[#794d00]/35"
                                }`}
                            >
                                {isDark && (
                                    <>
                                        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
                                        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
                                    </>
                                )}

                                <div className="relative z-10 flex items-center justify-between gap-3">
                                    <span
                                        className={`text-[11px] sm:text-xs font-extrabold tracking-[0.18em] ${
                                            isDark ? "text-slate-400" : i === 1 ? "text-[#794d00]/70" : "text-slate-400"
                                        }`}
                                    >
                                        0{i + 1}
                                    </span>
                                    <span
                                        className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider ${
                                            isDark
                                                ? "bg-white/10 border border-white/15 text-amber-200"
                                                : i === 1
                                                    ? "bg-[#794d00] text-white"
                                                    : "bg-[#f5f5f7] text-slate-700"
                                        }`}
                                    >
                                        {feature.tag}
                                    </span>
                                </div>

                                <div className="relative z-10 space-y-1.5 sm:space-y-2">
                                    <h3
                                        className={`text-base sm:text-xl font-extrabold leading-snug tracking-tight ${
                                            isDark ? "text-white" : "text-slate-950"
                                        }`}
                                    >
                                        {feature.title}
                                    </h3>
                                    <p
                                        className={`text-xs sm:text-sm leading-relaxed ${
                                            isDark ? "text-slate-300" : "text-slate-600"
                                        }`}
                                    >
                                        {feature.description}
                                    </p>
                                </div>
                            </article>
                        )
                    })}
                </div>

                {/* ── Bottom Row: 4 Editorial Cards ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                    {features.slice(3).map((feature, i) => (
                        <article
                            key={feature.title}
                            className="rounded-[18px] sm:rounded-[26px] bg-[#f5f5f7] hover:bg-white border border-slate-200/80 hover:border-[#794d00]/35 p-4 sm:p-6 flex flex-col justify-between gap-3 sm:gap-4 shadow-[0_4px_18px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.07)] transition-all duration-300"
                        >
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-[11px] sm:text-xs font-extrabold tracking-[0.16em] text-slate-400">
                                    0{i + 4}
                                </span>
                                <span className="px-2.5 py-0.5 sm:py-1 rounded-full bg-white border border-slate-200/80 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#794d00]">
                                    {feature.tag}
                                </span>
                            </div>

                            <div className="space-y-1 sm:space-y-1.5">
                                <h3 className="text-sm sm:text-[17px] font-extrabold text-slate-950 leading-snug tracking-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
