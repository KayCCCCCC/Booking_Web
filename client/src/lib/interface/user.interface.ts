export interface RegisterUser {
  email: string
  password: string
  confirmPassword: string
  policyAccepted: boolean
}

export interface OtpUser {
  otpCode: string
}

export interface CompletedInformationUser {
  userName: string
  country: string
  address: string
}

export interface User extends RegisterUser, OtpUser, CompletedInformationUser {
  typeRegiter: string
  roleId: number
  status: string
}
