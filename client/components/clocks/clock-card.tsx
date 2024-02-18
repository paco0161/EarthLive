import { toKeyByIndex } from "@/lib/utils"
import { FC } from "react"
import AnalogClock from "./analog-clock"
import Delete from "../ui/delete"
import LocationDescription from "./location-description"

interface ClockProps {
    index: number
    timezone: string
    area: string
}

const ClockCard: FC<ClockProps> = ({
    index, 
    timezone,
    area
}) => {

    return (
        <div className="flex" key={toKeyByIndex("location", index) + timezone}>
            <div key={timezone}>
                <AnalogClock
                key={toKeyByIndex("analogClock", index) + timezone}
                defaultTimeZones={timezone}
                />
                <LocationDescription
                key={toKeyByIndex("description", index) + area}
                timeZone={timezone}
                area={area}/>
            </div>

            <form>
                <Delete />
            </form>
        </div>
    )
}

export default ClockCard