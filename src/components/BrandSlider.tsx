"use client"

import React, { useEffect, useRef } from "react"
import Image from "next/image"
import { Wind } from "lucide-react"
import { gsap } from "gsap"

const logos = [
    { name: "Abu Dhabi International Marine Sports Club", path: "/logo/ABU DHABI INTERNtional mRINE SPORTS CLUB LOGO HD.png" },
    { name: "ACTEVET", path: "/logo/ACTEVET LOGO PNG.png" },
    { name: "Adeka Al Ghurair", path: "/logo/ADEKA AL GHURUAIR ADDITIVES LOGO HD.png" },
    { name: "Al Bayan Engineering", path: "/logo/AL BAYAN ENGINEERING CONSULTANTS LOGO.png" },
    { name: "Al Masaood Oil", path: "/logo/AL MASAOOD OIL AS LOGO HD.png" },
    { name: "Allianz Middle East", path: "/logo/ALLIANZ MIDDLE EAST LOGO.png" },
    { name: "AN ADS Company", path: "/logo/AN ADS COMPANY.png" },
    { name: "Anabeeb", path: "/logo/ANABEEB LOGO UAE.png" },
    { name: "Arabtec", path: "/logo/ARABTEC LOG HD.png" },
    { name: "ATGC", path: "/logo/ATGC TRANSORT AND GENERAL CONTRACTING LLC LOGO.png" },
    { name: "Arkan Architects", path: "/logo/Arkan architets consultants uae logo hd.png" },
    { name: "British Embassy Abu Dhabi", path: "/logo/BRITISH EMBASSY ABU DHABI LOGO.png" },
    { name: "Combined Group Contracting", path: "/logo/COMBINED GROUP CONTRACTING CO.png" },
    { name: "Crown Prince Court", path: "/logo/CROWN PRINCE COURT LOGO PNG.png" },
    { name: "East Consult Architects", path: "/logo/EAST CONSULT ARCHITECTS INTERIOR DESIGN LOGO.png" },
    { name: "EDIC", path: "/logo/EDIC LOGO.png" },
    { name: "Eltizam", path: "/logo/ELTIZAM LOGO.png" },
    { name: "Emdad", path: "/logo/EMDAD LOGO HD.png" },
    { name: "EME Engineering", path: "/logo/EME ENGINEERING MARKETING EST LOGO.png" },
    { name: "Emirates Landscape", path: "/logo/EMIRATES LANDSCAPE KLOGO HD.png" },
    { name: "Emircom", path: "/logo/EMIRCOM LOGO.png" },
    { name: "FAMC Protection", path: "/logo/FAMC PROTECTION LOGO UAE.png" },
    { name: "FedEx", path: "/logo/FEDEX LOGO.png" },
    { name: "Gulf Contractors", path: "/logo/GULF CONTRACTORS LOGO UASE.png" },
    { name: "Investcorp", path: "/logo/INVESTCORP LOGO HD.png" },
    { name: "Nael General Contracting", path: "/logo/NAEL GENERAL CONTRACTING GROUP.png" },
    { name: "NBHH", path: "/logo/NBHH LOGO HD.png" },
    { name: "NMDC", path: "/logo/NMDC LOGO UAE LOGO.png" },
    { name: "Saraya Interior Design", path: "/logo/SARAYA INTERIOR DESIGN CONTRACTING LOGO.png" },
    { name: "Tamas", path: "/logo/TAMAS LOGO UAE.png" },
    { name: "Tecon", path: "/logo/TECON.png" },
    { name: "TotalEnergies", path: "/logo/TOTALENERIES LOGO PONG.png" },
    { name: "Target", path: "/logo/Target logo.png" },
    { name: "UAE Ministry of Interior", path: "/logo/UNITED ARAB EMIRTES MINISTRY OF INTERIOR LOGOI.png" },
    { name: "YES INDIA", path: "/logo/YES INDIA logo.png" },
    { name: "Zublin", path: "/logo/ZUBLIN LOGO UAE.png" },
    { name: "Abu Dhabi Terminals", path: "/logo/abu dhabi terminals logo hd.png" },
    { name: "ADVETI", path: "/logo/abu dhabi vocational education and training institute long hd.png" },
    { name: "ACC Arabian Construction", path: "/logo/acc arabian construction company logo.png" },
    { name: "Al Marwan General Contracting", path: "/logo/al marwan general contracting company sharjah logo.png" },
    { name: "Al Masaood", path: "/logo/al masaood.png" },
    { name: "Altorath", path: "/logo/altorath international engineering consultants LOGO HD.png" },
    { name: "Ansaldo Energia", path: "/logo/ansaldo energia LOGO HD.png" },
    { name: "Arab Tanker Services", path: "/logo/arab tanker services logo uae.png" },
    { name: "Beamtrail", path: "/logo/beamtrail logo.png" },
    { name: "Cleveland Clinic", path: "/logo/cleveland clinic abu dhabi logo hd.png" },
    { name: "Contract Resources", path: "/logo/contract resourses logo.png" },
    { name: "Dar Al Handasah", path: "/logo/dar al handasah nazih taleb paranters logo.png" },
    { name: "DMT", path: "/logo/dmt logo.png" },
    { name: "Emarat Aloula Contracting", path: "/logo/emarat aloula contracting logo.png" },
    { name: "Emirates Link Nitco", path: "/logo/emirates linjk nitco logo.png" },
    { name: "Etihad Airways Engineering", path: "/logo/ethihad aiwAYS ENGINEERING LOGO.png" },
    { name: "Government of Canada", path: "/logo/goverment of canada logo.png" },
    { name: "GSCS", path: "/logo/gscs logo uae.png" },
    { name: "ILF Consulting Engineers", path: "/logo/ilf consulting engineers logo.png" },
    { name: "Initiative Management Consultancy", path: "/logo/initative management consultancy logo.png" },
    { name: "Injaz National", path: "/logo/injaz national general enterprises logo.png" },
    { name: "Inspire Integrated", path: "/logo/inspire integrated LOGO HD.png" },
    { name: "Mais Interior Design", path: "/logo/mais interior design logo uae.png" },
    { name: "Makan Consulting Engineers", path: "/logo/makan consultancing engineers llc.png" },
    { name: "Marriott", path: "/logo/marriott logo.png" },
    { name: "Oceaneering", path: "/logo/oceaneering logo.png" },
    { name: "Polensky & Zoellner", path: "/logo/polensky & zoellner ABU DHABI WLL LOGO.png" },
    { name: "Saber", path: "/logo/saber logo uae.png" },
    { name: "Serco", path: "/logo/serco logo uae.png" },
    { name: "Sharjah Airport", path: "/logo/sharjah airport LOGO HD.png" },
    { name: "Sohar Port", path: "/logo/sohar port free zone LOGO UAE.png" },
    { name: "Specialist Engineering Consultancy", path: "/logo/specialist engineering consultancy logo.png" },
    { name: "St Regis", path: "/logo/st regis abu dhabi LOGO.png" },
    { name: "Tornado Group", path: "/logo/tornado group logo.png" },
    { name: "XYZ Interiors", path: "/logo/xyz interiors LOGO UAE.png" },
    { name: "Yas Marina Circuit", path: "/logo/yas marina circuit.png" },
]

