"use client"

import Loading from "@/app/loading"
import useGetUserClocks from "@/hooks/api/useGetUserClocks"
import React, { Suspense } from "react"
import dynamic from 'next/dynamic'

interface ClocksOverviewTemplateProps {
    userUuid: string
}

const ClocksOverviewTemplate: React.FunctionComponent<
  ClocksOverviewTemplateProps
> = ({ userUuid }: { userUuid: string }) => {
    const { isLoading, isError, data, error} = useGetUserClocks(userUuid)
    const clockList = data !== undefined ? data.userClock[0].clocks : []
    const AnalogClock = dynamic(() => import("@/components/clock/analogClock"))

    return (
        <>
        <Suspense fallback={<h2 className="bg-green-500">🌀 Loading...</h2>}>

            {(
                <div className="w-full relative text-gray-500 h-full flex justify-evenly items-center text-center">
                    {clockList.map((clock: { time_zone: string ; area: string }) => {
                        return (
                            <div key={clock.time_zone}>
                                    <AnalogClock
                                    key={clock.time_zone}
                                    defaultTimeZones={clock.time_zone}
                                    />
                                    {/* <div className="relative w-full">{clock.area}</div> */}
                            </div>
                        )
                    })}             
                </div>
            )}
        </Suspense>
        </>
    )
}

export default ClocksOverviewTemplate