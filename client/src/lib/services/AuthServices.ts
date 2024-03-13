import { z } from "zod"
import { RegisterUser, User } from "../interface/user.interface"
import { post } from "./RootServices"
import { OTPConfirmSchema } from "../schema/OTPConfirm"
import { UpdateInforUserSchemaType } from "../schema/UpdateInfoUser"

interface authResponseProps {
  success: boolean
  message: string
  email?: string
  data?: User | null
  token?: string
}
interface firstStepSignUpProps {
  data: RegisterUser
}
export const firstStepSignUp = async ({ data }: firstStepSignUpProps): Promise<authResponseProps> => {
  try {
    const response = await post<authResponseProps>(`auth/first-step-registeration`, data)
    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    console.log(error)
    throw error
  }
  return { success: false, message: "Error" }
}
interface confirmOTPProps {
  data: z.infer<typeof OTPConfirmSchema>
}
export const confirmOtp = async ({ data }: confirmOTPProps): Promise<authResponseProps> => {
  try {
    const response = await post<authResponseProps>(`auth/submitOTP`, data)
    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    console.log(error)
    throw error
  }
  return { success: false, message: "Error" }
}

interface updateInforProps {
  data: UpdateInforUserSchemaType
}

export const updateInforUser = async ({ data }: updateInforProps): Promise<authResponseProps> => {
  try {
    const response = await post<authResponseProps>(`auth/setInfo`, data)
    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    console.log(error)
    throw error
  }
  return { success: false, message: "Error" }
}
