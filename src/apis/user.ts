import { User } from "../types/userInterface";
import request from "../utils/request";
import { saveUser } from "./auth";

interface UserResponse {
  data: User
}

export const changeUser = async(id: string, name: string, email: string, avatar: File | null) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);

  if (avatar) {
    formData.append("avatar", avatar);
  } else {
    formData.append("avatar", "");
  }

  const response: UserResponse = await request.put(`/api/users/${id}`, formData);
  const user: User = response.data;
  saveUser(user);

  return user;
}

export const getUserInfo = async(id: string) => {
  const response: UserResponse = await request.get(`/api/users/${id}`);
  const user: User = response.data;
  return user;
}
