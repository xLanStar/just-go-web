import { AxiosResponse } from "axios";
import request from "../utils/request";
import { User } from "../types/userInterface";
import { GetUserInfo, UpdateUser } from "../types/responseParams";

export const updateUser = async (
  name: string,
  email: string,
  avatar: File | null
) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);

  if (avatar) {
    formData.append("avatar", avatar);
  } else {
    formData.append("avatar", "");
  }

  const response: AxiosResponse<UpdateUser> = await request.put(
    `/api/users/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  const user: User = response.data;

  return user;
};

export const getUserInfo = async (id: string) => {
  const response: AxiosResponse<GetUserInfo> = await request.get(
    `/api/users/${id}`
  );
  const user: User = response.data;

  return user;
};
