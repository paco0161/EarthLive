import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/type/supabase'
import AccountForm from '@/components/forms/account-form'

export default async function Account() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div className="relative text-gray-500 flex flex-wrap justify-center items-center text-center">
      <AccountForm session={session} />
    </div>
  )
}