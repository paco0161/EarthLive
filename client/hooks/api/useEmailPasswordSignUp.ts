import { signUpNewUser } from "@/lib/api"
import { useMutation } from "@tanstack/react-query"

export const useEmailPasswordSignUp = () => {
  return useMutation({
    mutationFn: signUpNewUser,
  })
}
