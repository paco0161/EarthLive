import { FC, useMemo } from 'react'

import useClock from '@/hooks/clock/useClock'

interface LocationDescriptionProps {
  timeZone: string
  area: string
}

const LocationDescription: FC<LocationDescriptionProps> = ({
    timeZone = 'America/Toronto',
    area = 'Toronto, Canada'
}) => {
    const [timing, currentTime, isDaytime] = useClock(timeZone)
    const options: Intl.DateTimeFormatOptions = useMemo(() => ({
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        second:'2-digit',
    }), []);

    return (
        <div className="flex relative w-full flex-wrap items-center justify-center gap-x-40 gap-y-0 mb-10 font-bold text-lg">
            <div className="w-full" suppressHydrationWarning={true}>{new Intl.DateTimeFormat('en-GB', options).format(currentTime)}</div>
            <div className="w-full">{area}</div>
        </div>
    )
}

export default LocationDescription