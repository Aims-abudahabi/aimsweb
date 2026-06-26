"use client"

import Link from "next/link"
import { Star, ArrowUpRight } from "lucide-react"
import { useState, useEffect } from "react"
import { getGoogleRating } from "@/data/googleReviews"
import { Whatsapp } from "@/components/BrandIcons"

export default function Hero() {
    const [reviewData, setReviewData] = useState({ rating: "4.9", totalReviews: "1000+" })

    useEffect(() => {
        getGoogleRating().then(setReviewData).catch(console.error)
    }, [])
    return (
        <section className="relative bg-[#fffbf5] pt-32 lg:pt-40 pb-16 lg:pb-28 font-figtree overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 bg-[url('/contact_hero_bg.png')] bg-cover bg-center bg-no-repeat opacity-[0.25] pointer-events-none" />

            {/* Background Blur Blobs */}
            <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[#794d00]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#794d0006_1px,transparent_1px),linear-gradient(to_bottom,#794d0006_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="max-w-[1200px] mx-auto px-6 sm:px-8 md:px-12 w-full relative z-10 flex flex-col items-center text-center">
                {/* Badge at the Top */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-[#794d00]/10 shadow-sm shadow-[#794d00]/5 hover:scale-[1.02] hover:border-[#794d00]/25 transition-all duration-300 group mb-6 cursor-pointer">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#794d00] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#794d00]"></span>
                    </span>
                    <span className="text-[11px] sm:text-xs font-black tracking-[0.15em] text-[#794d00] uppercase">
                        #1 Professional Training Center in UAE
                    </span>
                </div>

                {/* Headline */}
                <h1 className="font-black text-slate-900 leading-[1.08] tracking-tight text-5xl sm:text-7xl xl:text-8xl max-w-4xl">
                    A SHARP <span className="text-[#794d00] inline-block relative hover:scale-[1.02] transition-transform duration-300">
                        AIM
                        <span className="absolute bottom-1 left-0 w-full h-[4px] sm:h-[8px] bg-[#794d00]/15 rounded-full -skew-x-12"></span>
                    </span> <br className="hidden sm:block" />
                    FOR FUTURE
                </h1>

                {/* Subheadline */}
                <p className="text-slate-500 text-base sm:text-xl font-medium leading-[1.6] max-w-2xl mt-6">
                    Empowering learners with world-class professional training. Discover flexible
                    online and in-person courses designed by industry experts to accelerate your career.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full sm:w-auto">
                    <Link
                        href="/courses"
                        className="w-full sm:w-auto bg-[#794d00] text-white px-8 py-4 rounded-2xl font-bold text-[16px] transition-all hover:bg-[#1e2a3b] hover:text-white hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-[#794d00]/25 flex items-center justify-center gap-2 border-t border-white/20"
                    >
                        Explore Courses
                        <ArrowUpRight size={18} strokeWidth={2.5} />
                    </Link>

                    <a
                        href="https://chat.whatsapp.com/EuN3RJA0u8y4hexHboUlMQ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto group bg-white hover:bg-slate-50 text-[#0f172a] px-8 py-4 rounded-2xl font-bold text-[16px] transition-all hover:scale-[1.02] active:scale-[0.98] border border-slate-200 hover:border-slate-300 shadow-lg shadow-slate-100 flex items-center justify-center gap-2"
                    >
                        <Whatsapp size={20} className="text-[#25D366] fill-[#25D366]/10" stroke="#25D366" />
                        Join Community
                    </a>
                </div>

                {/* Social Proof / Google Reviews */}
                <a
                    href={`https://search.google.com/local/reviews?placeid=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || 'ChIJH1GPIFlmXj4RGXfJA5vymIo'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 mt-8 px-5 py-3.5 bg-white/70 backdrop-blur-md rounded-2xl border border-slate-100 shadow-md shadow-slate-100/50 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-100 transition-all duration-300 group cursor-pointer"
                >
                    <div className="flex -space-x-2">
                        <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80" alt="Student avatar 1" />
                        <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80" alt="Student avatar 2" />
                        <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80" alt="Student avatar 3" />
                    </div>
                    <div className="h-4 w-px bg-slate-200" />
                    <div className="flex flex-col items-start gap-0.5">
                        <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-[#0f172a] text-sm leading-none">{reviewData.rating}</span>
                            <div className="flex gap-[1px]">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={11} className="fill-amber-400 text-amber-400" />)}
                            </div>
                        </div>
                        <span className="text-[10px] text-slate-500 font-bold tracking-wider uppercase group-hover:text-[#794d00] transition-colors">
                            From {reviewData.totalReviews} students
                        </span>
                    </div>
                </a>
            </div>
        </section>
    )
}