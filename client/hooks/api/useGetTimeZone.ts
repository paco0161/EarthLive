import { getTimeZoneList } from '@/lib/api'
import { QueryKeyString } from '@/lib/type/queryKeyString'
import { useQuery } from '@tanstack/react-query'

const useGetTimeZone = () => {
    return useQuery({
        queryKey: [QueryKeyString.TIMEZONE],
        queryFn: getTimeZoneList,
        refetchOnMount: true,
        refetchOnReconnect: true,
    })
}

export default useGetTimeZone