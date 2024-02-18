'use client'
import { useCallback, useEffect, useState } from 'react'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/type/supabase'
import { FormProvider, useForm } from 'react-hook-form'
import { updateProfileFormSchema } from '@/module/auth/validations/update-profile'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Avatar from '@/app/profile/avatar'

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const user = session?.user

  const form = useForm<z.infer<typeof updateProfileFormSchema>>({
    resolver: zodResolver(updateProfileFormSchema),
    defaultValues: {
      email: "",
    },
  })

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, email, avatar_url`)
        .eq('id', user?.id!)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setEmail(data.email)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user profile data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    username,
    avatar_url,
  }: {
    username: string | null
    fullname: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data in updateProfile!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-8 w-full max-w-md">
      <FormProvider {...form}>
      <Avatar
        uid={user?.id!}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url)
          updateProfile({ fullname, username, avatar_url: url })
        }}
      />
      <div className="">
        <label className="" htmlFor="email">Email</label>
        <input className="" id="email" type="text" value={session?.user.email} disabled />
      </div>
      <div className="">
        <label className="" htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          value={fullname || ''}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <label className="" htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ fullname, username, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <form action="/auth/sign-out" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
      </FormProvider>
    </div>
  )
}

