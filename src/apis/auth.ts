import axios, { AxiosResponse } from "axios";
import { User } from "../types/userInterface";
import { Signin } from "../types/responseParams";

export const signin = async (email: string, password: string) => {
  const response: AxiosResponse = await axios.post("/api/auth/login", {
    email, password
  })
  const result: Signin = response.data;

  const user: User = result.data;
  const token: string = result.token;

  return { user, token };
};

export const googleSignin = async (accessToken: string) => {
  const response: AxiosResponse = await axios.post("/api/auth/google", {
    token: accessToken
  })
  const result: Signin = response.data;
  
  const user: User = result.data;
  const token: string = result.token;
  return { user, token };
}

export const register = async (name: string, email: string, password: string) => {
  await axios.post("/api/auth/register", {
    username: name, email, password
  });
};

export const verifyEmail = async (token: string) => {
  await axios.get(`/api/auth/verify/${token}`);
}
