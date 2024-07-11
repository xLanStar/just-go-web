import axios, { AxiosResponse } from "axios";
import { User } from "../types/userInterface";
import { saveUser } from "./auth";

export const changeUser = async(uuid: string, name: string, email: string, avatar: File | null) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);

  if (avatar) {
    formData.append("avatar", avatar);
  } else {
    formData.append("avatar", "");
  }

  const response: AxiosResponse = await axios.put(`/api/user/${uuid}`, formData);
  const user: User = response.data.data;
  saveUser(user);
  
  return user;
}
