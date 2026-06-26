"use client"

import { useState, useRef, useEffect } from "react"
import { AlertCircle, Check, ChevronDown, Search } from "lucide-react"
import { useForm } from "react-hook-form"
import _ from "lodash"
import { coursesData } from "@/data/courses"

interface ContactFormProps {
  defaultCourse?: string;
}

type FormValues = {
  name: string;
  contact: string;
  email: string;
  course: string;
};

export default function ContactForm({ defaultCourse }: ContactFormProps) {
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    defaultValues: {
      name: "",
      contact: "",
      email: "",
      course: defaultCourse || ""
    }
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState(defaultCourse || "")
  const dropdownRef = useRef<HTMLDivElement>(null)

  const watchedCourse = watch('course')

  // Group courses by category, applying search filter using lodash
  const filteredCourses = _.filter(Object.values(coursesData), (course) => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const groupedCourses = _.mapValues(
    _.groupBy(filteredCourses, 'category'),
    (courses) => _.uniq(_.map(courses, 'title'))
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        reset();
        setSearchTerm(defaultCourse || "");
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please check your connection.");
    }
  }

  return (
    <section className="relative w-full pt-6 pb-6 md:pt-12 md:pb-12 flex items-center justify-center overflow-hidden font-figtree">
      {/* Background with parallax-like 'fixed' attachment */}
      <div
        className="absolute inset-0 z-0 bg-[url('/contact_hero_bg.png')] bg-cover bg-center bg-no-repeat transform scale-105"
      >
        <div className="absolute inset-0 bg-[#020617]/40 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
      </div>

      {/* Container */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 flex flex-col md:flex-row items-center md:items-end justify-between min-h-[400px] sm:min-h-[500px]">
        
        {/* Form or Success Message container */}
        <div className="w-full max-w-[550px] mb-8 md:mb-0 relative">
          {isSubmitted ? (
            <div className="w-full bg-white/10 backdrop-blur-xl px-10 py-16 rounded-[2.5rem] border border-white/20 shadow-2xl flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center border border-blue-500/30">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <Check className="text-white w-6 h-6" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white">Message Sent!</h2>
                <p className="text-white/60 text-sm">Thank you for reaching out. We'll get back to you soon.</p>
              </div>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-blue-400 font-bold hover:text-blue-300 transition-colors uppercase tracking-widest text-xs"
              >
                Send Another Message
              </button>
            </div>
          ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white/10 backdrop-blur-xl px-6 py-8 sm:px-12 sm:py-14 rounded-[1.5rem] sm:rounded-[2.5rem] border border-white/20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] space-y-5 sm:space-y-8 relative group">
            <div className="space-y-4 sm:space-y-6 relative z-50 transition-all">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[14px] font-medium text-white ml-1">Full Name</label>
                    <input
                      type="text"
                      {...register("name", { required: "Name is required" })}
                      className={`w-full px-5 py-3 sm:py-4 rounded-lg bg-white/[0.03] border ${errors.name ? 'border-red-500/50' : 'border-white/10'} focus:border-blue-500/40 focus:bg-white/[0.05] outline-none transition-all text-white font-normal`}
                    />
                    {errors.name && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[14px] font-medium text-white ml-1">Contact Number</label>
                    <input
                      type="text"
                      {...register("contact", { 
                        required: "Contact number is required",
                        pattern: { value: /^[0-9+\s-]{7,15}$/, message: "Invalid contact number" }
                      })}
                      className={`w-full px-5 py-3 sm:py-4 rounded-lg bg-white/[0.03] border ${errors.contact ? 'border-red-500/50' : 'border-white/10'} focus:border-blue-500/40 focus:bg-white/[0.05] outline-none transition-all text-white font-normal`}
                    />
                    {errors.contact && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.contact.message}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="text-[14px] font-medium text-white ml-1">Email Address</label>
                    <input
                      type="email"
                      {...register("email", { 
                        required: "Email is required",
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" }
                      })}
                      className={`w-full px-5 py-3 sm:py-4 rounded-lg bg-white/[0.03] border ${errors.email ? 'border-red-500/50' : 'border-white/10'} focus:border-blue-500/40 focus:bg-white/[0.05] outline-none transition-all text-white font-normal`}
                    />
                    {errors.email && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.email.message}</p>}
                  </div>
                  <div className="space-y-2 relative" ref={dropdownRef}>
                    <label className="text-[14px] font-medium text-white ml-1">Course Interested</label>
                    <div className="relative group/input">
                      <input
                        type="text"
                        placeholder="Type to search or enter course..."
                        {...register("course", { required: "Please select a course" })}
                        readOnly={!!defaultCourse}
                        onFocus={() => !defaultCourse && setIsDropdownOpen(true)}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSearchTerm(val)
                          setValue('course', val, { shouldValidate: true })
                          setIsDropdownOpen(true)
                        }}
                        className={`w-full px-5 py-3 sm:py-4 pr-12 rounded-lg bg-white/[0.03] border ${errors.course ? 'border-red-500/50' : 'border-white/10'} focus:border-blue-500/40 focus:bg-white/[0.05] outline-none transition-all text-white font-normal ${defaultCourse ? 'opacity-70 cursor-not-allowed' : 'cursor-text'}`}
                      />
                      {!defaultCourse && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-white/40 group-focus-within/input:text-blue-400 transition-colors pointer-events-none">
                          <Search size={18} />
                          <ChevronDown size={18} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </div>
                      )}
                    </div>

                    {/* Custom Searchable Dropdown */}
                    {isDropdownOpen && !defaultCourse && (
                      <div 
                        data-lenis-prevent
                        className="absolute top-[calc(100%+8px)] left-0 w-full z-[100] bg-[#0f172a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl max-h-[280px] overflow-y-auto overscroll-contain scrollbar-thin scrollbar-thumb-white/10 p-2 animate-in fade-in slide-in-from-top-2 duration-200"
                      >
                        {Object.keys(groupedCourses).length > 0 ? (
                          _.sortBy(Object.entries(groupedCourses), ([catA]) => {
                            const priority = [
                              "Engineering and CAD",
                              "Office Administration",
                              "Graphic Design and Animation",
                              "Finance & Accounting",
                              "IT & Networking"
                            ];
                            const idx = priority.indexOf(catA);
                            return idx !== -1 ? idx : priority.length;
                          }).map(([category, titles]) => (
                            <div key={category} className="mb-2 last:mb-0">
                              <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#c8915a] bg-[#794d00]/10 rounded-lg mb-1 sticky top-0 z-10 backdrop-blur-md">
                                {category}
                              </div>
                              <div className="space-y-0.5">
                                {titles.map((title, i) => (
                                  <button
                                    key={i}
                                    type="button"
                                    onClick={() => {
                                      setValue('course', title, { shouldValidate: true })
                                      setSearchTerm(title)
                                      setIsDropdownOpen(false)
                                    }}
                                    className="w-full text-left px-4 py-2.5 rounded-xl text-[13px] text-white/80 hover:text-white hover:bg-white/10 transition-all font-medium flex items-center justify-between group"
                                  >
                                    {title}
                                    <Check size={14} className={`text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity ${watchedCourse === title ? 'opacity-100' : ''}`} />
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-8 text-center space-y-2">
                            <p className="text-[13px] text-white/40 italic">No matching courses found.</p>
                            <p className="text-[11px] text-[#c8915a] font-bold uppercase tracking-widest">You can keep typing your own...</p>
                          </div>
                        )}
                      </div>
                    )}
                    {errors.course && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1 mt-1"><AlertCircle size={10} /> {errors.course.message}</p>}
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-2 text-center relative z-10">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white py-4 sm:py-5 rounded-xl font-bold text-base transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : "Submit Now"}
                </button>
                <p className="text-[13px] font-normal text-white opacity-60 leading-relaxed font-figtree">
                  From zero to job-ready. Apply in 60 seconds.
                </p>
              </div>
            </form>
          )}
        </div>

        {/* Right side Text */}
        <div className="w-full md:w-auto flex flex-col items-end justify-end pb-4 sm:pb-8 md:pb-12 text-right">
          <div className="flex items-center gap-3 md:gap-4 drop-shadow-2xl">
            {/* Text */}
            <h2 className="text-[16px] sm:text-[22px] md:text-[30px] font-bold text-white tracking-tight uppercase leading-none text-right">
              #LEARN FOR YOUR FUTURE.
            </h2>
          </div>
        </div>

      </div>
    </section>
  )
}
