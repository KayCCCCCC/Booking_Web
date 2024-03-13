import { z } from "zod"

export const registerUserSchema = z
  .object({
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
      .min(8, {
        message: "Password must be at least 8 degits"
      }),
    confirmPassword: z
      .string({
        required_error: "Confirm password is required"
      })
      .min(8, {
        message: "Password must be at least 8 degits"
      }),
    policyAccepted: z.boolean()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password must be matched with password",
    path: ["confirmPassword"]
  })

// export type registerUserSchemaType = z.infer<typeof registerUserSchema>
