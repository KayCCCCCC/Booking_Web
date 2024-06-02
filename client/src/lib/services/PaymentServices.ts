import { errorNotify } from "@/components/global/atoms/notify"
import { LOCAL_HOST } from "@/constants/API"
import axios, { AxiosError, AxiosResponse } from "axios"
import { Payment } from "../interface/payment.interface"

const api = axios.create({
  baseURL: LOCAL_HOST,
  headers: {
    "Content-Type": "application/json"
  }
})
interface errorDataProps {
  success?: boolean
  message: string
}
const handleApiError = (error: AxiosError) => {
  const { response } = error
  const dataError = response?.data as errorDataProps
  errorNotify(dataError.message)
  throw error
}

export const get = async <T>(url: string): Promise<AxiosResponse<T>> => {
  try {
    const response = await api.get<T>(url)
    return response
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      handleApiError(error)
    }
    throw error
  }
}

export const post = async <T>(url: string, data?: unknown): Promise<AxiosResponse<T>> => {
  try {
    const response = await api.post<T>(url, data)
    console.log(response)
    return response
  } catch (error) {
    if (error instanceof AxiosError) {
      handleApiError(error)
    }
    throw error
  }
}

interface stripeResponseProps {
  success?: boolean
  message?: string
  publishableKey?: string
  client_secret?: string
  paymentIntentId?: string
  data?: any
}
export const getStripeKey = async (): Promise<stripeResponseProps> => {
  const response = await get<stripeResponseProps>("/payment/config")
  return response.data
}

export const getClientSecret = async (data: Payment): Promise<stripeResponseProps> => {
  const response = await post<stripeResponseProps>("/payment/create-payment-intent", data)
  return response.data
}

export const confirmPayment = async (data: {
  data: { amount: Number; price: Number; name: string; description: string }
}) => {
  const response = await post<stripeResponseProps>("/payment/confirm-payment", data)

  return response.data
}

export const checkSuccessPayment = async (sessionId: string): Promise<stripeResponseProps> => {
  const response = await get<stripeResponseProps>(`/payment/success/${sessionId}`)
  console.log(response);
  
  return response.data
}
