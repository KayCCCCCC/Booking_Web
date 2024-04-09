import { errorNotify } from "@/components/global/atoms/notify"
import { HOST } from "@/constants/API"
import axios, { AxiosError, AxiosResponse } from "axios"

const api = axios.create({
  baseURL: HOST,
  headers: {
    "Content-Type": "application/json"
  }
})
interface errorDataProps {
  success: boolean
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

export const post = async <T>(url: string, data: unknown): Promise<AxiosResponse<T>> => {
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

export const put = async <T>(url: string, data: unknown): Promise<AxiosResponse<T>> => {
  try {
    const response = await api.put<T>(url, data)
    return response
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      handleApiError(error)
    }
    throw error
  }
}

export const del = async <T>(url: string): Promise<AxiosResponse<T>> => {
  try {
    const response = await api.delete<T>(url)
    return response
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      handleApiError(error)
    }
    throw error
  }
}
