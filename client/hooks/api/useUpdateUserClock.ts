import { updateClockList } from "@/lib/api"
import { useMutation } from '@tanstack/react-query'

export const useDeleteUserClock = () => {
    return useMutation({
        mutationFn: updateClockList,
    })
}