import { create } from "zustand"

interface User {
    username: string | null
    isSignIn: boolean
    uuid: string | null
    avatar_url: string | null
    setUser: ({
        username,
        uuid,
        avatar_url,
    }: {
        username: string | null
        uuid: string
        avatar_url: string | null
    }) => void
    resetUser: () => void
}

const useUserStore = create<User>((set) => ({
    username: null,
    isSignIn: false,
    uuid: null,
    avatar_url: null,
    setUser: ({uuid, username, avatar_url}) =>
        set(() => ({
            uuid,
            username,
            avatar_url,
            isSignIn: true,
    })),
    resetUser: () => {
        set(() => ({
            username: null,
            isSignIn: false,
            uuid: null,
            avatar_url: null,
    }))}
}))

export default useUserStore