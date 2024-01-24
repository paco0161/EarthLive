'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/utils'

export default function AuthForm() {
  return (
    <Auth
    supabaseClient={supabase}
    appearance={{ theme: ThemeSupa }}
    providers={[]}
    view="sign_in"
  />
    // <Auth
    //   supabaseClient={supabase}
    //   view="magic_link"
    //   appearance={{ theme: ThemeSupa }}
    //   theme="dark"
    //   showLinks={false}
    //   providers={[]}
    //   redirectTo="http://localhost:3000/auth/callback"
    // />
  )
}