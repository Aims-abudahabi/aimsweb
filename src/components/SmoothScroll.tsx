"use client"

import { ReactNode, useEffect, useRef, Suspense } from "react"
import { usePathname } from "next/navigation"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

declare global {
    interface Window {
        __lenis?: Lenis | null
    }
}

function ScrollManager({ lenisRef }: { lenisRef: React.RefObject<Lenis | null> }) {
    const pathname = usePathname()

    // Reset to top only on actual route pathname changes (not query param jumps like ?category=)
    useEffect(() => {
        if (typeof window === "undefined") return

        if (window.location.hash) {
            const target = document.querySelector(window.location.hash)
            if (target) {
                if (lenisRef.current) {
                    lenisRef.current.scrollTo(target as HTMLElement, { offset: -96, immediate: true })
                } else {
                    target.scrollIntoView()
                }
            }
        } else if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true })
        } else {
            window.scrollTo(0, 0)
        }

        const timer = setTimeout(() => {
            lenisRef.current?.resize()
            ScrollTrigger.refresh()
        }, 150)

        return () => clearTimeout(timer)
    }, [pathname, lenisRef])

    return null
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        if (typeof window === "undefined") return

        gsap.registerPlugin(ScrollTrigger)

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        const isTouchDevice =
            window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window

        // Let touch/mobile devices & reduced-motion users keep native momentum scrolling
        if (prefersReducedMotion || isTouchDevice) {
            window.__lenis = null
            return
        }

        const lenis = new Lenis({
            lerp: 0.1,
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            syncTouch: false,
            infinite: false,
        })

        lenisRef.current = lenis
        window.__lenis = lenis

        lenis.on("scroll", ScrollTrigger.update)

        const update = (time: number) => {
            lenis.raf(time * 1000)
        }

        gsap.ticker.add(update)
        gsap.ticker.lagSmoothing(0)

        // Smoothly intercept same-page #hash anchor clicks so Lenis never fights native scroll
        const handleAnchorClick = (e: MouseEvent) => {
            const anchor = (e.target as HTMLElement | null)?.closest('a[href^="#"]') as HTMLAnchorElement | null
            if (!anchor) return
            const href = anchor.getAttribute("href")
            if (!href || href === "#") return
            const target = document.querySelector(href)
            if (!target) return
            e.preventDefault()
            lenis.scrollTo(target as HTMLElement, { offset: -96, duration: 0.9 })
        }

        document.addEventListener("click", handleAnchorClick)

        // Keep Lenis & GSAP ScrollTrigger synced when dynamic sections change height (FAQ, reviews, etc.)
        let resizeTimer: ReturnType<typeof setTimeout> | null = null
        const resizeObserver = new ResizeObserver(() => {
            if (resizeTimer) clearTimeout(resizeTimer)
            resizeTimer = setTimeout(() => {
                lenis.resize()
                ScrollTrigger.refresh()
            }, 200)
        })
        resizeObserver.observe(document.body)

        return () => {
            if (resizeTimer) clearTimeout(resizeTimer)
            resizeObserver.disconnect()
            document.removeEventListener("click", handleAnchorClick)
            gsap.ticker.remove(update)
            lenis.destroy()
            lenisRef.current = null
            window.__lenis = null
        }
    }, [])

    return (
        <>
            <Suspense fallback={null}>
                <ScrollManager lenisRef={lenisRef} />
            </Suspense>
            {children}
        </>
    )
}
