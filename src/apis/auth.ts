import { AxiosResponse } from "axios";
import { User } from "../types/userInterface";
import { responseErrorHandler } from "../utils/request";

import { authRequest } from "../utils/request";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

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
    avatar: "",
  };
};

export const saveUser = (user: User): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const signin = async (email: string, password: string) => {
  try {
    const response: AxiosResponse = await authRequest.post("/login", {
      email, password
    });

    const user: User = response.data;
    const token: string = response.data.token;

    setJwtToken(token);
    saveUser(user);

    return user;
  } catch (error: any) {
    return responseErrorHandler(error);
  }
};

export const register = async (name: string, email: string, password: string) => {
  try {
    const response: AxiosResponse = await authRequest.post("/register", {
      name, email, password
    });

    const user: User = response.data;
    const token: string = response.data.token;

    setJwtToken(token);
    saveUser(user);

    return user;
  } catch (error: any) {
    return responseErrorHandler(error);
  }
};

// 客製化Google登入按鈕邏輯
export const useCustomGoogleLogin = () => {

  const navigate = useNavigate();

  return useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        const response: AxiosResponse = await authRequest.post("/customlogin", { code })

        const user: User = response.data;

        setJwtToken(code);
        saveUser(user);

        // Redirect to homepage after successful Google login
        navigate("/", { replace: true });

        console.log(response.data.email, response.data.username); // 在此後端返回的資料是 userInfo
      } catch (error) {
        console.error('Error during login:', error);
      }
    },
    flow: 'auth-code',
  });
};

export const logout = () => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
}
