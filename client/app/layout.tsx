import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { webConfig } from '@/config/web'
import NavBar from '@/components/nav-bar'
import APIProvider from '@/components/providers/api'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: webConfig.name,
  description: webConfig.description
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <APIProvider>
          <NavBar />
          <div>{children}</div>
        </APIProvider>
      </body>
    </html>
  )
}
