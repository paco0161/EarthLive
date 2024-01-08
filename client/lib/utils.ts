
import { twMerge } from "tailwind-merge"
import { clsx, type ClassValue } from 'clsx'

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function toKeyByIndex(obj: string, index: number) {
    return obj + "-" + index.toString();
}