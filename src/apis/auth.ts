import request, { responseErrorHandler } from "../utils/request";
import axios, { AxiosResponse } from "axios";
import { User } from "../types/userInterface";
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
    id: "",
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
    const response: AxiosResponse = await axios.post("/api/auth/login", {
      email, password
    });

    const user: User = response.data.user;
    const token: string = response.data.token;

    setJwtToken(token);
    saveUser(user);

    return user;
  } catch (error: any) {
    return responseErrorHandler(error);
  }
};

export const register = async (name: string, email: string, password: string, isGoogle: boolean) => {
  try {
    const response: AxiosResponse = await axios.post("/api/auth/register", {
      name, email, password, isGoogle
    });

    const user: User = response.data.user;
    const token: string = response.data.token;

    setJwtToken(token);
    saveUser(user);

    return user;
  } catch (error: any) {
    console.error(error);
    return responseErrorHandler(error);
  }
};

// 客製化Google登入按鈕邏輯
export const useCustomGoogleLogin = (isGoogle: boolean) => {

  const navigate = useNavigate();

  return useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        const response: AxiosResponse = await request.post("/api/auth/login", {
          code,
          isGoogle
        });

        const token = response.data.token;
        const user: User = response.data.user;

        setJwtToken(token);
        saveUser(user);

        // Redirect to homepage after successful Google login
        navigate("/", { replace: true });
        console.log(user)
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
