import { signInUser } from "@/lib/api"
import { useMutation } from "@tanstack/react-query"

export const useEmailPasswordSignIn = () => {
  return useMutation({
    mutationFn: signInUser,
  })
}
