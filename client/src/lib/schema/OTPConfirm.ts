import { z } from "zod"

export const OTPConfirmSchema = z
  .string({
    required_error: "OTP code is required"
  })
  .length(6, {
    message: "OTP Code must be equal 6 digits"
  })

export type OTPConfirmSchemaType = z.infer<typeof OTPConfirmSchema>
