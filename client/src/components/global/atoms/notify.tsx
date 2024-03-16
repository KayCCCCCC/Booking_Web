// This file is used for notifications
// Example syntax: successNotify("content")

import { Bounce, toast, ToastOptions, ToastPosition } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const notificationOptions: ToastOptions = {
  position: "top-right" as ToastPosition,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce
}

export const infoNotify = (content: string) => {
  toast.info(content, notificationOptions)
}

export const successNotify = (content: string) => {
  toast.success(content, notificationOptions)
}

export const warnNotify = (content: string) => {
  toast.warn(content, notificationOptions)
}

export const errorNotify = (content: string) => {
  toast.error(content, notificationOptions)
}
