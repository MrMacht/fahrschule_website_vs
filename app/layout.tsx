import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  themeColor: '#e91e8c',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'VS-Fahrschule | Deine moderne Fahrschule',
  description:
    'VS-Fahrschule - Dein Weg zum Fuhrerschein. PKW, Motorrad und LKW Fuhrerschein in professioneller Umgebung. Jetzt anmelden!',
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
    <html lang="de">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
