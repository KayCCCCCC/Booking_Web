import { z } from "zod"

export const PhoneSchema = z.object({
  email: z.string().email(),
  phone: z.string().regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits" })
})

export type PhoneSchemaType = z.infer<typeof PhoneSchema>
