import { z } from "zod"
import { authEmailValidationSchema } from "./email"

export const updateProfileFormSchema = z.object({
  email: authEmailValidationSchema,
})