"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, X } from 'lucide-react'
import WhatsAppIcon from '../icons/WhatsAppIcon'
import { useContact } from '@/context/ContactContext'

interface ContactFormData {
  name: string
  email: string
  phone: string
  company: string
  message: string
}

export function Contact() {
  const { isContactOpen, closeContact, initialMessage } = useContact()
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Pre-fill message when modal opens with custom inquiry
  React.useEffect(() => {
    if (isContactOpen && initialMessage) {
      setFormData((prev) => ({ ...prev, message: initialMessage }))
    } else if (!isContactOpen) {
      setFormData((prev) => ({ ...prev, message: '' }))
    }
  }, [isContactOpen, initialMessage])

  // Prevent background scrolling on mobile when modal is active
  React.useEffect(() => {
    if (isContactOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isContactOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || 'a3d7b305-17a8-4600-b164-919cb369a41a',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company || 'Not Specified',
          message: formData.message,
          from_name: 'SS Group Website Enquiry',
          subject: `New Exhibition Stall Enquiry from ${formData.name}`,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', company: '', message: '' })
        setTimeout(() => {
          setSubmitStatus('idle')
          closeContact()
        }, 2200)
      } else {
        setSubmitStatus('error')
        setErrorMessage(result.message || 'Error sending message. Please try again.')
        setTimeout(() => setSubmitStatus('idle'), 5000)
      }
    } catch {
      setSubmitStatus('error')
      setErrorMessage('Network error. Please try again or connect directly on WhatsApp.')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactDetails = [
    {
      icon: Phone,
      label: 'Call Direct',
      value: '+91 96613 78767',
      href: 'tel:+919661378767',
      external: false,
    },
    {
      icon: WhatsAppIcon,
      label: 'WhatsApp',
      value: '+91 96613 78767',
      href: `https://wa.me/919661378767?text=${encodeURIComponent(
        formData.message || 'Hi SS Group, I would like to discuss an exhibition stall project.'
      )}`,
      external: true,
    },
    {
      icon: Mail,
      label: 'Email Enquiries',
      value: 'info@ssgroupexhibition.com',
      href: 'mailto:info@ssgroupexhibition.com',
      external: false,
    },
    {
      icon: MapPin,
      label: 'Headquarters',
      value: 'Delhi NCR & PAN India',
      href: '#',
      external: false,
    },
    {
      icon: Clock,
      label: 'Fabrication & Support',
      value: '24/7 Active On-Site & Studio',
      href: '#',
      external: false,
    },
  ]

  if (!isContactOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
      {/* Modal Overlay with Blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeContact}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm z-0"
      />

      {/* Contact Modal Container - Native bottom-sheet on mobile, centered card on desktop */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.98 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-4xl max-h-[92dvh] sm:max-h-[90vh] bg-[#121310] border border-[#bbff1bff]/25 rounded-t-[1.75rem] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* Mobile Header Bar with Drag Handle & Prominent Close */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-[#121310]/95 backdrop-blur-md border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#bbff1bff] animate-pulse"></span>
            <span className="text-[11px] sm:text-xs font-mono tracking-widest text-[#bbff1bff] uppercase font-bold">
              Instant Stall Enquiry
            </span>
          </div>

          <button
            onClick={closeContact}
            aria-label="Close form"
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#bbff1bff] hover:text-[#11120f] active:scale-95 transition-all text-neutral-300 cursor-pointer"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Scrollable Content Body - completely scrollable with invisible scrollbar */}
        <div className="p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto overscroll-contain no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {/* Quick Mobile Action Bar (Call & WhatsApp 1-tap) */}
          <div className="grid grid-cols-2 gap-2.5 mb-5 md:hidden">
            <a
              href="tel:+919661378767"
              className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold active:bg-white/10 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#bbff1bff]" />
              <span>Call Direct</span>
            </a>
            <a
              href={`https://wa.me/919661378767?text=${encodeURIComponent(
                formData.message || 'Hi SS Group, I would like to discuss an exhibition stall project.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-xs font-bold active:bg-emerald-900/70 transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
            {/* Form Column - Prioritized first on mobile so user fills enquiry immediately */}
            <div className="order-1 md:order-2">
              <div className="mb-4">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">
                  Request 3D Concept <span className="text-[#bbff1bff]">& Quote</span>
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  Fill in your details below for a fast estimate & design concept.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                {/* Name */}
                <div>
                  <label className="text-[11px] sm:text-xs text-neutral-300 uppercase tracking-wider mb-1 block font-semibold">
                    Full Name <span className="text-[#bbff1bff]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    autoComplete="name"
                    required
                    className="w-full px-3.5 py-2.5 sm:py-3 bg-neutral-900/90 border border-neutral-700/80 rounded-xl text-base sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#bbff1bff] focus:ring-1 focus:ring-[#bbff1bff] transition-all"
                  />
                </div>

                {/* Phone & Email side by side on tablets/desktops, stacked on small mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] sm:text-xs text-neutral-300 uppercase tracking-wider mb-1 block font-semibold">
                      Phone / Mobile <span className="text-[#bbff1bff]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      inputMode="tel"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      required
                      className="w-full px-3.5 py-2.5 sm:py-3 bg-neutral-900/90 border border-neutral-700/80 rounded-xl text-base sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#bbff1bff] focus:ring-1 focus:ring-[#bbff1bff] transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] sm:text-xs text-neutral-300 uppercase tracking-wider mb-1 block font-semibold">
                      Email Address <span className="text-[#bbff1bff]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      inputMode="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      required
                      className="w-full px-3.5 py-2.5 sm:py-3 bg-neutral-900/90 border border-neutral-700/80 rounded-xl text-base sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#bbff1bff] focus:ring-1 focus:ring-[#bbff1bff] transition-all"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className="text-[11px] sm:text-xs text-neutral-300 uppercase tracking-wider mb-1 block font-semibold">
                    Company / Brand Name <span className="text-neutral-500 text-[10px] font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    autoComplete="organization"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your brand or organization"
                    className="w-full px-3.5 py-2.5 sm:py-3 bg-neutral-900/90 border border-neutral-700/80 rounded-xl text-base sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#bbff1bff] focus:ring-1 focus:ring-[#bbff1bff] transition-all"
                  />
                </div>

                {/* Message (Pre-filled automatically if clicked from stall solutions) */}
                <div>
                  <label className="text-[11px] sm:text-xs text-neutral-300 uppercase tracking-wider mb-1 block font-semibold">
                    Stall Requirements & Query <span className="text-[#bbff1bff]">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="City, Expo name, Stall dimensions or requirements..."
                    required
                    rows={3}
                    className="w-full px-3.5 py-2.5 sm:py-3 bg-neutral-900/90 border border-neutral-700/80 rounded-xl text-base sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#bbff1bff] focus:ring-1 focus:ring-[#bbff1bff] transition-all resize-none leading-relaxed"
                  />
                </div>

                {/* Submission Feedback */}
                {submitStatus === 'success' && (
                  <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-xs sm:text-sm font-medium">
                    ✓ Enquiry submitted! Our team will contact you shortly.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs sm:text-sm font-medium">
                    ✗ {errorMessage || 'Error sending message. Please try WhatsApp directly.'}
                  </div>
                )}

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 btn-gold-cta uppercase tracking-widest rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm font-black shadow-lg cursor-pointer mt-2"
                >
                  {isSubmitting ? 'Sending Enquiry...' : 'Submit Stall Enquiry'}
                </button>
              </form>
            </div>

            {/* Left Column on Desktop / Bottom on Mobile: Contact Info */}
            <div className="order-2 md:order-1 pt-4 md:pt-0 border-t md:border-t-0 border-neutral-800">
              <h4 className="text-xs sm:text-sm font-mono tracking-widest text-[#bbff1bff] uppercase font-bold mb-2">
                SS Group Exhibition Solutions
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400 mb-5 leading-relaxed">
                Delhi NCR, Mumbai, Bengaluru, Hyderabad & Pan-India Expo Centers.
              </p>

              <div className="space-y-3 sm:space-y-4">
                {contactDetails.slice(0, 3).map((detail, idx) => {
                  const Icon = detail.icon
                  return (
                    <a
                      key={idx}
                      href={detail.href}
                      target={detail.external ? '_blank' : undefined}
                      rel={detail.external ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 transition-all group cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#bbff1bff]/10 flex items-center justify-center shrink-0 group-hover:bg-[#bbff1bff] transition-colors">
                        <Icon className="w-5 h-5 text-[#bbff1bff] group-hover:text-[#11120f] transition-colors" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] text-neutral-400 uppercase tracking-wider">{detail.label}</p>
                        <p className="text-xs sm:text-sm font-bold text-white group-hover:text-[#bbff1bff] transition-colors truncate">
                          {detail.value}
                        </p>
                      </div>
                    </a>
                  )
                })}
              </div>

              {/* Pan-India Trust Footer */}
              <div className="mt-5 p-3.5 rounded-xl bg-neutral-900/60 border border-white/5 text-[11px] text-neutral-400 flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#bbff1bff] shrink-0" />
                <span>24/7 on-site build support across Pragati Maidan, BIEC & BEC.</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
