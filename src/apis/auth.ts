import axios, { AxiosResponse } from "axios";
import { User } from "../types/userInterface";
import { responseErrorHandler } from "../utils/request";

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
    const response: AxiosResponse = await axios.post("/api/user/login", {
      email, password
    });
  
    const user: User = response.data.data;
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
    const response: AxiosResponse = await axios.post("/api/user/register", {
      name, email, password
    });
  
    const user: User = response.data.data;
    const token: string = response.data.token;
  
    setJwtToken(token);
    saveUser(user);
    
    return user;
  } catch (error: any) {
    return responseErrorHandler(error);
  }
};

export const logout = () => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
}
