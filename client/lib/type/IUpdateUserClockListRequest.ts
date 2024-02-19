export interface IUpdateUserClockListRequest {
    clocks: Array<clock>
    userUUID: string
}

interface clock {
    area: string
    timezone: string
}