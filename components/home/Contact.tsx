"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, X } from 'lucide-react'
import { useContact } from '@/context/ContactContext'

interface ContactFormData {
  name: string
  email: string
  phone: string
  company: string
  message: string
}

export function Contact() {
  const { isContactOpen, closeContact } = useContact()
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', company: '', message: '' })
      setTimeout(() => {
        setSubmitStatus('idle')
        closeContact()
      }, 2000)
    } catch {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactDetails = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 (0) 9876543210',
      href: 'tel:+919876543210',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@ssgroup.com',
      href: 'mailto:hello@ssgroup.com',
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'Mumbai, India',
      href: '#',
    },
    {
      icon: Clock,
      label: 'Working Hours',
      value: 'Mon - Fri: 9 AM - 6 PM',
      href: '#',
    },
  ]

  return (
    <>
      {/* Modal Overlay */}
      {isContactOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeContact}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )}

      {/* Contact Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={isContactOpen ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-2 sm:inset-4 md:inset-8 lg:inset-12 z-50 max-w-5xl w-full mx-auto max-h-[95vh] overflow-y-auto rounded-xl sm:rounded-2xl md:rounded-3xl ${
          isContactOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="bg-[#11120f] border border-[#bbff1bff]/30 rounded-xl sm:rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-12 relative shadow-2xl">
          <button
            onClick={closeContact}
            className="absolute top-3 right-3 sm:top-6 sm:right-6 p-2 hover:bg-[#bbff1bff]/10 rounded-lg transition-colors z-10"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#bbff1bff]" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {/* Left: Contact Details - Visible on all screens */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isContactOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="order-1"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2">
                GET IN <span className="text-[#bbff1bff]">TOUCH</span>
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-neutral-400 mb-6 sm:mb-8 md:mb-12">
                Have a project in mind? Let's discuss how SS Group can elevate your exhibition presence.
              </p>

              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                {contactDetails.map((detail, idx) => {
                  const Icon = detail.icon
                  return (
                    <motion.a
                      key={idx}
                      href={detail.href}
                      whileHover={{ x: 8 }}
                      className="flex gap-4 group cursor-pointer"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-[#bbff1bff]/10 flex items-center justify-center shrink-0 group-hover:bg-[#bbff1bff] transition-colors">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#bbff1bff] group-hover:text-[#11120f] transition-colors" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-neutral-400 uppercase tracking-wide">{detail.label}</p>
                        <p className="text-base sm:text-lg font-bold text-white group-hover:text-[#bbff1bff] transition-colors">
                          {detail.value}
                        </p>
                      </div>
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isContactOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="order-2"
            >
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                {/* Name */}
                <div>
                  <label className="text-xs sm:text-sm text-neutral-300 uppercase tracking-wide mb-1.5 sm:mb-2 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none focus:border-[#bbff1bff] focus:ring-1 focus:ring-[#bbff1bff] transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs sm:text-sm text-neutral-300 uppercase tracking-wide mb-1.5 sm:mb-2 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none focus:border-[#bbff1bff] focus:ring-1 focus:ring-[#bbff1bff] transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-xs sm:text-sm text-neutral-300 uppercase tracking-wide mb-1.5 sm:mb-2 block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    required
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none focus:border-[#bbff1bff] focus:ring-1 focus:ring-[#bbff1bff] transition-all"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="text-xs sm:text-sm text-neutral-300 uppercase tracking-wide mb-1.5 sm:mb-2 block">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company (optional)"
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none focus:border-[#bbff1bff] focus:ring-1 focus:ring-[#bbff1bff] transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs sm:text-sm text-neutral-300 uppercase tracking-wide mb-1.5 sm:mb-2 block">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    required
                    rows={3}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none focus:border-[#bbff1bff] focus:ring-1 focus:ring-[#bbff1bff] transition-all resize-none"
                  />
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-2.5 sm:p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-xs sm:text-sm">
                    ✓ Message sent successfully! We'll get back to you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-2.5 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs sm:text-sm">
                    ✗ Error sending message. Please try again.
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-[#bbff1bff] text-[#11120f] font-black uppercase tracking-widest rounded-lg hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm mt-4 sm:mt-6"
                >
                  {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
