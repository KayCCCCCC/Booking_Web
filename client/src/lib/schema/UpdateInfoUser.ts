import { z } from "zod"

export const UpdateInfoUserSchema = z.object({
  email: z.string().email(),
  userName: z
    .string()
    .min(4, { message: "User name must be at least 4 characters" })
    .max(100, { message: "User name must be at most 100 characters" })
    .optional(),
  country: z.string(),
  address: z
    .string()
    .min(10, { message: "Address must be at least 10 characters" })
    .max(255, { message: "Address must be at most 255 characters" })
})

export type UpdateInforUserSchemaType = z.infer<typeof UpdateInfoUserSchema>
