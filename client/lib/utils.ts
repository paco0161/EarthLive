
import { twMerge } from "tailwind-merge"
import { clsx, type ClassValue } from 'clsx'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "./type/supabase"

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function toKeyByIndex(obj: string, index: number) {
    return obj + "-" + index.toString();
}


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
export const supabase = createClientComponentClient<Database>({
  supabaseUrl,
  supabaseKey,
})
