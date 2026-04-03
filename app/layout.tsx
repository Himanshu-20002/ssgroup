import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { ContactProvider } from '@/context/ContactContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'SS Group - Premium Exhibition Stall Fabrication & Design',
  description: 'Elevate your brand with SS Group. We specialize in world-class exhibition stall fabrication, custom design, installation, and on-site support.',
  keywords: ['exhibition stall', 'stall design', 'fabrication', 'trade show booth', 'event management', 'SS Group'],
  openGraph: {
    title: 'SS Group - Exhibition Stall Fabrication',
    description: 'World-class exhibition stall fabrication combining precision, aesthetics, and structural integrity.',
    type: 'website',
    url: 'https://ssgroup.com',
    siteName: 'SS Group Events',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
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