// Split 72 logos into 3 rows of 24
const row1 = logos.slice(0, 24)
const row2 = logos.slice(24, 48)
const row3 = logos.slice(48, 72)

const LogoTrack = ({
    items,
    direction,
    speed,
}: {
    items: typeof logos
    direction: "left" | "right"
    speed: number
}) => {
    const trackRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!trackRef.current) return

        const track = trackRef.current

        const tween = gsap.fromTo(track,
            { xPercent: direction === "left" ? 0 : -50 },
            {
                xPercent: direction === "left" ? -50 : 0,
                duration: speed,
                ease: "none",
                repeat: -1
            }
        )

        const handleEnter = () => tween.pause()
        const handleLeave = () => tween.play()

        track.addEventListener("mouseenter", handleEnter)
        track.addEventListener("mouseleave", handleLeave)

        return () => {
            tween.kill()
            track.removeEventListener("mouseenter", handleEnter)
            track.removeEventListener("mouseleave", handleLeave)
        }
    }, [direction, speed])

    const doubled = [...items, ...items]

    return (
        <div className="relative flex overflow-hidden">
            <div
                ref={trackRef}
                className="flex gap-8 items-center shrink-0 w-max"
            >
                {doubled.map((logo, index) => (
                    <div
                        key={index}
                        className="w-28 md:w-40 h-16 md:h-20 relative grayscale hover:grayscale-0 transition-all duration-500 opacity-40 hover:opacity-100 cursor-pointer flex items-center justify-center p-2 hover:scale-110 active:scale-95 shrink-0"
                    >
                        <Image
                            src={logo.path}
                            alt={logo.name}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 112px, 160px"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

const BrandSlider = () => {
    return (
        <section className="pt-6 pb-6 md:pt-24 md:pb-12 bg-[#fffbf5] font-figtree border-t border-slate-100/50 overflow-hidden relative">
            <div className="container-custom mx-auto px-6 mb-8 sm:mb-12">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                    <div className="space-y-2 sm:space-y-4">
                        <span className="text-[#794d00] font-bold tracking-widest text-[10px] sm:text-xs uppercase flex items-center gap-2">Strategic Partners
                        </span>
                        <h2 className="text-2xl md:text-5xl font-bold text-[#794d00] tracking-tight uppercase max-w-2xl leading-tight">
                            Trusted by <span className="text-slate-900">Industry Leaders.</span>
                        </h2>
                    </div>
                    <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed">
                        Collaborating with world-class organizations to deliver professional excellence and certified training benchmarks across the globe.
                    </p>
                </div>
            </div>

            <div className="max-w-[100vw] relative flex flex-col gap-8">
                {/* Row 1 → Left */}
                <LogoTrack items={row1} direction="left" speed={50} />
                {/* Row 2 → Right (opposite) */}
                <LogoTrack items={row2} direction="right" speed={50} />
                {/* Row 3 → Left */}
                <LogoTrack items={row3} direction="left" speed={50} />

                {/* Edge fades */}
                <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#fffbf5] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[#fffbf5] to-transparent z-10 pointer-events-none" />
            </div>
        </section>
    )
}

export default BrandSlider
