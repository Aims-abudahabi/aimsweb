"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X, Send } from "lucide-react"

function WhatsAppIcon({ className = "w-7 h-7" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    )
}

export default function WhatsAppChat() {
    const [isOpen, setIsOpen] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false)
    const [currentTime, setCurrentTime] = useState("09:00 AM")

    useEffect(() => {
        // Set local time
        const now = new Date()
        setCurrentTime(now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }))

        // Show tooltip after 3 seconds
        const timer = setTimeout(() => {
            setShowTooltip(true)
        }, 3000)
        return () => clearTimeout(timer)
    }, [])

    const whatsappNumber = "97126724334"
    const message = encodeURIComponent("Hello! I'm interested in training programs at AIMS. Can you help me?")
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

    return (
        <div className="fixed bottom-6 right-6 z-[9999] font-figtree pointer-events-none">

            {/* --- Chat Widget --- */}
            <div className={`
                absolute bottom-20 right-0 w-[320px] max-w-[calc(100vw-48px)]
                bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] 
                border border-slate-100 overflow-hidden transition-all duration-500 transform
                ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto scale-100' : 'opacity-0 translate-y-10 pointer-events-none scale-95'}
            `}>
                {/* Header */}
                <div className="bg-[#075e54] p-6 text-white relative">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center border border-white/30 overflow-hidden">
                                <img src="/images/excellence.png" alt="AIMS Support" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#075e54] rounded-full"></div>
                        </div>
                        <div>
                            <h3 className="font-bold text-base leading-tight">AIMS Support</h3>
                            <p className="text-white/80 text-[12px] font-medium">Typically replies in minutes</p>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 bg-[#f0f2f5] min-h-[140px] relative">
                    <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] relative">
                        <p className="text-[14px] text-slate-700 font-medium leading-relaxed">
                            Hello! 👋 <br />
                            Welcome to AIMS Training Center. How can we help you with your professional journey today?
                        </p>
                        <span className="text-[10px] text-slate-400 absolute bottom-1 right-3">{currentTime}</span>
                    </div>

                    {/* Decorative pattern */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat"></div>
                </div>

                {/* Footer / Action */}
                <div className="p-4 bg-white">
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#25d366] hover:bg-[#128c7e] text-white py-3 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/20 active:scale-[0.98]"
                    >
                        <Send size={16} />
                        Start Chat on WhatsApp
                    </a>
                </div>
            </div>

            {/* --- Floating Button --- */}
            <div className="flex flex-col items-end pointer-events-auto">
                {/* Tooltip bubble */}
                <div className={`
                    mb-4 px-4 py-3 bg-white rounded-2xl rounded-br-none shadow-xl border border-slate-100
                    transition-all duration-500 transform origin-bottom-right
                    ${showTooltip && !isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-4 pointer-events-none'}
                `}>
                    <p className="text-[13px] font-bold text-slate-800 flex items-center gap-2 whitespace-nowrap">
                        Get free consultation
                    </p>
                </div>

                {/* Main Action Button */}
                <div className="flex items-center gap-3">

                    <button
                        onClick={() => {
                            setIsOpen(!isOpen)
                            setShowTooltip(false)
                        }}
                        className={`
                            group w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 transform hover:scale-110 active:scale-90
                            ${isOpen ? 'bg-white text-slate-900 border border-slate-100' : 'bg-[#25d366] text-white'}
                        `}
                    >
                        {isOpen ? (
                            <X size={28} className="animate-in fade-in zoom-in duration-300" />
                        ) : (
                            <div className="relative">
                                <WhatsAppIcon />
                            </div>
                        )}
                    </button>
                </div>
            </div>

        </div>
    )
}
