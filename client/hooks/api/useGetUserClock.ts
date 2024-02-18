import { getUserClockList } from '@/lib/api'
import { QueryKeyString } from '@/lib/type/queryKeyString'
import { useQuery } from '@tanstack/react-query'

const useGetUserClock = (userUuid: string) => {
    return useQuery({
        queryKey: [QueryKeyString.USER_CLOCK, {userUuid}],
        queryFn: () => getUserClockList(userUuid),
        refetchOnMount: true,
        refetchOnReconnect: true,
    })
}

export default useGetUserClock