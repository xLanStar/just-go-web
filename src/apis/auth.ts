import axios from "axios";
import { AxiosResponse } from "axios";
import type { LoginFormData } from "../pages/auth/Signin";
import { handleError } from "../utils/handleError";
import { User } from "../types/userInterface";

export const getJwtToken = (): string | null => {
  return localStorage.getItem("jwtToken");
};

export const setJwtToken = (jwt: string): void => {
  localStorage.setItem("jwtToken", jwt);
};

export const getUser = (): User => {
  const user: string | null = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return {
    uuid: "",
    name: "",
    email: "",
  };
};

export const saveUser = (user: User): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const signin = async (form: LoginFormData) => {
  try {
    const response: AxiosResponse = await axios.post("/api/user/login", {
      email: form.email,
      password: form.password,
    });
    return response.data;
  } catch (error) {
    handleError(error, "帳號或密碼錯誤");
  }
};

export const register = async (form: LoginFormData) => {
  try {
    const response: AxiosResponse = await axios.post("/api/user/register", {
      name: form.name,
      email: form.email,
      password: form.password,
    });
    return response.data;
  } catch (error) {
    handleError(error, "帳號已存在");
  }
};

export const logout = () => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
}
