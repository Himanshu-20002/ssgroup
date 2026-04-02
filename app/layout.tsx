import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { ContactProvider } from '@/context/ContactContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'SS Group - Exhibition Stall Fabrication & Design',
  description: 'Premium exhibition stall fabrication, design, installation and on-site support. Transform your brand presence at exhibitions.',
  generator: 'v0.app',
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
