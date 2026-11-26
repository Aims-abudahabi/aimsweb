"use client"

import { useMemo, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { blogPosts } from "@/data/blogs"

export default function BlogsClient() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [selectedCategory, setSelectedCategory] = useState<string>("All")

    const categories = useMemo(
        () => ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))],
        []
    )

    const filteredPosts = useMemo(
        () =>
            selectedCategory === "All"
                ? blogPosts
                : blogPosts.filter((p) => p.category === selectedCategory),
        [selectedCategory]
    )

    const featuredPost = selectedCategory === "All" ? filteredPosts[0] : null
    const gridPosts = featuredPost ? filteredPosts.slice(1) : filteredPosts

    useGSAP(
        () => {
            if (typeof window !== "undefined") {
                gsap.registerPlugin(ScrollTrigger)
            }
            gsap.from(".blog-reveal", {
                y: 22,
                opacity: 0,
                duration: 0.65,
                stagger: 0.08,
                ease: "power2.out",
                clearProps: "all",
            })
        },
        { scope: containerRef }
    )

    return (
        <div ref={containerRef} className="blogs-page min-h-screen bg-white font-figtree">
            {/* ── Unified Hero Header (Same style as Home / About / Offers / Courses) ── */}
            <section className="relative bg-[#fffbf5] pt-24 sm:pt-32 lg:pt-36 pb-8 sm:pb-12 lg:pb-16 overflow-hidden border-b border-slate-200/60">
                <div className="absolute inset-0 bg-[url('/contact_hero_bg.png')] bg-cover bg-center bg-no-repeat opacity-[0.2] pointer-events-none" />
                <div className="absolute top-[10%] left-[-10%] w-[450px] h-[450px] bg-[#794d00]/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[5%] right-[-10%] w-[520px] h-[520px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#794d0006_1px,transparent_1px),linear-gradient(to_bottom,#794d0006_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

                <div className="container-custom mx-auto px-4 sm:px-6 relative z-10 text-center">
                    <div className="max-w-3xl mx-auto flex flex-col items-center">
                        <div className="blog-reveal inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 bg-white/80 backdrop-blur-md rounded-full border border-[#794d00]/10 shadow-sm shadow-[#794d00]/5 mb-3 sm:mb-4">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#794d00] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#794d00]"></span>
                            </span>
                            <span className="text-[10px] sm:text-xs font-black tracking-[0.15em] text-[#794d00] uppercase">
                                Knowledge Hub · Abu Dhabi
                            </span>
                        </div>

                        <h1 className="blog-reveal font-black text-slate-900 leading-[1.08] tracking-tight text-3xl sm:text-5xl lg:text-6xl">
                            Latest{" "}
                            <span className="text-[#794d00] inline-block relative">
                                Articles
                                <span className="absolute bottom-1 left-0 w-full h-[4px] sm:h-[6px] bg-[#794d00]/15 rounded-full -skew-x-12"></span>
                            </span>
                        </h1>

                        <p className="blog-reveal text-slate-500 text-xs sm:text-base lg:text-lg font-medium leading-relaxed max-w-2xl mt-3 sm:mt-4">
                            Stay updated with the latest trends in professional training, exam preparation guides, and career growth strategies across Abu Dhabi and the UAE.
                        </p>

                        {/* Category Filter Pills */}
                        <div className="blog-reveal flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-5 sm:mt-7">
                            {categories.map((cat) => {
                                const isActive = selectedCategory === cat
                                return (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.12em] sm:tracking-[0.14em] transition-all cursor-pointer ${
                                            isActive
                                                ? "bg-[#794d00] text-white shadow-sm"
                                                : "bg-white border border-slate-200/80 text-slate-600 hover:border-[#794d00]/35 hover:text-[#794d00]"
                                        }`}
                                    >
                                        {cat === "All" ? "All Articles" : cat}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Articles Content ── */}
            <section className="py-8 sm:py-16 md:py-20">
                <div className="container-custom mx-auto px-4 sm:px-6 space-y-7 sm:space-y-14">
                    {/* Featured Lead Article */}
                    {featuredPost && (
                        <article className="group relative rounded-[20px] sm:rounded-[28px] bg-[#f5f5f7] hover:bg-white border border-slate-200/80 hover:border-[#794d00]/35 shadow-[0_6px_24px_rgba(15,23,42,0.04)] hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)] overflow-hidden transition-all duration-300">
                            <Link
                                href={`/blogs/${featuredPost.id}`}
                                className="absolute inset-0 z-20 cursor-pointer"
                                aria-label={`Read ${featuredPost.title}`}
                            />

                            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                                {/* Image */}
                                <div className="lg:col-span-7 relative min-h-[185px] sm:min-h-[300px] lg:min-h-[380px] overflow-hidden">
                                    <Image
                                        src={featuredPost.image}
                                        alt={featuredPost.title}
                                        fill
                                        priority
                                        quality={85}
                                        className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                                        sizes="(max-width: 1024px) 100vw, 58vw"
                                    />
                                </div>

                                {/* Details */}
                                <div className="lg:col-span-5 p-4 sm:p-8 lg:p-10 flex flex-col justify-between gap-4 sm:gap-6 pointer-events-none">
                                    <div className="space-y-2.5 sm:space-y-4">
                                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                            <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#794d00] text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider">
                                                Featured
                                            </span>
                                            <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white border border-slate-200/80 text-slate-700 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider">
                                                {featuredPost.category}
                                            </span>
                                        </div>

                                        <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-slate-500">
                                            {featuredPost.date} · {Math.max(2, Math.ceil(featuredPost.content.length / 500))} Min Read
                                        </p>

                                        <h2 className="text-xl sm:text-3xl font-extrabold text-slate-950 leading-tight tracking-tight group-hover:text-[#794d00] transition-colors">
                                            {featuredPost.title}
                                        </h2>

                                        <p className="text-xs sm:text-[15px] text-slate-600 leading-relaxed line-clamp-2 sm:line-clamp-3">
                                            {featuredPost.excerpt}
                                        </p>
                                    </div>

                                    <div className="pt-3.5 sm:pt-5 border-t border-slate-200/80 flex items-center justify-between gap-3 sm:gap-4">
                                        <div className="flex items-center gap-2.5 sm:gap-3">
                                            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-slate-200 shrink-0">
                                                <Image
                                                    src={featuredPost.author.avatar}
                                                    alt={featuredPost.author.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="36px"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-900 leading-tight">
                                                    {featuredPost.author.name}
                                                </p>
                                                <p className="text-[10px] sm:text-[11px] text-slate-500">Instructor</p>
                                            </div>
                                        </div>

                                        <span className="text-[10px] font-black tracking-widest uppercase text-[#794d00] group-hover:text-slate-950 transition-colors">
                                            Read Article
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    )}

                    {/* Articles Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {gridPosts.map((post) => (
                            <article
                                key={post.id}
                                className="group relative bg-white rounded-[18px] sm:rounded-[24px] border border-slate-200/80 shadow-[0_6px_24px_rgba(15,23,42,0.03)] hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)] hover:border-[#794d00]/35 transition-all duration-300 flex flex-col overflow-hidden"
                            >
                                <Link
                                    href={`/blogs/${post.id}`}
                                    className="absolute inset-0 z-20 cursor-pointer"
                                    aria-label={`Read ${post.title}`}
                                />

                                {/* Image */}
                                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 pointer-events-none">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        loading="lazy"
                                        quality={82}
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                                        <span className="bg-white/95 backdrop-blur-sm text-[#794d00] font-extrabold text-[9px] sm:text-[10px] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 sm:p-7 flex flex-col justify-between gap-3.5 sm:gap-5 flex-1 pointer-events-none">
                                    <div className="space-y-2 sm:space-y-3">
                                        <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                                            {post.date} · {Math.max(2, Math.ceil(post.content.length / 500))} Min Read
                                        </p>

                                        <h3 className="text-base sm:text-xl font-extrabold text-slate-950 leading-snug tracking-tight group-hover:text-[#794d00] transition-colors">
                                            {post.title}
                                        </h3>

                                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                    </div>

                                    <div className="pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-slate-200 shrink-0">
                                                <Image
                                                    src={post.author.avatar}
                                                    alt={post.author.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="32px"
                                                />
                                            </div>
                                            <span className="font-bold text-slate-800 text-[11px] sm:text-xs truncate">
                                                {post.author.name}
                                            </span>
                                        </div>

                                        <span className="text-[10px] font-black tracking-widest uppercase text-[#794d00] group-hover:text-slate-950 transition-colors shrink-0">
                                            Read More
                                        </span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Bottom CTA Banner */}
                    <div className="relative overflow-hidden mt-4 sm:mt-8 bg-[#0F172A] border border-slate-800/50 rounded-[20px] sm:rounded-[28px] p-5 sm:p-10 lg:p-12 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 sm:gap-6 shadow-xl">
                        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
                        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
                        <div className="relative z-10 space-y-1.5 sm:space-y-2 max-w-2xl">
                            <span className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.2em] uppercase text-amber-300 block">
                                Turn Insights Into Skills
                            </span>
                            <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">
                                Ready to level up your career in Abu Dhabi?
                            </h2>
                            <p className="text-slate-300 text-xs sm:text-base font-light">
                                Explore 50+ ACTVET-approved training tracks across Engineering &amp; CAD, Finance, IT, Graphic Design, and Languages.
                            </p>
                        </div>
                        <Link
                            href="/courses"
                            className="relative z-10 w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-white text-slate-950 hover:bg-[#fffbf5] px-6 sm:px-7 py-3 sm:py-3.5 text-xs font-extrabold uppercase tracking-[0.14em] shrink-0 transition-all active:scale-95"
                        >
                            Explore Courses
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
