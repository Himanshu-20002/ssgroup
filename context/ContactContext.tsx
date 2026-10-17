'use client'

import React, { createContext, useContext, useState } from 'react'

interface ContactContextType {
  isContactOpen: boolean
  initialMessage?: string
  openContact: (message?: string | React.MouseEvent | unknown) => void
  closeContact: () => void
}

const ContactContext = createContext<ContactContextType | undefined>(undefined)

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [initialMessage, setInitialMessage] = useState('')

  const openContact = (message?: string | React.MouseEvent | unknown) => {
    setInitialMessage(typeof message === 'string' ? message : '')
    setIsContactOpen(true)
  }

  const closeContact = () => {
    setIsContactOpen(false)
    setInitialMessage('')
  }

  return (
    <ContactContext.Provider value={{ isContactOpen, initialMessage, openContact, closeContact }}>
      {children}
    </ContactContext.Provider>
  )
}

export function useContact() {
  const context = useContext(ContactContext)
  if (!context) {
    throw new Error('useContact must be used within ContactProvider')
  }
  return context
}

