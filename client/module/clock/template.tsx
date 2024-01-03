"use client"

import useGetUserClock from "@/hooks/api/useGetUserClock"
import React, { Suspense } from "react"
import AnalogClock from "@/components/clock/analogClock"
import Description from "@/components/clock/description"
import Delete from "@/components/icons/delete"
import { toKeyByIndex } from "@/lib/utils"

interface ClocksOverviewTemplateProps {
    userUuid: string
}

const ClocksOverviewTemplate: React.FunctionComponent<
  ClocksOverviewTemplateProps
> = ({ userUuid }: { userUuid: string }) => {
    const { data } = useGetUserClock(userUuid)
    const clockList = data !== undefined ? data.userClock[0].clocks : []

    return (
        <>
        <Suspense fallback={<h2 className="bg-green-500">🌀 Loading...</h2>}>
            {(
                <div className="w-full relative text-gray-500 h-full flex flex-wrap justify-evenly items-center text-center">
                    {clockList.map((clock: { time_zone: string ; area: string }, index: number) => {
                        return (
                            <div className="flex" key={toKeyByIndex("location", index) + clock.time_zone}>
                                <div key={clock.time_zone}>
                                    <AnalogClock
                                    key={toKeyByIndex("analogClock", index) + clock.time_zone}
                                    defaultTimeZones={clock.time_zone}
                                    />
                                    <Description
                                    key={toKeyByIndex("description", index) + clock.area}
                                    timeZone={clock.time_zone}
                                    area={clock.area}/>
                                </div>

                                <form>
                                    <Delete />
                                </form>
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