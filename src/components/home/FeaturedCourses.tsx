"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
    useScroll,
    useTransform,
    useSpring,
    useMotionValueEvent,
    motion,
    type MotionValue,
} from "framer-motion";
import { useCourses } from "@/hooks/useCourse";
import type { Course } from "@/data/courses";

const FEATURED_IDS = [
    "engineering-cad",
    "office-administration",
    "graphic-design-animation",
    "finance-accounting",
    "network-it",
    "language-courses",
];

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

interface CardTheme {
    surface: string;
    border: string;
    indexColor: string;
    titleColor: string;
    descColor: string;
    metaPill: string;
    chip: string;
    ctaColor: string;
    imageFrame: string;
}

const CARD_THEMES: CardTheme[] = [
    {
        surface: "bg-[#fffbf5]",
        border: "border-[#794d00]/15 hover:border-[#794d00]/35",
        indexColor: "text-[#794d00]",
        titleColor: "text-slate-950",
        descColor: "text-slate-600",
        metaPill: "bg-white border border-[#794d00]/15 text-[#794d00]",
        chip: "bg-white border border-slate-200/80 text-slate-700",
        ctaColor: "text-[#794d00]",
        imageFrame: "border-white shadow-md",
    },
    {
        surface: "bg-[#1e2a3b]",
        border: "border-slate-700/80 hover:border-amber-400/40",
        indexColor: "text-amber-300",
        titleColor: "text-white",
        descColor: "text-slate-300",
        metaPill: "bg-white/10 border border-white/15 text-amber-200",
        chip: "bg-white/10 border border-white/10 text-slate-200",
        ctaColor: "text-amber-300",
        imageFrame: "border-white/15 shadow-lg",
    },
    {
        surface: "bg-white",
        border: "border-slate-200/90 hover:border-[#794d00]/30",
        indexColor: "text-[#794d00]",
        titleColor: "text-slate-950",
        descColor: "text-slate-600",
        metaPill: "bg-[#fffbf5] border border-[#794d00]/15 text-[#794d00]",
        chip: "bg-[#f8f9fb] border border-slate-200/70 text-slate-700",
        ctaColor: "text-[#794d00]",
        imageFrame: "border-slate-100 shadow-md",
    },
    {
        surface: "bg-[#f5f5f7]",
        border: "border-slate-200/90 hover:border-[#794d00]/30",
        indexColor: "text-[#794d00]",
        titleColor: "text-slate-950",
        descColor: "text-slate-600",
        metaPill: "bg-white border border-slate-200/80 text-slate-800",
        chip: "bg-white border border-slate-200/70 text-slate-700",
        ctaColor: "text-[#794d00]",
        imageFrame: "border-white shadow-md",
    },
    {
        surface: "bg-[#fffbf5]",
        border: "border-[#794d00]/15 hover:border-[#794d00]/35",
        indexColor: "text-[#794d00]",
        titleColor: "text-slate-950",
        descColor: "text-slate-600",
        metaPill: "bg-white border border-[#794d00]/15 text-[#794d00]",
        chip: "bg-white border border-slate-200/80 text-slate-700",
        ctaColor: "text-[#794d00]",
        imageFrame: "border-white shadow-md",
    },
    {
        surface: "bg-[#1e2a3b]",
        border: "border-slate-700/80 hover:border-amber-400/40",
        indexColor: "text-amber-300",
        titleColor: "text-white",
        descColor: "text-slate-300",
        metaPill: "bg-white/10 border border-white/15 text-amber-200",
        chip: "bg-white/10 border border-white/10 text-slate-200",
        ctaColor: "text-amber-300",
        imageFrame: "border-white/15 shadow-lg",
    },
];

interface CourseStackCardProps {
    course: Course;
    index: number;
    total: number;
    smoothProgress: MotionValue<number>;
}

