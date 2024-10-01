import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const request = axios.create({
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  }
})

const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const controller = new AbortController();
  const token = localStorage.getItem("jwtToken");
  config.signal = controller.signal;

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

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
