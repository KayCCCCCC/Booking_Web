export interface RegisterUser {
  email: string
  password: string
  confirmPassword: string
  policyAccepted: boolean
}

export interface OtpUser {
  email: string
  otpCode: string
}

export interface CompletedInformationUser {
  email: string
  userName: string
  country: string
  address: string
  phone: string
}

export interface User extends RegisterUser, Omit<OtpUser, "email">, Omit<CompletedInformationUser, "email"> {
  typeRegister: string
  roleId: number
  status: string
  avatar: string
  name: string
}
