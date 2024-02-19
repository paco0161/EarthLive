"use client"

import useUserStore from "@/hooks/state/user/useUserStore"
import { supabase } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { FunctionComponent, useEffect, useState } from "react"

interface IAuthProviderProps {
    accessToken: string | null
    children: React.ReactNode
}

const AuthProvider: FunctionComponent<IAuthProviderProps> = ({
    accessToken,
    children
}) => {
    const setUserStore = useUserStore((state) => state.setUser)
    const resetUserStore = useUserStore((state) => state.resetUser)
    const [userUuid, setUserUuid] = useState<string | null>(null)
    const user = useUserStore((state) => state)
    const router = useRouter()

    useEffect(() => {
        const {data: {subscription: authListener}} = supabase.auth.onAuthStateChange((event, session) => {
            if (session &&  session.access_token !== accessToken) {
                router.refresh()
            } else if (
                session && session.access_token === accessToken && !user.isSignIn
            ) {
                setUserUuid(session.user.id)
            } else {
                setUserUuid(null)
                resetUserStore()
            }
        })

        return () => authListener.unsubscribe()
    }, [accessToken, router, user.isSignIn])

    useEffect(() => {
        const fetchData = async () => {
            if (!userUuid) {
                resetUserStore()
                return;
            }

            try {
                const {data, error} = await supabase
                .from('profile')
                .select('uuid, username, avatar_url')
                .eq('uuid', userUuid)
                .single()

                if (error) throw error

                setUserStore({
                    uuid: data.uuid,
                    username: data.username,
                    avatar_url: data.avatar_url
                })
            } catch (error) {
                throw error
            }
        }

        fetchData()
    }, [userUuid])

    return <>{children}</>
}

export default AuthProvider