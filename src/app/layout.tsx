import type { Metadata } from 'next'
import { bodoni, jost, msMadi } from './fonts'
import './globals.css'
import Navbar from '@/components/Navbar/page'
import Footer from '@/components/Footer/page'
import Providers from '@/components/Providers' // 👈 1. Import it

export const metadata: Metadata = {
  title: 'Before Fame',
  description: 'Freestyle thinking.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bodoni.variable} ${jost.variable} ${msMadi.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-black">
        
        <Providers> {/* 👈 2. Wrap everything inside here */}
          
          <div className="bg-black flex justify-center items-center py-2">
            <span className="uppercase text-white text-[9px] sm:text-[10px] tracking-[1.5px] text-center">
              free shipping for nigeria orders above $100
            </span>
          </div>

          <Navbar />
          
          <main className="flex-1">
            {children}
          </main>
          
          <Footer />
          
        </Providers>

      </body>
    </html>
  )
}