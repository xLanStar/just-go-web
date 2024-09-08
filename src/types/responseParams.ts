import { User } from "./userInterface";

export interface Signin {
  data: User;
  token: string;
}

export type UpdateUser = User;

export type GetUserInfo = User;
