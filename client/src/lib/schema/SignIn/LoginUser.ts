import { z } from "zod"

export const LoginUserSchema = z.object({
  email: z
    .string({
      required_error: "Email is required"
    })
    .email({
      message: "Must be a valid email with @gmail.com or @..."
    }),
  password: z
    .string({
      required_error: "Password is required"
    })
    .min(4, {
      message: "Password must be at least 4 degits"
    })
})
export type LoginUserSchemaType = z.infer<typeof LoginUserSchema>
