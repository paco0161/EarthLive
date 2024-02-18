"use client"

import React from "react"
import useGetUserClock from "@/hooks/api/useGetUserClock"
import ClockCard from "@/components/clocks/clock-card"
import useUserStore from "@/hooks/state/user/useUserStore"
import { AddClock } from "@/components/ui/add-clock-button"
import Search from "@/components/ui/search"

interface ClocksOverviewTemplateProps {

}

const ClocksOverviewTemplate: React.FunctionComponent<
  ClocksOverviewTemplateProps
> = () => {
    const userUuid = useUserStore((state) => state.uuid)
    const { data: userClockList, isLoading} = useGetUserClock(userUuid as string)
    return (
        <>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search Time Zones..." />
                <AddClock />
            </div>
            {!isLoading && userClockList && userClockList[0] && 
                (<div className="w-full relative text-gray-500 h-full flex flex-wrap justify-evenly items-center text-center">
                    {userClockList[0]!.clocks instanceof Array && userClockList[0]!.clocks.map((clock, index, ) => (
                        <ClockCard 
                            key={index}
                            index={index}
                            timezone={clock!.time_zone}
                            area={clock!.area}
                        />
                    ))}
                </div>)
            }
        </>
    )
}

export default ClocksOverviewTemplate