function CourseStackCard({
    course,
    index,
    total,
    smoothProgress,
}: CourseStackCardProps) {
    const localCardRef = useRef<HTMLDivElement>(null);
    const theme = CARD_THEMES[index % CARD_THEMES.length];

    // Smooth depth recession as subsequent cards stack over this card
    const step = 1 / total;
    const start = index * step;
    const end = Math.min(1, start + step * 1.4);
    const targetScale = 1 - (total - 1 - index) * 0.028;

    const cardScale = useTransform(smoothProgress, [start, 1], [1, targetScale]);
    const depthShade = useTransform(
        smoothProgress,
        [start, end],
        [0, index === total - 1 ? 0 : 0.14]
    );

    // Individual entrance parallax for the card image as it enters the viewport
    const { scrollYProgress: entryProgress } = useScroll({
        target: localCardRef,
        offset: ["start end", "center center"],
    });
    const smoothEntry = useSpring(entryProgress, {
        stiffness: 110,
        damping: 22,
        mass: 0.3,
    });
    const imageScale = useTransform(smoothEntry, [0, 1], [1.14, 1]);
    const imageY = useTransform(smoothEntry, [0, 1], [18, 0]);

    const topics = course.curriculum?.slice(0, 3) ?? [];

    return (
        <div
            ref={localCardRef}
            className="sticky top-[var(--top-mobile)] lg:top-[var(--top-desktop)] will-change-transform"
            style={
                {
                    "--top-mobile": `${96 + index * 12}px`,
                    "--top-desktop": `${112 + index * 20}px`,
                    zIndex: index + 1,
                } as React.CSSProperties
            }
        >
            <motion.article
                style={{ scale: cardScale }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`relative origin-top rounded-[24px] sm:rounded-[28px] border shadow-[0_14px_40px_rgba(15,23,42,0.09)] overflow-hidden transition-colors duration-300 group ${theme.surface} ${theme.border}`}
            >
                {/* Full-card accessible link */}
                <Link
                    href={`/courses?category=${encodeURIComponent(course.category)}`}
                    className="absolute inset-0 z-20 cursor-pointer"
                    aria-label={`Explore ${course.title}`}
                />

                {/* Subtle Depth Dimming Overlay when card recedes behind newer cards */}
                <motion.div
                    style={{ opacity: depthShade }}
                    className="absolute inset-0 bg-slate-950 pointer-events-none z-10"
                />

                <div className="grid grid-cols-1 md:grid-cols-12 items-stretch gap-4 sm:gap-6 md:gap-7 p-5 sm:p-7 lg:p-8 relative z-0">
                    {/* Image — compact on top for mobile, right side for md+ */}
                    <div className="md:col-span-5 md:order-2 flex items-center pointer-events-none">
                        <div
                            className={`relative w-full h-[160px] sm:h-[200px] md:h-full md:min-h-[260px] rounded-2xl overflow-hidden border ${theme.imageFrame}`}
                        >
                            <motion.img
                                src={getImageForCategory(course.id)}
                                alt={course.title}
                                style={{ scale: imageScale, y: imageY }}
                                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:brightness-[1.03]"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-7 md:order-1 flex flex-col justify-between gap-3.5 sm:gap-5 pointer-events-none">
                        {/* Top Meta Row */}
                        <div className="flex items-center justify-between gap-3">
                            <span
                                className={`text-xs sm:text-sm font-black tracking-[0.18em] ${theme.indexColor}`}
                            >
                                0{index + 1}
                            </span>
                            <span
                                className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase ${theme.metaPill}`}
                            >
                                {course.level} · {course.duration}
                            </span>
                        </div>

                        {/* Title + Description + Topics */}
                        <div className="space-y-2 sm:space-y-3">
                            <h3
                                className={`text-xl sm:text-2xl md:text-[26px] font-extrabold tracking-tight leading-tight ${theme.titleColor}`}
                            >
                                {course.title}
                            </h3>
                            <p
                                className={`text-xs sm:text-sm md:text-[15px] leading-relaxed line-clamp-2 sm:line-clamp-3 ${theme.descColor}`}
                            >
                                {course.description}
                            </p>

                            {topics.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 pt-0.5 sm:pt-1">
                                    {topics.map((topic) => (
                                        <span
                                            key={topic}
                                            className={`px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-semibold ${theme.chip}`}
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* CTA Indicator */}
                        <div
                            className={`inline-flex items-center gap-2 text-[11px] font-black tracking-[0.16em] uppercase pt-0.5 sm:pt-1 ${theme.ctaColor}`}
                        >
                            <span>Explore Track</span>
                            <ArrowRight
                                size={14}
                                className="transform group-hover:translate-x-1.5 transition-transform duration-300"
                            />
                        </div>
                    </div>
                </div>
            </motion.article>
        </div>
    );
}

export default function FeaturedCourses() {
    const stackRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const { courses, loading } = useCourses();

    const featuredCourses = FEATURED_IDS.map((id) =>
        courses.find((c) => c.id === id)
    ).filter((c): c is Course => Boolean(c));

    const { scrollYProgress } = useScroll({
        target: stackRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 26,
        mass: 0.25,
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (featuredCourses.length === 0) return;
        const nextIndex = Math.min(
            featuredCourses.length - 1,
            Math.max(0, Math.round(latest * (featuredCourses.length - 1)))
        );
        if (nextIndex !== activeIndex) {
            setActiveIndex(nextIndex);
        }
    });

    const scrollToCard = (idx: number) => {
        if (!stackRef.current || featuredCourses.length <= 1) return;
        const rect = stackRef.current.getBoundingClientRect();
        const stackTop = rect.top + window.scrollY;
        const scrollableSpan = Math.max(0, stackRef.current.offsetHeight - window.innerHeight);
        const targetY = stackTop + (idx / (featuredCourses.length - 1)) * scrollableSpan;
        window.scrollTo({ top: targetY, behavior: "smooth" });
    };

    if (loading) {
        return (
            <section className="bg-white py-20 md:py-28 font-figtree">
                <div className="container-custom mx-auto px-6 grid grid-cols-1 gap-6">
                    <div className="h-[260px] bg-slate-100 animate-pulse rounded-[28px]" />
                </div>
            </section>
        );
    }

    return (
        <section className="relative bg-white py-16 md:py-28 font-figtree border-t border-slate-100">
            <div className="container-custom mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
                    {/* ── Left Column: Sticky Header + Live Scroll-Synced Track List ── */}
                    <div className="w-full lg:w-[35%] lg:sticky lg:top-28 flex flex-col gap-6 z-20">
                        <div className="space-y-3">
                            <span className="text-[#794d00] font-bold tracking-[0.2em] text-[11px] sm:text-xs uppercase block">
                                Explore Programs
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-[46px] font-bold tracking-tight uppercase leading-[1.08] text-slate-900">
                                <span className="text-[#794d00]">Courses</span>
                                <br />
                                for Every Career Goal.
                            </h2>
                            <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-sm">
                                Build the skills you need with expert-led training designed for real-world career growth in Abu Dhabi.
                            </p>
                        </div>

                        {/* Live Scroll Progress Track Navigator (Desktop) */}
                        <div className="hidden lg:flex flex-col gap-1.5 pt-2">
                            <div className="flex items-center justify-between text-[11px] font-extrabold tracking-[0.16em] uppercase text-slate-400 mb-2">
                                <span>Program Tracks</span>
                                <span className="text-[#794d00]">
                                    0{activeIndex + 1} / 0{featuredCourses.length}
                                </span>
                            </div>

                            {/* Smooth Progress Bar */}
                            <div className="h-1 w-full rounded-full bg-slate-100 overflow-hidden mb-3">
                                <motion.div
                                    style={{ scaleX: smoothProgress }}
                                    className="h-full w-full origin-left rounded-full bg-[#794d00]"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                {featuredCourses.map((course, idx) => {
                                    const isActive = idx === activeIndex;
                                    return (
                                        <button
                                            key={course.id}
                                            type="button"
                                            onClick={() => scrollToCard(idx)}
                                            className={`w-full text-left flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                                                isActive
                                                    ? "bg-[#fffbf5] border border-[#794d00]/20 text-slate-950 shadow-sm"
                                                    : "border border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                                            }`}
                                        >
                                            <span
                                                className={`text-xs font-black tracking-wider ${
                                                    isActive ? "text-[#794d00]" : "text-slate-300"
                                                }`}
                                            >
                                                0{idx + 1}
                                            </span>
                                            <span className="text-sm font-bold truncate">
                                                {course.title}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Mobile Track Quick-Jump Pills & Progress */}
                        <div className="lg:hidden flex flex-col gap-2.5 pt-1">
                            <div className="flex items-center justify-between text-[11px] font-extrabold tracking-[0.16em] uppercase text-slate-400">
                                <span>Program Tracks</span>
                                <span className="text-[#794d00]">
                                    0{activeIndex + 1} / 0{featuredCourses.length}
                                </span>
                            </div>
                            <div className="h-1 w-full rounded-full bg-slate-100 overflow-hidden">
                                <motion.div
                                    style={{ scaleX: smoothProgress }}
                                    className="h-full w-full origin-left rounded-full bg-[#794d00]"
                                />
                            </div>
                            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
                                {featuredCourses.map((course, idx) => {
                                    const isActive = idx === activeIndex;
                                    return (
                                        <button
                                            key={course.id}
                                            type="button"
                                            onClick={() => scrollToCard(idx)}
                                            className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                                                isActive
                                                    ? "bg-[#794d00] text-white shadow-sm"
                                                    : "bg-[#fffbf5] border border-[#794d00]/15 text-slate-700"
                                            }`}
                                        >
                                            <span className={isActive ? "text-amber-200" : "text-[#794d00]"}>
                                                0{idx + 1}
                                            </span>
                                            <span>{course.title}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* View All Courses Link */}
                        <div className="pt-1">
                            <Link
                                href="/courses"
                                className="group inline-flex items-center gap-3 text-[11px] font-black tracking-widest uppercase text-[#794d00] hover:text-slate-900 transition-colors"
                            >
                                View All Courses
                                <ArrowRight
                                    size={14}
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* ── Right Column: Spring-Driven Stacking Deck (Mobile + Desktop) ── */}
                    <div
                        ref={stackRef}
                        className="w-full lg:w-[65%] flex flex-col gap-10 sm:gap-12 lg:gap-14 pb-12 lg:pb-16"
                    >
                        {featuredCourses.map((course, idx) => (
                            <CourseStackCard
                                key={course.id}
                                course={course}
                                index={idx}
                                total={featuredCourses.length}
                                smoothProgress={smoothProgress}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
