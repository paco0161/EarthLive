import { QueryKeyString } from '@/lib/type/queryKeyString'
import { deleteClockList } from "@/lib/api"
import { useSuspenseQuery } from '@tanstack/react-query'

const useDeleteUserClock = (userUuid: string | null) => {
    return useSuspenseQuery({
        queryKey: [QueryKeyString.USER_CLOCK, {userUuid}],
        queryFn: deleteClockList,
    })
}

export default useDeleteUserClock