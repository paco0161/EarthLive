import { QueryKeyString } from '@/lib/type/queryKeyString'
import { getClockList } from "@/lib/api"
import { useSuspenseQuery } from '@tanstack/react-query'

const useGetUserClock = (userUuid: string | null) => {
    return useSuspenseQuery({
        queryKey: [QueryKeyString.USER_CLOCK],
        queryFn: getClockList,
        refetchOnMount: true,
        refetchOnReconnect: true,
    })
}

export default useGetUserClock