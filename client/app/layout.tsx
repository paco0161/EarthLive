import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Head from 'next/head'
import { webConfig } from '@/config/web'
import NavBar from '@/components/nav-bar'
import APIQueryProvider from '@/components/providers/api-query-provider'
import { Suspense } from 'react'
import Loading from './loading'

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
    <>
      <html lang="en">
        <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        </head>
        <body className="flex flex-col h-screen">
          <APIQueryProvider>
            <NavBar />
              <main className="h-screen w-full">
                {children}
              </main>
          </APIQueryProvider>
        </body>
      </html>
    </>
  )
}
