import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getJwtToken } from "../apis/auth";

const request = axios.create({
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  }
})

export const authRequest = axios.create({
  baseURL: "http://localhost:80/api/auth",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  }
})

const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const controller = new AbortController();
  const token = getJwtToken();

  if (token) {
    config.headers.Authorization = token;
  }

  config.signal = controller.signal;

  if (!config.headers?.["Authorization"]) {
    controller.abort();
  }
  return config;
}

const requestErrorHandler = (error: AxiosError) => {
  console.error("Request Error : ", error);
  return Promise.reject(error);
};

const responseHandler = (response: AxiosResponse) => {
  return response.data;
};

export const responseErrorHandler = (error: AxiosError) => {
  console.error("Response Error : ", error);

  if (error.response) {
    if (error.response.status === 500) {
      return Promise.reject({
        name: "ServerError",
        message: "系統內部發生錯誤"
      })
    }
    return Promise.reject({
      name: "ResponseError",
      message: "ResponseError"
    })
  } else if (error.request) {
    return Promise.reject({
      name: "NoResponseError",
      message: "系統無回應"
    })
  } else {
    return Promise.reject({
      name: "RequestError",
      message: "系統發生錯誤"
    });
  }
};

request.interceptors.request.use(requestInterceptor, requestErrorHandler);
request.interceptors.response.use(responseHandler, responseErrorHandler);

export default request;
