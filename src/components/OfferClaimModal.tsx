"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useForm } from "react-hook-form"
import { AnimatePresence, motion } from "framer-motion"
import type { Offer } from "@/data/offer"

interface OfferClaimModalProps {
    offer: Offer | null
    onClose: () => void
}

type OfferFormValues = {
    name: string
    contact: string
    email: string
}

export default function OfferClaimModal({ offer, onClose }: OfferClaimModalProps) {
    const [mounted, setMounted] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [submitError, setSubmitError] = useState("")

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<OfferFormValues>({
        defaultValues: { name: "", contact: "", email: "" },
    })

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!offer) return

        setIsSubmitted(false)
        setSubmitError("")
        reset({ name: "", contact: "", email: "" })

        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        window.__lenis?.stop()

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", onKeyDown)

        return () => {
            document.body.style.overflow = prevOverflow
            window.__lenis?.start()
            window.removeEventListener("keydown", onKeyDown)
        }
    }, [offer, onClose, reset])

    if (!mounted) return null

    const offerLabel = offer
        ? [offer.title, offer.badge ? `(${offer.badge})` : ""].filter(Boolean).join(" ")
        : ""

    const onSubmit = async (data: OfferFormValues) => {
        if (!offer) return
        setSubmitError("")

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: data.name,
                    contact: data.contact,
                    email: data.email,
                    offer: offerLabel,
                    course: offerLabel,
                }),
            })

            const payload = await response.json().catch(() => null)
            if (response.ok) {
                setIsSubmitted(true)
                reset()
            } else {
                setSubmitError(payload?.message || "Failed to submit offer request. Please try again.")
            }
        } catch {
            setSubmitError("Network error. Please check your connection and try again.")
        }
    }

    const inputCls = (hasError: boolean) =>
        `w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-white/[0.04] border ${hasError ? "border-red-500/60" : "border-white/15"
        } focus:border-[#c8915a]/70 focus:bg-white/[0.07] outline-none transition-all text-white text-sm placeholder:text-slate-400/60`

    return createPortal(
        <AnimatePresence>
            {offer && (
                <motion.div
                    key={offer.id || "offer-claim-modal"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[2000] flex items-center justify-center p-3 sm:p-6 bg-[#020617]/80 backdrop-blur-md font-figtree"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="offer-modal-title"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) onClose()
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 12 }}
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                        data-lenis-prevent
                        className="relative w-full max-w-[480px] max-h-[92vh] overflow-x-hidden overflow-y-auto rounded-[20px] sm:rounded-[28px] bg-[#0F172A] border border-slate-800/50 shadow-[0_32px_90px_rgba(0,0,0,0.7)] text-white"
                    >
                        {/* Footer-Matched Ambient Blue Shading */}
                        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
                        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

                        {/* Top Accent Line */}
                        <div className="relative z-10 h-1 w-full bg-gradient-to-r from-[#794d00] via-[#c8915a] to-blue-500" />

                        <div className="relative z-10 p-5 sm:p-8 space-y-5 sm:space-y-6">
                            {/* Header */}
                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#c8915a] block">
                                        {offer.eyebrow || "Special Offer"}
                                    </span>
                                    <h2
                                        id="offer-modal-title"
                                        className="text-lg sm:text-2xl font-black text-white tracking-tight leading-tight uppercase"
                                    >
                                        {offer.ctaText?.trim() || "Claim Offer"}
                                    </h2>
                                </div>

                                <button
                                    type="button"
                                    onClick={onClose}
                                    aria-label="Close popup"
                                    className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
                                >
                                    X
                                </button>
                            </div>

                            {isSubmitted ? (
                                <div className="py-6 sm:py-8 text-center space-y-4">
                                    <span className="inline-block px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] font-extrabold uppercase tracking-[0.18em]">
                                        Offer Claimed
                                    </span>
                                    <div className="space-y-1.5">
                                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                                            Request Received!
                                        </h3>
                                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mx-auto">
                                            Thank you! Our AIMS admissions team has received your request for{" "}
                                            <strong className="text-white">{offerLabel}</strong> and will contact you shortly.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="mt-2 inline-flex items-center justify-center rounded-full bg-white text-slate-950 hover:bg-[#fffbf5] px-7 py-2.5 text-xs font-extrabold uppercase tracking-[0.14em] transition-all cursor-pointer"
                                    >
                                        Done
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    {/* Selected Offer (Prefilled, Non-Editable) */}
                                    <div className="space-y-1.5">
                                        <label
                                            htmlFor="offer-selected"
                                            className="text-xs font-semibold text-slate-300 ml-0.5 block"
                                        >
                                            Selected Offer
                                        </label>
                                        <input
                                            id="offer-selected"
                                            type="text"
                                            value={offerLabel}
                                            readOnly
                                            aria-readonly="true"
                                            tabIndex={-1}
                                            className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-white/[0.08] border border-[#c8915a]/40 text-amber-200 text-sm font-bold outline-none cursor-not-allowed select-none"
                                        />
                                    </div>

                                    {/* Full Name */}
                                    <div className="space-y-1.5">
                                        <label
                                            htmlFor="offer-name"
                                            className="text-xs font-semibold text-slate-200 ml-0.5 block"
                                        >
                                            Full Name
                                        </label>
                                        <input
                                            id="offer-name"
                                            type="text"
                                            placeholder="Enter your full name"
                                            {...register("name", { required: "Full name is required" })}
                                            className={inputCls(Boolean(errors.name))}
                                        />
                                        {errors.name && (
                                            <p className="text-[11px] text-red-400 ml-0.5">
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Mobile Number */}
                                    <div className="space-y-1.5">
                                        <label
                                            htmlFor="offer-contact"
                                            className="text-xs font-semibold text-slate-200 ml-0.5 block"
                                        >
                                            Mobile Number
                                        </label>
                                        <input
                                            id="offer-contact"
                                            type="tel"
                                            placeholder="+971 50 000 0000"
                                            {...register("contact", {
                                                required: "Mobile number is required",
                                                pattern: {
                                                    value: /^[0-9+\s()-]{7,20}$/,
                                                    message: "Please enter a valid mobile number",
                                                },
                                            })}
                                            className={inputCls(Boolean(errors.contact))}
                                        />
                                        {errors.contact && (
                                            <p className="text-[11px] text-red-400 ml-0.5">
                                                {errors.contact.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email Address */}
                                    <div className="space-y-1.5">
                                        <label
                                            htmlFor="offer-email"
                                            className="text-xs font-semibold text-slate-200 ml-0.5 block"
                                        >
                                            Email Address
                                        </label>
                                        <input
                                            id="offer-email"
                                            type="email"
                                            placeholder="you@example.com"
                                            {...register("email", {
                                                required: "Email address is required",
                                                pattern: {
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message: "Please enter a valid email address",
                                                },
                                            })}
                                            className={inputCls(Boolean(errors.email))}
                                        />
                                        {errors.email && (
                                            <p className="text-[11px] text-red-400 ml-0.5">
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </div>

                                    {submitError && (
                                        <p className="text-xs text-red-300 bg-red-500/10 border border-red-500/30 rounded-xl px-3.5 py-2.5">
                                            {submitError}
                                        </p>
                                    )}

                                    <div className="pt-1 space-y-2.5 text-center">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-sm uppercase tracking-[0.12em] transition-all active:scale-[0.99] shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2 cursor-pointer"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Submitting...
                                                </>
                                            ) : (
                                                "Submit"
                                            )}
                                        </button>
                                        <p className="text-[11px] text-slate-400">
                                            Our admissions counselor in AIMS will reach out shortly.
                                        </p>
                                    </div>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    )
}
