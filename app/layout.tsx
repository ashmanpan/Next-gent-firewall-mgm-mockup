import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cisco Security AI Management Center',
  description: 'Centralized AI-powered monitoring for Cisco FTD/FMC environments with predictive analytics and autonomous operations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
