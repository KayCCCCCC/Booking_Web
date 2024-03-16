import { z } from "zod"
import { RegisterUser, User } from "../interface/user.interface"
import { post } from "./RootServices"
import { OTPConfirmSchema } from "../schema/SignUp/OTPConfirm"
import { UpdateInforUserSchemaType } from "../schema/SignUp/UpdateInfoUser"
import { LoginUserSchemaType } from "../schema/SignIn/LoginUser"
import { GGAccountType } from "../schema/SignUp/GGAcount"

interface authResponseProps {
  success: boolean
  message: string
  data?: User | null
  token?: string
}
interface firstStepSignUpProps {
  data: RegisterUser
}
export const firstStepSignUp = async ({ data }: firstStepSignUpProps): Promise<authResponseProps> => {
  try {
    const response = await post<authResponseProps>(`auth/first-step-registeration`, data)
    return response.data
  } catch (error) {
    throw error
  }
}
interface confirmOTPProps {
  data: z.infer<typeof OTPConfirmSchema>
}
export const confirmOtp = async ({ data }: confirmOTPProps): Promise<authResponseProps> => {
  try {
    const response = await post<authResponseProps>(`auth/submitOTP`, data)
    return response.data
  } catch (error) {
    throw error
  }
}

interface updateInforProps {
  data: UpdateInforUserSchemaType
}

export const updateInforUser = async ({ data }: updateInforProps): Promise<authResponseProps> => {
  try {
    const response = await post<authResponseProps>(`auth/setInfo`, data)
    return response.data
  } catch (error) {
    throw error
  }
}
interface LoginProps {
  data: LoginUserSchemaType
}
export const login = async ({ data }: LoginProps): Promise<authResponseProps> => {
  try {
    const response = await post<authResponseProps>(`auth/login`, data)
    return response.data
  } catch (error) {
    throw error
  }
}
interface LoginWithGGProps {
  data: GGAccountType
}
export const loginWithGG = async ({ data }: LoginWithGGProps): Promise<authResponseProps> => {
  try {
    const response = await post<authResponseProps>(`auth/login-google`, data)
    return response.data
  } catch (error) {
    throw error
  }
}
