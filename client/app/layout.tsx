import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Head from 'next/head'
import { webConfig } from '@/config/web'
import NavBar from '@/components/nav-bar'
import APIQueryProvider from '@/components/providers/api-query-provider'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/type/supabase'
import AuthProvider from '@/components/providers/auth-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: webConfig.name,
  description: webConfig.description
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const accessToken = session?.access_token || null

  return (
    <>
      <html lang="en">
        <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        </head>
        <body className="flex flex-col h-screen">
          <APIQueryProvider>
            <AuthProvider accessToken={accessToken}>
              <NavBar />
                <main className="h-screen w-full">
                  {children}
                </main>
            </AuthProvider>
          </APIQueryProvider>
        </body>
      </html>
    </>
  )
}
