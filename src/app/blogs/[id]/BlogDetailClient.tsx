"use client"

import { useEffect, useRef, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { blogPosts, BlogPost } from "@/data/blogs"

export default function BlogDetailClient() {
    const { id } = useParams()
    const router = useRouter()
    const containerRef = useRef<HTMLDivElement>(null)
    const [post, setPost] = useState<BlogPost | null>(null)
    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        const foundPost = blogPosts.find((p) => p.id === Number(id))
        if (!foundPost) {
            router.push("/blogs")
            return
        }
        setPost(foundPost)
        setRelatedPosts(blogPosts.filter((p) => p.id !== Number(id)).slice(0, 3))
        window.scrollTo(0, 0)
    }, [id, router])

    useGSAP(
        () => {
            if (!post) return
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
        { dependencies: [post], scope: containerRef }
    )

    const handleCopyLink = async () => {
        if (typeof window === "undefined") return
        try {
            await navigator.clipboard.writeText(window.location.href)
            setCopied(true)
            setTimeout(() => setCopied(false), 2500)
        } catch {
            // Clipboard unavailable
        }
    }

    if (!post) return null

    const readMinutes = Math.max(2, Math.ceil(post.content.length / 500))

    return (
        <main ref={containerRef} className="min-h-screen bg-white font-figtree">
            {/* ── Unified Editorial Header (Zero Icons) ── */}
            <section className="relative bg-[#fffbf5] pt-24 sm:pt-32 lg:pt-36 pb-8 sm:pb-14 overflow-hidden border-b border-slate-200/60">
                <div className="absolute inset-0 bg-[url('/contact_hero_bg.png')] bg-cover bg-center bg-no-repeat opacity-[0.2] pointer-events-none" />
                <div className="absolute top-[10%] left-[-10%] w-[450px] h-[450px] bg-[#794d00]/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[5%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#794d0006_1px,transparent_1px),linear-gradient(to_bottom,#794d0006_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

                <div className="container-custom mx-auto px-4 sm:px-6 relative z-10">
                    {/* Breadcrumbs */}
                    <nav
                        aria-label="Breadcrumb"
                        className="blog-reveal flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-slate-400 mb-4 sm:mb-6"
                    >
                        <Link href="/" className="hover:text-[#794d00] transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href="/blogs" className="hover:text-[#794d00] transition-colors">
                            Blogs
                        </Link>
                        <span>/</span>
                        <span className="text-[#794d00]">{post.category}</span>
                    </nav>

                    <div className="max-w-4xl space-y-3.5 sm:space-y-5">
                        <span className="blog-reveal inline-flex items-center px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/90 border border-[#794d00]/15 text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.16em] text-[#794d00] shadow-sm">
                            {post.category}
                        </span>

                        <h1 className="blog-reveal font-black text-slate-950 leading-[1.08] tracking-tight text-2xl sm:text-5xl lg:text-[54px]">
                            {post.title}
                        </h1>

                        <p className="blog-reveal text-slate-600 text-xs sm:text-base lg:text-lg font-medium leading-relaxed max-w-2xl">
                            {post.excerpt}
                        </p>

                        {/* Meta Strip */}
                        <div className="blog-reveal flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1.5 pt-2.5 sm:pt-3 border-t border-slate-200/70 text-[10px] sm:text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                            <span className="text-slate-900">By {post.author.name}</span>
                            <span className="text-slate-300">·</span>
                            <span>{post.date}</span>
                            <span className="text-slate-300">·</span>
                            <span className="text-[#794d00]">{readMinutes} Min Read</span>
                        </div>
                    </div>

                    {/* Featured Cover Image */}
                    <div className="blog-reveal relative w-full aspect-[16/9] sm:aspect-[21/10] rounded-[18px] sm:rounded-[28px] overflow-hidden shadow-xl border border-slate-200/70 mt-6 sm:mt-10 bg-slate-100">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            priority
                            quality={85}
                            className="object-cover"
                            sizes="(max-width: 1280px) 100vw, 1280px"
                        />
                    </div>
                </div>
            </section>

            {/* ── Main Article Body + Sidebar (Zero Icons) ── */}
            <section className="py-9 sm:py-16 md:py-20">
                <div className="container-custom mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-start">
                        {/* Article Content */}
                        <article className="lg:col-span-8 space-y-7 sm:space-y-10">
                            <div
                                className="prose prose-slate prose-sm sm:prose-lg max-w-none text-slate-600 font-medium leading-[1.8] sm:leading-[1.85]
                                prose-headings:text-slate-950 prose-headings:font-extrabold prose-headings:tracking-tight
                                prose-h3:text-lg sm:prose-h3:text-2xl prose-h3:mt-8 sm:prose-h3:mt-10 prose-h3:mb-3 sm:prose-h3:mb-4 prose-h3:text-[#794d00]
                                prose-p:mb-5 sm:prose-p:mb-6
                                prose-strong:text-slate-900 prose-strong:font-bold"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* Bottom Share & Navigation Bar */}
                            <div className="pt-6 sm:pt-8 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-400 mr-1">
                                        Share
                                    </span>
                                    <button
                                        type="button"
                                        onClick={handleCopyLink}
                                        className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#f5f5f7] hover:bg-slate-900 hover:text-white text-slate-800 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                                    >
                                        {copied ? "Link Copied" : "Copy Link"}
                                    </button>
                                </div>

                                <Link
                                    href="/blogs"
                                    className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-slate-300 hover:border-slate-900 text-slate-900 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.14em] transition-colors"
                                >
                                    Back to All Articles
                                </Link>
                            </div>
                        </article>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4 space-y-4 sm:space-y-5 lg:sticky lg:top-28">
                            {/* Author Card */}
                            <div className="bg-[#fffbf5] p-4 sm:p-7 rounded-[18px] sm:rounded-[24px] border border-[#794d00]/15 space-y-4 sm:space-y-5">
                                <div className="flex items-center gap-3 sm:gap-4 pb-3.5 sm:pb-5 border-b border-[#794d00]/10">
                                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                                        <Image
                                            src={post.author.avatar}
                                            alt={post.author.name}
                                            fill
                                            className="object-cover"
                                            sizes="56px"
                                        />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.18em] text-[#794d00]">
                                            Industry Expert
                                        </p>
                                        <h2 className="text-base sm:text-lg font-extrabold text-slate-950 truncate">
                                            {post.author.name}
                                        </h2>
                                    </div>
                                </div>

                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                    Certified instructor at AIMS Training Center specializing in {post.category.toLowerCase()} and Abu Dhabi professional training standards.
                                </p>

                                {post.author.socials && (
                                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-0.5 sm:pt-1">
                                        {post.author.socials.linkedin && (
                                            <a
                                                href={post.author.socials.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 py-1 sm:py-1.5 rounded-full bg-white border border-slate-200/80 text-[10px] sm:text-[11px] font-bold text-slate-700 hover:border-[#794d00] hover:text-[#794d00] transition-colors"
                                            >
                                                LinkedIn
                                            </a>
                                        )}
                                        {post.author.socials.twitter && (
                                            <a
                                                href={post.author.socials.twitter}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 py-1 sm:py-1.5 rounded-full bg-white border border-slate-200/80 text-[10px] sm:text-[11px] font-bold text-slate-700 hover:border-[#794d00] hover:text-[#794d00] transition-colors"
                                            >
                                                X / Twitter
                                            </a>
                                        )}
                                        {post.author.socials.facebook && (
                                            <a
                                                href={post.author.socials.facebook}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 py-1 sm:py-1.5 rounded-full bg-white border border-slate-200/80 text-[10px] sm:text-[11px] font-bold text-slate-700 hover:border-[#794d00] hover:text-[#794d00] transition-colors"
                                            >
                                                Facebook
                                            </a>
                                        )}
                                        {post.author.socials.instagram && (
                                            <a
                                                href={post.author.socials.instagram}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 py-1 sm:py-1.5 rounded-full bg-white border border-slate-200/80 text-[10px] sm:text-[11px] font-bold text-slate-700 hover:border-[#794d00] hover:text-[#794d00] transition-colors"
                                            >
                                                Instagram
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* CTA Card */}
                            <div className="bg-[#0F172A] border border-slate-800/50 p-4 sm:p-7 rounded-[18px] sm:rounded-[24px] text-white space-y-4 sm:space-y-5 shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
                                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
                                <div className="relative z-10 space-y-1.5 sm:space-y-2">
                                    <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-300 block">
                                        AIMS Abu Dhabi
                                    </span>
                                    <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-tight leading-tight">
                                        Advance Your Career.
                                    </h3>
                                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                                        Enroll in our ACTVET-approved {post.category} training programs and stand out in the UAE job market.
                                    </p>
                                </div>
                                <Link
                                    href="/courses"
                                    className="relative z-10 inline-flex items-center justify-center w-full rounded-full bg-white text-slate-950 hover:bg-[#fffbf5] px-5 sm:px-6 py-2.5 sm:py-3 text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.14em] transition-all active:scale-95"
                                >
                                    Browse Courses
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* ── Related Articles (Zero Icons) ── */}
            {relatedPosts.length > 0 && (
                <section className="py-10 sm:py-20 bg-[#fffbf5] border-t border-slate-200/60">
                    <div className="container-custom mx-auto px-4 sm:px-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-4 pb-3 sm:pb-4 mb-6 sm:mb-8 border-b border-slate-200/70">
                            <div className="space-y-0.5 sm:space-y-1">
                                <span className="text-[#794d00] font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase block">
                                    Keep Learning
                                </span>
                                <h2 className="text-xl sm:text-3xl font-bold text-[#794d00] tracking-tight uppercase leading-tight">
                                    Related <span className="text-slate-950">Articles.</span>
                                </h2>
                            </div>
                            <Link
                                href="/blogs"
                                className="inline-flex items-center px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white border border-slate-200/80 text-[10px] font-black tracking-widest uppercase text-[#794d00] hover:border-[#794d00] hover:text-slate-950 transition-colors shrink-0"
                            >
                                View All Insights
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {relatedPosts.map((rp) => (
                                <article
                                    key={rp.id}
                                    className="group relative bg-white rounded-[18px] sm:rounded-[24px] border border-slate-200/80 shadow-[0_6px_24px_rgba(15,23,42,0.03)] hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)] hover:border-[#794d00]/35 overflow-hidden flex flex-col transition-all duration-300"
                                >
                                    <Link
                                        href={`/blogs/${rp.id}`}
                                        className="absolute inset-0 z-20 cursor-pointer"
                                        aria-label={`Read ${rp.title}`}
                                    />
                                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 pointer-events-none">
                                        <Image
                                            src={rp.image}
                                            alt={rp.title}
                                            fill
                                            loading="lazy"
                                            quality={82}
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                                            <span className="bg-white/95 backdrop-blur-sm text-[#794d00] font-extrabold text-[9px] sm:text-[10px] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                                                {rp.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4 sm:p-6 flex flex-col justify-between gap-3.5 sm:gap-4 flex-1 pointer-events-none">
                                        <div className="space-y-1.5 sm:space-y-2.5">
                                            <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-[0.14em]">
                                                {rp.date}
                                            </p>
                                            <h3 className="text-base sm:text-lg font-extrabold text-slate-950 leading-snug group-hover:text-[#794d00] transition-colors line-clamp-2">
                                                {rp.title}
                                            </h3>
                                        </div>
                                        <div className="pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between">
                                            <span className="text-[11px] sm:text-xs font-semibold text-slate-500">
                                                {rp.author.name}
                                            </span>
                                            <span className="text-[10px] font-black tracking-widest uppercase text-[#794d00] group-hover:text-slate-950 transition-colors">
                                                View Article
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    )
}
