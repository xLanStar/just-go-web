import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const request = axios.create({
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  }
})

export const setAuthToken = (token: string) => {
  request.defaults.headers.Authorization = token;
}

export const removeAuthToken = () => {
  delete request.defaults.headers.Authorization;
}

const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const controller = new AbortController();
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
  return Promise.reject(error);
};

request.interceptors.request.use(requestInterceptor, requestErrorHandler);
request.interceptors.response.use(responseHandler, responseErrorHandler);

export default request;
