import { z } from "zod"

export const authEmailValidationSchema = z.string().email("This is not an email format!")