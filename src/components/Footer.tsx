"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react"
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "@/components/BrandIcons"

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null)
    const brandRef = useRef<HTMLDivElement>(null)
    const linksRef = useRef<HTMLDivElement>(null)
    const contactRef = useRef<HTMLDivElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)

    // State for user's current location
    const [userLocation, setUserLocation] = useState("Abu Dhabi, UAE")

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Our Courses", path: "/courses" },
        { name: "Blogs", path: "/blogs" },
        { name: "Contact", path: "/contact" },
    ]

    const socialLinks = [
        { icon: <Facebook size={20} />, path: "https://www.facebook.com/AIMSABUDHABI" },
        { icon: <Twitter size={20} />, path: "https://x.com/AimsTrainingCen" },
        { icon: <Linkedin size={20} />, path: "https://www.linkedin.com/in/aims-training-center/" },
        { icon: <Instagram size={20} />, path: "https://www.instagram.com/aimsabudhabi/" },
        { icon: <Youtube size={20} />, path: "https://www.youtube.com/channel/UCujIydyHEVpkjxQQkXrMWDQ" },
    ]

    // Fetch user location based on IP
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                // Using a signal with timeout to prevent hanging
                const controller = new AbortController()
                const timeoutId = setTimeout(() => controller.abort(), 3000)

                const response = await fetch("https://ipapi.co/json/", { signal: controller.signal })
                clearTimeout(timeoutId)

                const data = await response.json()
                if (data.city && data.country_name) {
                    setUserLocation(`${data.city}, ${data.country_name}`)

                    // Refresh ScrollTrigger silently
                    setTimeout(() => {
                        ScrollTrigger.refresh()
                    }, 500)
                }
            } catch (error) {
                // Silently fails without console error to avoid "Failed to fetch" noise
                // Default "Abu Dhabi, UAE" remains
            }
        }
        fetchLocation()
    }, [])

    useGSAP(() => {
        // Reveal animations
        const revealTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top 80%",
            }
        })

        revealTimeline
            .from(brandRef.current, { y: 50, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.2 })
            .from([linksRef.current, contactRef.current, ctaRef.current], {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: "power2.out"
            }, "-=0.4")
    }, { scope: footerRef })

    return (
        <footer
            ref={footerRef}
            className="relative bg-[#0F172A] text-white pt-10 pb-6 md:pt-20 md:pb-12 overflow-hidden border-t border-slate-800/50"
        >
            {/* Background Accents */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container-custom relative z-10 mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16 mb-12 sm:mb-20">

                    {/* Brand Column */}
                    <div ref={brandRef} className="space-y-6">
                        <Link href="/" className="inline-block group">
                            <Image
                                src="/images/aims-logo.png"
                                alt="AIMS Logo"
                                width={200}
                                height={70}
                                className="h-16 w-auto object-contain"
                                style={{ filter: "brightness(0) invert(1)" }}
                            />
                        </Link>
                        <p className="text-slate-400 text-base md:text-lg leading-relaxed font-light font-figtree">
                            Empowering individuals through specialized training programs in Abu Dhabi since 2010. Excellence in education and professional development.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social, i) => (
                                <Link
                                    key={i}
                                    href={social.path}
                                    className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
                                >
                                    {social.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div ref={linksRef} className="space-y-6">
                        <h4 className="text-sm font-bold tracking-[0.2em] uppercase text-blue-500 font-figtree">Navigation</h4>
                        <nav className="flex flex-col gap-4 font-figtree">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.path}
                                    className="group flex items-center gap-2 text-white/90 hover:text-white transition-all w-fit"
                                >
                                    <span className="w-0 group-hover:w-4 h-px bg-blue-500 transition-all duration-300"></span>
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div ref={contactRef} className="space-y-6">
                        <h4 className="text-sm font-bold tracking-[0.2em] uppercase text-blue-500 font-figtree">Get in Touch</h4>
                        <div className="space-y-4 sm:space-y-6 font-figtree">
                            <div className="flex gap-4 group">
                                <MapPin size={20} className="text-blue-500 shrink-0 group-hover:scale-110 transition-transform" />
                                <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">
                                    Lulu Express Building, Benkaram Tower - Mezzanine 02 - Hamdan Bin Mohammed St, Abu Dhabi - UAE
                                </p>
                            </div>
                            <div className="flex gap-4 group">
                                <Phone size={20} className="text-blue-500 shrink-0 group-hover:scale-110 transition-transform" />
                                <a href="tel:+971026724334" className="text-white text-sm md:text-base hover:text-white/80 transition-colors py-1">
                                    +971 26724334
                                </a>
                            </div>
                            <div className="flex gap-4 group">
                                <Mail size={20} className="text-blue-500 shrink-0 group-hover:scale-110 transition-transform" />
                                <a href="mailto:contactus@edu-aims.com" className="text-white text-sm md:text-base hover:text-white/80 transition-colors py-1">
                                    contactus@edu-aims.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter/CTA */}
                    <div ref={ctaRef} className="space-y-6">
                        <h4 className="text-sm font-bold tracking-[0.2em] uppercase text-blue-500 font-figtree">Stay Updated</h4>
                        <p className="text-slate-400 font-light font-figtree leading-relaxed">
                            Ready to advance your career? Join our newsletter for updates.
                        </p>
                        <div className="relative group">
                            <Link
                                href="/courses"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/40 group-hover:-translate-y-1"
                            >
                                Enroll Now <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 sm:pt-12 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-6 opacity-60 text-[11px] sm:text-xs md:text-sm font-figtree">
                    <p>© 2026 AIMS Training Center. All rights reserved.</p>
                    <div className="flex items-center gap-8 text-white font-medium">
                        <Link href="/privacy" className="hover:text-white/80 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white/80 transition-colors">Terms of Service</Link>
                        <div className="flex items-center gap-2 text-white/60">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="transition-opacity duration-500">{userLocation}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Large Decorative Text */}
            <div className="absolute bottom-0 right-0 pointer-events-none opacity-[0.04] select-none overflow-hidden">
                <span translate="no" className="notranslate text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] xl:text-[25rem] font-black leading-none font-figtree uppercase block translate-x-[10%] translate-y-[20%]">
                    AIMS
                </span>
            </div>
        </footer>
    )
}