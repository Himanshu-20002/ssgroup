import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { ContactProvider } from '@/context/ContactContext'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ssgroupexhibition.com'),
  title: 'SS Group - Premium Exhibition Stall Fabrication & Design',
  description: 'Elevate your brand with SS Group. We specialize in world-class exhibition stall fabrication, custom design, installation, and on-site support across Delhi NCR & PAN India.',
  keywords: ['exhibition stall', 'stall design', 'fabrication', 'trade show booth', 'event management', 'SS Group', 'Delhi NCR stall fabricator'],
  openGraph: {
    title: 'SS Group - Premium Exhibition Stall Fabrication & Design',
    description: 'Elevate your brand with SS Group. World-class exhibition stall fabrication, custom designs, and 24/7 on-site support.',
    type: 'website',
    url: 'https://www.ssgroupexhibition.com',
    siteName: 'SS Group Exhibition',
    images: [
      {
        url: '/icons/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SS Group Exhibition Stall Fabrication',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SS Group - Premium Exhibition Stall Fabrication & Design',
    description: 'Elevate your brand with SS Group. World-class exhibition stall fabrication, custom designs, and 24/7 on-site support.',
    images: ['/icons/og-image.png'],
  },
  icons: {
    icon: [
      {
        url: '/icons/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icons/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icons/icon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/logo/white-logo.png',
      },
    ],
    shortcut: '/icons/favicon.ico',
    apple: '/icons/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ContactProvider>
          {children}
          <Analytics />
        </ContactProvider>
      </body>
    </html>
  )
}
