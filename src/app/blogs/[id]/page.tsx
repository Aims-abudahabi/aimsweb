"use client"

import { useEffect, useRef, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { 
    ArrowLeft, 
    Calendar, 
    BookOpen, 
    ChevronRight, 
    Wind, 
    Clock, 
    ArrowRight,
    MessageCircle,
    User
} from "lucide-react"
import { Facebook, Twitter, Linkedin, Youtube, Instagram } from "@/components/BrandIcons"
import { blogPosts, BlogPost } from "@/data/blogs"

gsap.registerPlugin(ScrollTrigger)

export default function SingleBlog() {
    const { id } = useParams()
    const router = useRouter()
    const containerRef = useRef<HTMLDivElement>(null)
    const [post, setPost] = useState<BlogPost | null>(null)
    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])

    useEffect(() => {
        const foundPost = blogPosts.find(p => p.id === Number(id))
        if (!foundPost) {
            router.push("/blogs")
            return
        }
        setPost(foundPost)

        const related = blogPosts
            .filter(p => p.id !== Number(id))
            .slice(0, 3)
        setRelatedPosts(related)
        window.scrollTo(0, 0)
    }, [id, router])

    useGSAP(() => {
        if (!post || relatedPosts.length === 0) return

        gsap.from(".blog-reveal", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            clearProps: "all"
        })

        if (document.querySelector(".blog-content-grid")) {
            gsap.from(".card-reveal", {
                scrollTrigger: {
                    trigger: ".blog-content-grid",
                    start: "top 80%"
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                clearProps: "all"
            })
        }
    }, { dependencies: [post, relatedPosts], scope: containerRef })

    if (!post) return null

    return (
        <main ref={containerRef} className="min-h-screen bg-[#fffbf5] font-figtree pb-24">
            
            {/* ── Breadcrumbs ── */}
            <div className="pt-32 pb-8 container-custom mx-auto px-6">
                <nav className="blog-reveal flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    <Link href="/" className="hover:text-[#794d00] transition-colors">Home</Link>
                    <ChevronRight size={10} className="text-slate-300" />
                    <Link href="/blogs" className="hover:text-[#794d00] transition-colors">Blogs</Link>
                    <ChevronRight size={10} className="text-slate-300" />
                    <span className="text-[#794d00] truncate max-w-[200px]">{post.title}</span>
                </nav>
            </div>

            {/* ── Professional Hero Section ── */}
            <section className="container-custom mx-auto px-6 mb-16">
                <div className="blog-header flex flex-col items-start gap-8">
                    <div className="space-y-6 w-full max-w-4xl">
                        <span className="blog-reveal text-[#794d00] font-bold tracking-widest text-xs uppercase flex items-center gap-2">
                            <Wind size={14} className="text-blue-500" /> {post.category}
                        </span>
                        <h1 className="blog-reveal text-3xl md:text-5xl lg:text-6xl font-bold text-[#794d00] tracking-tight uppercase leading-[1.1]">
                            {post.title.split(' ').slice(0, -1).join(' ')} <span className="text-slate-900">{post.title.split(' ').slice(-1)}</span>
                        </h1>
                        
                        <div className="blog-reveal flex flex-wrap items-center gap-6 text-[13px] font-bold text-slate-400 uppercase tracking-widest border-t border-slate-100 pt-8 mt-8">
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-blue-500" />
                                {post.date}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} className="text-blue-500" />
                                {Math.ceil(post.content.length / 500)} MIN READ
                            </div>
                            <div className="flex items-center gap-2">
                                <User size={16} className="text-blue-500" />
                                BY {post.author.name}
                            </div>
                        </div>
                    </div>

                    <div className="blog-reveal relative w-full aspect-[21/10] rounded-[24px] overflow-hidden shadow-2xl shadow-slate-200/50 mt-4 group">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            priority
                            className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                            sizes="100vw"
                        />
                    </div>
                </div>
            </section>

            {/* ── Content Grid ── */}
            <section className="blog-content-grid container-custom mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 xl:gap-20 items-start">
                    
                    {/* Main Article Body */}
                    <article className="card-reveal space-y-12">
                        <div 
                            className="prose prose-slate prose-lg max-w-none text-slate-600 font-medium leading-[1.8]
                            prose-headings:text-[#794d00] prose-headings:font-bold prose-headings:tracking-tight prose-headings:uppercase
                            prose-h3:text-2xl md:text-3xl prose-h3:mt-12 prose-h3:mb-6
                            prose-p:mb-8
                            prose-strong:text-slate-900 prose-strong:font-bold
                            prose-ul:list-none prose-ul:pl-0 prose-ul:space-y-4
                            prose-li:flex prose-li:gap-4 prose-li:before:content-['→'] prose-li:before:text-blue-500 prose-li:before:font-black
                            "
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Standard Sharing Bar */}
                        <div className="pt-12 border-t border-slate-100 flex flex-wrap items-center justify-between gap-8">
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Share:</span>
                                <div className="flex gap-2">
                                    {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                                        <button key={i} className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#794d00] hover:border-[#794d00]/30 transition-all shadow-sm">
                                            <Icon size={18} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Link 
                                href="/blogs"
                                className="group inline-flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-[#794d00] hover:text-slate-900 transition-colors"
                            >
                                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                                Back to All Insights
                            </Link>
                        </div>
                    </article>

                    {/* Professional Sidebar */}
                    <aside className="space-y-8 lg:sticky lg:top-32">
                        
                        {/* Author Card - Matches FeaturedCourses style */}
                        <div className="card-reveal bg-white p-8 rounded-[20px] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col gap-6 group">
                            <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#fffbf5] shadow-lg shrink-0">
                                    <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" sizes="56px" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#794d00]">Industry Expert</p>
                                    <h4 className="text-lg font-bold text-slate-900 truncate">{post.author.name}</h4>
                                </div>
                            </div>

                            <p className="text-[14px] text-slate-500 font-medium leading-relaxed">
                                Expert instructor at AIMS Training Center with specialized knowledge in {post.category.toLowerCase()} and UAE professional standards.
                            </p>

                            <div className="flex items-center gap-4 pt-2">
                                {post.author.socials?.linkedin && <a href={post.author.socials.linkedin} target="_blank" className="text-slate-300 hover:text-[#794d00] transition-colors"><Linkedin size={18} /></a>}
                                {post.author.socials?.twitter && <a href={post.author.socials.twitter} target="_blank" className="text-slate-300 hover:text-[#794d00] transition-colors"><Twitter size={18} /></a>}
                                {post.author.socials?.facebook && <a href={post.author.socials.facebook} target="_blank" className="text-slate-300 hover:text-[#794d00] transition-colors"><Facebook size={18} /></a>}
                                {post.author.socials?.instagram && <a href={post.author.socials.instagram} target="_blank" className="text-slate-300 hover:text-[#794d00] transition-colors"><Instagram size={18} /></a>}
                            </div>
                        </div>

                        {/* CTA / Promotion Card */}
                        <div className="card-reveal bg-[#1e2a3b] p-8 rounded-[20px] shadow-2xl relative overflow-hidden group">
                            {/* Blue Accent */}
                            <div className="absolute top-0 left-0 right-0 h-[3px] bg-blue-500" />
                            
                            <div className="relative z-10 space-y-6">
                                <div className="space-y-2">
                                    <h4 className="text-xl font-bold text-white uppercase tracking-tight leading-tight">Advance Your <span className="text-blue-400">Career.</span></h4>
                                    <p className="text-slate-400 text-[14px] font-medium leading-relaxed">Enroll in our {post.category} certification programs and stand out in the UAE job market.</p>
                                </div>
                                <Link 
                                    href="/courses"
                                    className="inline-flex items-center gap-3 text-[10px] font-black tracking-widest uppercase text-white hover:text-blue-400 transition-colors group/btn"
                                >
                                    Browse Courses
                                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {/* ── Related Section ── */}
            <section className="mt-32 pt-24 border-t border-slate-100/50">
                <div className="container-custom mx-auto px-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16">
                        <div className="space-y-4">
                            <span className="text-[#794d00] font-bold tracking-widest text-xs uppercase flex items-center gap-2">
                                <MessageCircle size={14} className="text-blue-500" /> Keep Learning
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#794d00] tracking-tight uppercase leading-tight">
                                Related <span className="text-slate-900">Articles.</span>
                            </h2>
                        </div>
                        <Link
                            href="/blogs"
                            className="group inline-flex items-center gap-3 text-[10px] font-black tracking-widest uppercase text-[#794d00] hover:text-slate-900 transition-colors"
                        >
                            View All Insights
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedPosts.map((rp, idx) => (
                            <div
                                key={rp.id}
                                className="card-reveal bg-white rounded-[20px] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col group hover:scale-[1.01] transition-all duration-300"
                            >
                                <div className="relative aspect-[16/9] overflow-hidden">
                                    <Image src={rp.image} alt={rp.title} fill className="object-cover group-hover:scale-110 transition-transform duration-[1.5s]" sizes="(max-width: 768px) 100vw, 33vw" />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/95 backdrop-blur-sm text-[#794d00] font-black text-[9px] px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-lg">
                                            {rp.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            <Calendar size={13} className="text-blue-500" />
                                            {rp.date}
                                        </div>
                                        <h3 className="text-[19px] font-bold text-[#0f172a] leading-[1.2] group-hover:text-[#794d00] transition-colors line-clamp-2">
                                            {rp.title}
                                        </h3>
                                    </div>
                                    <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                        <Link
                                            href={`/blogs/${rp.id}`}
                                            className="inline-flex items-center gap-3 text-[10px] font-black tracking-widest uppercase text-[#794d00] hover:text-slate-900 transition-colors group/link"
                                        >
                                            View Article
                                            <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
