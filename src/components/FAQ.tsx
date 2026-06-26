"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

const faqs = [
    {
        question: "Is AIMS Training Center ACTVET Licensed?",
        answer: "Yes, AIMS Training Center is fully licensed by the Abu Dhabi Centre for Technical and Vocational Education and Training (ACTVET). This licensure ensures that our programs meet the highest quality standards for technical and vocational education in the UAE, providing our students with credible, government-recognized certifications."
    },
    {
        question: "Will I get a certificate after completing the course?",
        answer: "Yes, you will receive an industry-recognized certificate from AIMS Training Center upon successful completion of your course and any associated assessments."
    },
    {
        question: "Do you provide job placement support?",
        answer: "Absolutely. We have a dedicated career support team that helps with resume building, interview preparation, and connecting you with our network of industry partners in the UAE."
    },
    {
        question: "Can I pay in installments?",
        answer: "Yes, we offer flexible payment plans for most of our professional courses to make quality education more accessible to everyone."
    },
    {
        question: "I'm working / studying. Can I still join?",
        answer: "Yes! We offer flexible schedules including evening and weekend batches specifically designed for working professionals and students."
    }
]

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <section className="pt-6 pb-6 md:pt-12 md:pb-12 bg-[#fffbf5] font-figtree">
            <div className="container-custom mx-auto px-6 max-w-4xl">
                <div className="text-center mb-8 md:mb-12 space-y-4">
                    <h2 className="text-2xl md:text-4xl font-bold text-[#794d00] tracking-tight uppercase">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-5 sm:px-8 py-4 sm:py-6 flex items-center justify-between text-left hover:bg-blue-50 transition-colors group"
                            >
                                <span className={`text-base sm:text-lg font-bold transition-colors ${openIndex === index ? "text-[#794d00]" : "text-slate-800"}`}>
                                    {faq.question}
                                </span>
                                <div className={`transition-transform duration-300 shrink-0 ${openIndex === index ? "rotate-180" : ""}`}>
                                    {openIndex === index ? (
                                        <Minus className="text-blue-600" size={18} />
                                    ) : (
                                        <Plus className="text-slate-400 group-hover:text-blue-600" size={18} />
                                    )}
                                </div>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? "max-h-[500px] opacity-100 border-t border-blue-50" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div className="px-5 sm:px-8 py-4 sm:py-6 text-slate-600 leading-relaxed font-medium text-[14px] sm:text-base">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
