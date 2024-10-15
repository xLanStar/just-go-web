import { User } from "./userInterface";

export type ApiResponse<V> = {
  status: "success" | "error";
  data?: V;
  message?: string;
};

export type SigninType = {
  data: User;
  token: string;
};

export type RegisterType = {
  message: string;
};

export type verifyEmailType = {
  message: string;
};

export type UpdateUser = User;

export type GetUserInfo = User;
