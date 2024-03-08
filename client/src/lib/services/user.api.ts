import { RegisterUser } from "../interface/user.interface"
import { post } from "./root.api"

interface firstStepSignUpProps {
  data: RegisterUser
}
export const firstStepSignUp = async ({ data }: firstStepSignUpProps): Promise<{}> => {
  try {
    const response = await post<RegisterUser>(`auth/first-step-registeration`, data)
    if (response.status === 201) {
        return response.data;
    }
  } catch (error) {
    console.log(error)
    throw error
  }
  return {}
}
