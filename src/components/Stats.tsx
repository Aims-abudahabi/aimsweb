"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { GraduationCap, Clock, Briefcase, BookOpen } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

// Custom hook for count-up effect
function useCountUp(end: string, duration: number = 2, triggerRef?: React.RefObject<HTMLElement | null>) {
    const [count, setCount] = useState("0")
    const countRef = useRef<HTMLSpanElement>(null)
    const endValue = parseInt(end.replace(/,/g, ''))
    const targetStr = end

    useEffect(() => {
        const triggerElement = triggerRef?.current || countRef.current
        if (!triggerElement) return

        const obj = { value: 0 }
        
        ScrollTrigger.create({
            trigger: triggerElement,
            start: "top 90%",
            onEnter: () => {
                gsap.to(obj, {
                    value: endValue,
                    duration: duration,
                    ease: "power2.out",
                    onUpdate: () => {
                        const val = Math.floor(obj.value)
                        setCount(val.toLocaleString())
                    },
                    onComplete: () => {
                        setCount(targetStr)
                    }
                })
            },
            once: true
        })
    }, [endValue, duration, targetStr, triggerRef])

    return { count, countRef }
}

function StatCard({ number, label, triggerRef }: { number: string, label: string, triggerRef: React.RefObject<HTMLElement | null> }) {
    const { count, countRef } = useCountUp(number, 2.5, triggerRef)
    
    return (
        <div className="group relative overflow-hidden rounded-[2rem] p-8 md:p-10 flex flex-col items-center text-center transition-all duration-700 hover:-translate-y-2 bg-[#fffbf5] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-[#794d00]/5 hover:border-[#794d00]/20">
            {/* Content */}
            <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-center gap-1">
                    <span ref={countRef} className="text-5xl lg:text-6xl font-black text-[#794d00] tracking-tighter tabular-nums">
                        {count}
                    </span>
                    <span className="text-blue-500 text-4xl font-black">+</span>
                </div>
                <p className="text-[11px] md:text-xs font-black uppercase tracking-[0.4em] text-slate-500 group-hover:text-[#794d00] transition-colors">
                    {label}
                </p>
            </div>

            {/* Decorative bottom bar */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#794d00] rounded-t-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </div>
    )
}

export default function Stats() {
    const sectionRef = useRef<HTMLElement>(null)

    const stats = [
        { 
            number: "10,960", 
            label: "Students Trained"
        },
        { 
            number: "150,000", 
            label: "Training Hours"
        },
        { 
            number: "48,000", 
            label: "Corporate Partners"
        },
        { 
            number: "120", 
            label: "Courses Offered"
        }
    ]

    return (
        <section ref={sectionRef} className="py-16 md:py-24 bg-white relative overflow-hidden font-figtree">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-50 via-white to-white pointer-events-none" />
            
            <div className="container-custom relative z-10 mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative">
                    {stats.map((stat, index) => (
                        <StatCard 
                            key={index} 
                            number={stat.number} 
                            label={stat.label} 
                            triggerRef={sectionRef}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
