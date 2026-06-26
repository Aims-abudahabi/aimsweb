"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, BookOpen, Calendar } from "lucide-react"
import { blogPosts } from "@/data/blogs"

gsap.registerPlugin(ScrollTrigger)

export default function BlogsClient() {
    const containerRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        gsap.from(".blog-header", {
            scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "all"
        })

        gsap.from(".blog-card", {
            scrollTrigger: { trigger: ".blogs-grid", start: "top 85%" },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            clearProps: "all"
        })
    }, { scope: containerRef })

    return (
        <div ref={containerRef} className="blogs-page min-h-screen bg-[#fffbf5] font-figtree py-24 md:py-32 border-t border-slate-100/50">
            <div className="container-custom mx-auto px-6">

                {/* ── Header ── */}
                <div className="blog-header flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-20">
                    <div className="space-y-4">
                        <span className="text-[#794d00] font-bold tracking-widest text-xs uppercase flex items-center gap-2">Kinetic Insights
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#794d00] tracking-tight uppercase max-w-xl leading-tight">
                            Latest <span className="text-slate-900">Articles.</span>
                        </h2>
                    </div>
                    <p className="text-slate-600 text-lg max-w-xl leading-relaxed">
                        Stay updated with the latest trends in professional training, industry insights, and career growth strategies across the UAE.
                    </p>
                </div>

                {/* ── Blogs Grid ── */}
                <div className="blogs-grid grid grid-cols-1 md:grid-cols-2 gap-6">
                    {blogPosts.map((post, idx) => (
                        <div
                            key={post.id}
                            className="blog-card group bg-white rounded-[20px] border border-slate-100 shadow-xl shadow-slate-200/50 transition-all hover:scale-[1.01] duration-300 flex flex-col overflow-hidden"
                        >
                            {/* Image Section */}
                            <div className="relative aspect-[16/9] overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute top-6 left-6 z-10">
                                    <span className="bg-white/95 backdrop-blur-sm text-[#794d00] font-black text-[10px] px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-8 md:p-10 flex flex-col gap-6 flex-1">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#794d00]">
                                        <Calendar size={14} className="text-blue-500" />
                                        {post.date}
                                    </div>
                                    <div className="w-1 h-1 rounded-full bg-slate-200" />
                                    <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400">
                                        <BookOpen size={14} />
                                        {Math.ceil(post.excerpt.length / 50)} Min Read
                                    </div>
                                </div>

                                <div className="space-y-4 flex-1">
                                    <h3 className="text-2xl md:text-[26px] font-bold text-slate-900 leading-[1.2] group-hover:text-[#794d00] transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-500 text-[15px] font-medium leading-relaxed line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                </div>

                                {/* Author & Link */}
                                <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-slate-50 shadow-sm">
                                            <Image
                                                src={post.author.avatar}
                                                alt={post.author.name}
                                                fill
                                                className="object-cover"
                                                sizes="40px"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-900 text-[13px] leading-tight">
                                                {post.author.name}
                                            </span>
                                            <span className="text-[11px] font-medium text-slate-400">
                                                Instructor
                                            </span>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/blogs/${post.id}`}
                                        className="inline-flex items-center gap-3 text-[10px] font-black tracking-widest uppercase text-[#794d00] hover:text-slate-900 transition-colors group/link"
                                    >
                                        Read More
                                        <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Load More bar ── */}
                <div className="mt-20 flex flex-col items-center gap-6 pt-10 border-t border-slate-100/50">
                    <p className="text-[#794d00]/60 font-medium text-sm">You&apos;ve reached the end for now.</p>
                </div>
            </div>
        </div>
    )
}

