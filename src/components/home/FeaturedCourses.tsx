"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScroll, useTransform, motion, frame, cancelFrame } from "framer-motion";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";

import { useCourses } from "@/hooks/useCourse";

interface CardProps {
    id: number;
    className?: string;
    progress: any;
    range: number[];
    targetScale: number;
    children?: React.ReactNode;
}

function ParallaxCardEffect({
    id,
    className,
    progress,
    range,
    targetScale,
    children
}: CardProps) {
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div className="sticky top-0 flex items-center justify-center w-full" style={{ height: "100vh" }}>
            <motion.div
                style={{
                    scale,
                    top: `calc(-10vh + ${id * 45}px)`
                }}
                className={className}>
                {children}
            </motion.div>
        </div>
    );
}

const getImageForCategory = (categoryId: string) => {
    switch (categoryId) {
        case "engineering-cad":
            return "/images/course-engineering-cad.png";
        case "office-administration":
            return "/images/course-office-admin.png";
        case "graphic-design-animation":
            return "/images/course-graphic-design.png";
        case "finance-accounting":
            return "/images/course-finance-accounting.png";
        case "network-it":
            return "/images/course-it-networking.png";
        case "language-courses":
            return "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200";
        default:
            return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200";
    }
};

const ParallaxCardItem = ({ course, id, total, progress }: { course: any; id: number; total: number; progress: any }) => {
    const targetScale = 1 - (total - id) * 0.05;

    const themes = [
        { bg: "bg-[#fffbf5]", text: "text-[#794d00]" }, // Brand Cream/Brown
        { bg: "bg-[#f0f9ff]", text: "text-blue-600" },
        { bg: "bg-[#f5f3ff]", text: "text-purple-600" },
        { bg: "bg-[#f0fdf4]", text: "text-emerald-600" },
        { bg: "bg-[#fff7ed]", text: "text-orange-600" },
        { bg: "bg-[#fdf2f8]", text: "text-pink-600" },
    ];
    const theme = themes[id % themes.length];

    return (
        <ParallaxCardEffect
            id={id}
            progress={progress}
            range={[id * (1 / total), 1]}
            targetScale={targetScale}
            className={`relative flex flex-col md:flex-row items-stretch w-full max-w-[1000px] h-[520px] md:h-[320px] rounded-[32px] shadow-[0_-5px_30px_-10px_rgba(0,0,0,0.1)] origin-top overflow-hidden ${theme.bg}`}
        >
            {/* Left Content Area */}
            <div className="w-full md:w-[55%] flex flex-col md:flex-row items-start md:items-center p-8 md:p-10 gap-6 md:gap-8 z-10">
                {/* Large Number */}
                <div className={`text-4xl md:text-5xl font-black ${theme.text} shrink-0 mt-2 md:mt-0`}>
                    0{id + 1}
                </div>

                {/* Text Content */}
                <div className="flex flex-col justify-center">
                    <h3 className="text-2xl md:text-2xl font-bold text-slate-900 leading-tight mb-3">
                        {course.title}
                    </h3>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed line-clamp-4 md:line-clamp-4">
                        {course.description || "Comprehensive high-impact training designed for your professional success. Equip yourself with practical skills and knowledge to excel in your career path."}
                    </p>
                    <Link
                        href={`/courses?category=${encodeURIComponent(course.category)}`}
                        className={`inline-flex items-center gap-2 mt-6 text-xs font-bold tracking-widest uppercase ${theme.text} hover:opacity-70 transition-opacity`}
                    >
                        Explore <ArrowRight size={14} />
                    </Link>
                </div>
            </div>

            {/* Right Image Area */}
            <div className="w-full md:w-[45%] relative h-[220px] md:h-full flex-shrink-0">
                {/* Desktop Mask (fade from left) */}
                <div
                    className="absolute inset-0 w-full h-full hidden md:block"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent, black 25%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent, black 25%)'
                    }}
                >
                    <img
                        src={getImageForCategory(course.id)}
                        alt={course.title}
                        className="w-full h-full object-cover object-center scale-105"
                    />
                </div>
                {/* Mobile Mask (fade from top) */}
                <div
                    className="absolute inset-0 w-full h-full md:hidden"
                    style={{
                        maskImage: 'linear-gradient(to bottom, transparent, black 25%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 25%)'
                    }}
                >
                    <img
                        src={getImageForCategory(course.id)}
                        alt={course.title}
                        className="w-full h-full object-cover object-center scale-105"
                    />
                </div>
            </div>
        </ParallaxCardEffect>
    );
};

export default function FeaturedCourses() {
    const lenisRef = useRef<LenisRef>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { courses, loading } = useCourses();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useEffect(() => {
        function update(data: { timestamp: number }) {
            lenisRef.current?.lenis?.raf(data.timestamp);
        }
        frame.update(update, true);
        return () => cancelFrame(update);
    }, []);

    if (loading) {
        return (
            <section className="bg-white py-24 md:py-32 font-figtree">
                <div className="container-custom mx-auto px-6 grid grid-cols-1 gap-6">
                    <div className="h-[240px] bg-slate-100 animate-pulse rounded-[24px]" />
                </div>
            </section>
        );
    }

    const featuredIds = ["engineering-cad", "office-administration", "graphic-design-animation", "finance-accounting", "network-it", "language-courses"];
    const featuredCourses = featuredIds
        .map(id => courses.find(c => c.id === id))
        .filter((c): c is NonNullable<typeof c> => !!c);

    return (
        <>
            <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
            <section className="bg-white pt-12 md:pt-32 font-figtree border-t border-slate-100/50">
                <div className="container-custom mx-auto px-4 md:px-6">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">

                        {/* ── Left Column: Sticky Header ── */}
                        <div className="w-full lg:w-1/3 lg:sticky lg:top-32 h-fit flex flex-col justify-start z-20">
                            <div>
                                <span className="text-[#794d00] font-bold tracking-widest text-xs uppercase mb-4 block">
                                    Explore
                                </span>
                                <h2 className="text-2xl md:text-5xl font-bold tracking-tight uppercase max-w-2xl leading-tight">
                                    <span className="text-[#794d00]">Courses</span><br /> for Every Career Goal
                                </h2>
                                <p className="text-slate-500 text-lg leading-relaxed max-w-sm">
                                    Build the skills you need with expert-led training designed for real-world success.
                                </p>
                            </div>
                        </div>

                        {/* ── Right Column: Parallax Cards Area ── */}
                        <div className="w-full lg:w-2/3" ref={containerRef}>
                            <div className="relative w-full pb-[30vh] lg:-mt-24">
                                {featuredCourses.map((course, idx) => (
                                    <ParallaxCardItem
                                        course={course}
                                        key={course.id}
                                        id={idx}
                                        total={featuredCourses.length}
                                        progress={scrollYProgress}
                                    />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}
