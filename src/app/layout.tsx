import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Perfect Apparels',
  description: 'Generated by Perfect Apparels'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en" className='w-[100vw] overflow-x-hidden'>
      <body className={inter.className} style={{ position: 'relative', overflowX: 'hidden' }}>
        {children}
      </body>
    </html>
  )
}
