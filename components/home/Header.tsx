'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useContact } from '@/context/ContactContext'
import TopBar from './TopBar'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { openContact } = useContact()

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <header className="fixed top-0 w-full z-50">
      <TopBar />
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center ">
              <Image
                src="/logo/logo.png"
                alt="SS Group Logo"
                width={150}
                height={51}
                className="h-10 sm:h-12 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                link.name === 'Contact' ? (
                  <button
                    key={link.name}
                    onClick={openContact}
                    className="text-sm text-slate-600 hover:text-slate-900 transition font-semibold"
                  >
                    {link.name}
                  </button>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-slate-900 transition font-semibold"
                  >
                    {link.name}
                  </a>
                )
              ))}
            </nav>

            {/* Desktop Action Button */}
            <button
              onClick={openContact}
              className="hidden md:inline-flex px-6 py-2 bg-lime-400 text-black font-bold rounded-lg hover:bg-lime-300 transition shadow-sm hover:shadow"
            >
              Get Free Quote
            </button>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
                className="text-slate-800 hover:text-black transition p-2 border border-slate-200 rounded-lg bg-slate-50 shadow-sm active:scale-95"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0 visible pointer-events-auto' : 'opacity-0 -translate-y-4 invisible pointer-events-none'
            }`}
        >
          <div className="px-6 py-6 space-y-6 flex flex-col bg-white">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                link.name === 'Contact' ? (
                  <button
                    key={link.name}
                    onClick={() => {
                      setIsOpen(false)
                      openContact()
                    }}
                    className="text-lg font-semibold text-slate-800 hover:text-black transition py-2 border-b border-slate-100 text-left"
                  >
                    {link.name}
                  </button>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-semibold text-slate-800 hover:text-black transition py-2 border-b border-slate-100"
                  >
                    {link.name}
                  </a>
                )
              ))}
            </div>

            <button
              onClick={openContact}
              className="w-full text-lg px-8 h-12 bg-lime-400 hover:bg-lime-300 text-black font-bold rounded-lg shadow-md mt-4 active:scale-95 transition-transform inline-flex items-center justify-center"
            >
              Get Stall Quote
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
