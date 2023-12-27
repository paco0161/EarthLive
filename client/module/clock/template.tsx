"use client"

import AnalogClock from "@/components/clock/analogClock"
import useGetUserClocks from "@/hooks/api/useGetUserClocks"
import { getClockList } from "@/lib/utils"
import React from "react"


interface ClocksOverviewTemplateProps {
    userUuid: string
}

const ClocksOverviewTemplate: React.FunctionComponent<
  ClocksOverviewTemplateProps
> = ({ userUuid }: { userUuid: string }) => {
    const { isLoading, isError, data, error} = useGetUserClocks(userUuid)
    const clockList = data !== undefined ? data.userClock[0].clocks.map((clock: { time_zone: string }) => clock.time_zone) : []

    return (
        <>
        {isLoading ? <div>isLoading</div>: <div>isNotLoading</div>}
        {isError ? <div>{error.message}</div>: <div>isNotError</div>}

        {!isLoading && (
            <div className="w-full relative text-gray-500 h-full flex justify-evenly items-center text-center">
                {clockList.map((timeZone: string) => {
                    return (
                        <div key={timeZone +1}>
                                <AnalogClock
                                key={timeZone}
                                defaultTimeZones={timeZone}
                                />
                                <div className="relative w-full">Hello</div>
                        </div>
                    )
                })}             
            </div>
        )}
        </>
    )
}

export default ClocksOverviewTemplate