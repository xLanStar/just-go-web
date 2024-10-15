import axios, { AxiosResponse } from "axios";
import { User } from "../types/userInterface";
import {
  ApiResponse,
  RegisterType,
  SigninType,
  verifyEmailType,
} from "../types/responseParams";

export const signin = async (
  email: string,
  password: string
): Promise<ApiResponse<SigninType>> => {
  try {
    const response: AxiosResponse = await axios.post("/api/auth/login", {
      email,
      password,
    });
    const result: SigninType = response.data;
    const data: User = result.data;
    const token: string = result.token;
    return { status: "success", data: { data, token } };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return { status: "error", message: "帳號或密碼錯誤" };
      } else if (error.response?.status === 409) {
        return { status: "error", message: "帳號已存在" };
      } else {
        return { status: "error", message: "系統發生錯誤" };
      }
    } else {
      console.error(error);
      return { status: "error", message: "用戶端發生錯誤" };
    }
  }
};

export const googleSignin = async (
  accessToken: string
): Promise<ApiResponse<SigninType>> => {
  try {
    const response: AxiosResponse = await axios.post("/api/auth/google", {
      token: accessToken,
    });
    const result: SigninType = response.data;
    const data: User = result.data;
    const token: string = result.token;
    return { status: "success", data: { data, token } };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return { status: "error", message: "Google 登入失敗" };
      } else {
        return { status: "error", message: "系統發生錯誤" };
      }
    } else {
      console.error(error);
      return { status: "error", message: "用戶端發生錯誤" };
    }
  }
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<ApiResponse<RegisterType>> => {
  try {
    await axios.post("/api/auth/register", {
      username: name,
      email,
      password,
    });
    return { status: "success", data: { message: "註冊成功" } };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 409) {
        return { status: "error", message: "帳號已存在" };
      } else {
        return { status: "error", message: "系統發生錯誤" };
      }
    } else {
      console.error(error);
      return { status: "error", message: "用戶端發生錯誤" };
    }
  }
};

export const verifyEmail = async (
  token: string
): Promise<ApiResponse<verifyEmailType>> => {
  try {
    await axios.get(`/api/auth/verify/${token}`);
    return { status: "success", data: { message: "驗證成功" } };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return { status: "error", message: "驗證失敗" };
      } else {
        return { status: "error", message: "系統發生錯誤" };
      }
    } else {
      console.error(error);
      return { status: "error", message: "用戶端發生錯誤" };
    }
  }
};

export const logout = () => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
};

export const getJwtToken = () => {
  try {
    return localStorage.getItem("jwtToken");
  } catch (error) {
    console.error(error);
  }
};

export const setJwtToken = (token: string) => {
  try {
    localStorage.setItem("jwtToken", token);
  } catch (error) {
    console.error(error);
  }
};

export const getUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : undefined;
  } catch (error) {
    console.error(error);
  }
};

export const setUser = (user: User) => {
  try {
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error(error);
  }
};
