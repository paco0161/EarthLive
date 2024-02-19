import AccountForm from '@/components/forms/account-form'
import { supabase } from '@/lib/utils'

export default async function Account() {

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div className="relative text-gray-500 flex flex-wrap justify-center items-center text-center">
      <AccountForm session={session} />
    </div>
  )
}