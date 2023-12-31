import './globals.css'
import type { Metadata } from 'next'
import {  Montserrat, Fuggles } from 'next/font/google'


const montserrat = Montserrat({subsets: ['latin']})
const fuggles = Fuggles({subsets: ["latin"], weight: ['400'], variable: "--fuggles"})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className={`${montserrat.className} ${fuggles.variable} bg-mainbg min-h-screen`}>
          {children}
        </div>
      </body>
    </html>
  )
}
