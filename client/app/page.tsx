import AnalogClock from '@/components/clock/analogClock'
import { cn, getClockList } from '@/lib/utils'
import ClocksOverviewTemplate from '@/module/clock/template'
import * as homeStyles from '@/styles/Home.module.css'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="h-[calc(100vh-120px)] w-full">
      <ClocksOverviewTemplate userUuid={''}/>
    </main>
  )
}
