import type { Metadata } from 'next'
import { bodoni, jost } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'My Clothing Store',
  description: 'Shop the latest tracksuits and clothing.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bodoni.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  )
}