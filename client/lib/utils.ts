
import { twMerge } from "tailwind-merge"
import { clsx, type ClassValue } from 'clsx'

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getClockList = async () => {
    // Instead of the file system,
    // fetch post data from an external API endpoint
    const res = await fetch('http://127.0.0.1:8000/api/location/');
    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
    return res.json();
}