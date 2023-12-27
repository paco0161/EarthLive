import { QueryKeyString } from '@/lib/type/queryKeyString'
import { getClockList } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'

const useGetUserClocks = (userUuid: string | null) => {
    return useQuery({
        queryKey: [QueryKeyString.USER_CLOCK],
        queryFn: getClockList,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    })
}

export default useGetUserClocks