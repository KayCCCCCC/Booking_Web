import { z } from "zod"

export const OTPConfirmSchema = z.object({
  email: z.string().email(),
  OTPCode: z
    .string({
      required_error: "OTP code is required"
    })
    .length(6, {
      message: "OTP Code must be equal 6 digits"
    })
})

export type OTPConfirmSchemaType = z.infer<typeof OTPConfirmSchema>
