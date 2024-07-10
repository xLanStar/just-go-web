import axios, { AxiosResponse } from "axios";
import { ProfileForm } from "../types/formInterface";
import { handleError } from "../utils/handleError";

export const changeUser = async(uuid: string, form: ProfileForm, avatar: File | null) => {
  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("email", form.email);

  if (avatar) {
    formData.append("avatar", avatar);
  } else {
    formData.append("avatar", "");
  }
  
  try {
    const response: AxiosResponse = await axios.put(`/api/user/${uuid}`, formData);
    return response.data;
  } catch (error) {
    handleError(error, "發生錯誤");
  }
}
