import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head';

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
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className} style={{ position: 'relative', overflowX: 'hidden' }}>
        {children}
      </body>
    </html>
  )
}
