"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { useCourses } from "@/hooks/useCourse"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false)
    const [currentLang, setCurrentLang] = useState("EN")
    const pathname = usePathname()
    const { courses } = useCourses() // Fetch courses directly

    const handleLanguageChange = (lang: string) => {
        setCurrentLang(lang)
        const googleDropdown = document.querySelector(".goog-te-combo") as HTMLSelectElement
        if (googleDropdown) {
            googleDropdown.value = lang === 'EN' ? 'en' : 'ar'
            // Add bubbles: true to ensure Google's listener intercepts the event
            googleDropdown.dispatchEvent(new Event("change", { bubbles: true }))
        }
    }

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Courses", path: "/courses", hasDropdown: true },
        { name: "Enroll as Trainer", path: "/enroll" },
        { name: "Blogs", path: "/blogs" }
    ]

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const isActive = (path: string) => pathname === path

    const priorityIds = ['engineering-cad', 'office-administration', 'graphic-design-animation', 'finance-accounting', 'network-it', 'language-courses']
    const navCourses = priorityIds
        .map(id => courses.find(c => c.id === id))
        .filter((c): c is NonNullable<typeof c> => !!c)

    return (
        <div
            className={`fixed top-0 left-0 w-full z-[1000] font-figtree flex justify-center transition-all duration-300 ${scrolled ? "pt-3" : "pt-5"
                }`}
        >
            {/* Pill Navbar Container */}
            <nav className="w-full max-w-[1300px] mx-4 sm:mx-8 md:mx-10 lg:mx-16 xl:mx-auto bg-[#1e2a3b] rounded-full px-8 py-4 flex items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.25)]">

                {/* Logo */}
                <Link href="/" className="flex items-center shrink-0">
                    <img
                        src="/images/aims-logo.png"
                        alt="AIMS Logo"
                        loading="eager"
                        fetchPriority="high"
                        className="h-10 md:h-12 w-auto object-contain brightness-0 invert"
                    />
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => {
                        const active = isActive(link.path)
                        return (
                            <div key={link.path} className="relative group">
                                <Link
                                    href={link.path}
                                    className={`flex items-center gap-1.5 text-[13px] font-bold tracking-[0.1em] uppercase transition-colors py-2 ${active ? "text-blue-500" : "text-slate-200 hover:text-white"
                                        }`}
                                >
                                    {link.name}
                                    {link.hasDropdown && (
                                        <ChevronDown size={14} className={`transition-transform duration-300 group-hover:rotate-180 ${active ? "text-blue-500" : "text-slate-400 group-hover:text-white"}`} />
                                    )}
                                </Link>

                                {/* Desktop Dropdown */}
                                {link.hasDropdown && (
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 w-64 z-50">
                                        <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-100 p-2 overflow-hidden flex flex-col">
                                            {navCourses.map(course => (
                                                <Link
                                                    key={course.id}
                                                    href={`/courses?category=${encodeURIComponent(course.category)}`}
                                                    className="px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors text-slate-800 font-bold tracking-widest uppercase text-[11px] hover:text-blue-500"
                                                >
                                                    {course.title}
                                                </Link>
                                            ))}
                                            <div className="h-px bg-slate-100 my-1"></div>
                                            <Link
                                                href="/courses"
                                                className="px-4 py-3 hover:bg-[#fffbf5] rounded-xl transition-colors text-blue-500 font-black text-[11px] text-center tracking-widest uppercase"
                                            >
                                                Show All Courses
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Language Toggle & Enquire Now */}
                <div className="hidden md:flex items-center gap-4">
                    <div className="flex bg-[#2d3f55]/50 border border-white/10 rounded-full p-1 backdrop-blur-md relative z-50">
                        <button
                            onClick={() => handleLanguageChange('EN')}
                            className={`px-3 py-1.5 rounded-full text-[11px] font-black pointer-events-auto tracking-widest transition-colors ${currentLang === 'EN' ? 'bg-blue-500 text-white' : 'text-slate-300 hover:text-white'}`}
                        >
                            EN
                        </button>
                        <button
                            onClick={() => handleLanguageChange('AR')}
                            className={`px-3 py-1.5 rounded-full text-[11px] font-black pointer-events-auto tracking-widest transition-colors ${currentLang === 'AR' ? 'bg-blue-500 text-white' : 'text-slate-300 hover:text-white'}`}
                        >
                            AR
                        </button>
                    </div>

                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-7 py-3 rounded-full font-bold text-white text-[13px] tracking-widest bg-[#2d3f55] hover:bg-[#374e6a] border border-white/10 transition-all duration-300"
                    >
                        ENQUIRE NOW
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-[#0f172a] z-[-1] pt-28 px-8 pb-8 flex flex-col transition-all duration-500 ease-in-out md:hidden overflow-y-auto ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                    }`}
            >
                <div className="flex flex-col gap-6 items-start mt-8 w-full max-w-full pb-20">
                    {navLinks.map((link) => (
                        <div key={link.path} className="w-full">
                            <div className="flex items-center justify-between w-full border-b border-white/10 pb-4">
                                <Link
                                    href={link.path}
                                    className={`text-xl font-black uppercase tracking-widest flex-1 ${isActive(link.path) ? "text-blue-500" : "text-white"}`}
                                    onClick={() => {
                                        if (!link.hasDropdown) setIsOpen(false)
                                    }}
                                >
                                    {link.name}
                                </Link>

                                {link.hasDropdown && (
                                    <button
                                        onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                                        className="p-2 -mr-2 text-blue-500 bg-white/5 rounded-lg active:scale-95 transition-transform"
                                    >
                                        <ChevronDown size={24} className={`transition-transform duration-300 ${mobileDropdownOpen ? "rotate-180" : ""}`} />
                                    </button>
                                )}
                            </div>

                            {/* Mobile Inline Dropdown */}
                            {link.hasDropdown && (
                                <div className={`flex flex-col gap-4 pl-4 overflow-hidden transition-all duration-300 ${mobileDropdownOpen ? "max-h-[500px] opacity-100 pt-6" : "max-h-0 opacity-0 pt-0"}`}>
                                    {navCourses.map(course => (
                                        <Link
                                            key={course.id}
                                            href={`/courses/${course.id}`}
                                            className="text-white/80 hover:text-blue-500 text-[12px] uppercase font-bold tracking-widest"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {course.title}
                                        </Link>
                                    ))}
                                    <Link
                                        href="/courses"
                                        className="text-blue-500 text-[12px] uppercase font-black tracking-widest mt-2 hover:opacity-80 transition-opacity"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Show All Courses →
                                    </Link>
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="w-full flex justify-center gap-4 py-4 border-y border-white/10 mt-2 z-50 relative pointer-events-auto">
                        <button
                            onClick={() => handleLanguageChange('EN')}
                            className={`flex-1 py-3 rounded-xl text-[12px] font-black pointer-events-auto tracking-widest transition-colors ${currentLang === 'EN' ? 'bg-blue-500 text-white' : 'bg-white/5 text-slate-300'}`}
                        >
                            ENG
                        </button>
                        <button
                            onClick={() => handleLanguageChange('AR')}
                            className={`flex-1 py-3 rounded-xl text-[12px] font-black pointer-events-auto tracking-widest transition-colors ${currentLang === 'AR' ? 'bg-blue-500 text-white' : 'bg-white/5 text-slate-300'}`}
                        >
                            ARB
                        </button>
                    </div>

                    <Link
                        href="/contact"
                        className="mt-6 w-full text-center py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-900/40"
                        onClick={() => setIsOpen(false)}
                    >
                        ENQUIRE NOW
                    </Link>
                </div>
            </div>
        </div>
    )
}