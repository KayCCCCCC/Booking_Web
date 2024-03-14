import { z } from "zod"

export const UpdateInfoUserSchema = z.object({
  email: z.string().email(),
  name: z
    .string()
    .min(2, { message: "User name must be at least 2 characters" })
    .max(100, { message: "User name must be at most 100 characters" }),
  country: z.string(),
  address: z
    .string()
    .min(3, { message: "Address must be at least 3 characters" })
    .max(255, { message: "Address must be at most 255 characters" }),
  phone: z.string().length(10, { message: "Phone must be equal 10 digits" })
})

export type UpdateInforUserSchemaType = z.infer<typeof UpdateInfoUserSchema>
