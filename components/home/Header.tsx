'use client'

import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useContact } from '@/context/ContactContext'

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
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-black">SS</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              SS Group
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.name === 'Contact' ? (
                <button
                  key={link.name}
                  onClick={openContact}
                  className="text-sm text-muted-foreground hover:text-foreground transition font-medium"
                >
                  {link.name}
                </button>
              ) : (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-sm text-muted-foreground hover:text-foreground transition font-medium"
                >
                  {link.name}
                </a>
              )
            ))}
          </nav>

          {/* Desktop Action Button */}
          <button 
            onClick={openContact}
            className="hidden md:inline-flex px-6 py-2 bg-lime-400 text-black font-bold rounded-lg hover:bg-lime-300 transition shadow-lg"
          >
            Get Free Quote
          </button>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
              className="text-foreground hover:text-primary transition p-2 border border-border/50 rounded-lg bg-card shadow-sm active:scale-95"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-background border-b border-border shadow-2xl transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0 visible pointer-events-auto' : 'opacity-0 -translate-y-4 invisible pointer-events-none'
        }`}
      >
        <div className="px-6 py-6 space-y-6 flex flex-col bg-card/95 backdrop-blur-2xl">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              link.name === 'Contact' ? (
                <button
                  key={link.name}
                  onClick={() => {
                    setIsOpen(false)
                    openContact()
                  }}
                  className="text-lg font-semibold text-foreground hover:text-primary transition py-2 border-b border-border/40"
                >
                  {link.name}
                </button>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-semibold text-foreground hover:text-primary transition py-2 border-b border-border/40"
                >
                  {link.name}
                </a>
              )
            ))}
          </div>
          
          <Button 
            onClick={openContact}
            className="w-full text-lg px-8 h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-black rounded-lg shadow-lg shadow-primary/20 mt-4 active:scale-95 transition-transform"
          >
            Get Stall Quote
          </Button>
        </div>
      </div>
    </header>
  )
}
