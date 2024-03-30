import { z } from "zod"

export const RegisterUserSchema = z.object({
  email: z
    .string({
      required_error: "Name is required"
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
    }),
  confirmPassword: z
    .string({
      required_error: "Confirm password is required"
    })
    .min(4, {
      message: "Password must be at least 4 degits"
    }),
  policyAccepted: z.boolean()
})
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Confirm password must be matched with password",
//   path: ["confirmPassword"]
// })

export type RegisterUserSchemaType = z.infer<typeof RegisterUserSchema>
