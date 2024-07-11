import { AxiosError } from "axios";
import { SerializedError } from "@reduxjs/toolkit";

export const handleAxiosError = (error: AxiosError, message: string): SerializedError => {
  if (error.response) {
    if (error.response.status === 500) {
      return {
        name: "ServerError",
        message: "系統內部發生錯誤"
      }
    }
    return {
      name: "ResponseError",
      message: message
    }
  } else if (error.request) {
    return {
      name: "NoResponseError",
      message: "系統無回應"
    }
  } else {
    console.error("Error : ", error.message);
    return {
      name: "RequestError",
      message: "系統發生錯誤"
    }
  }
}
