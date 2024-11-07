import axios from "axios";
import { useAppDispatch, useAppSelector } from "../hooks";
import { saveUser } from "../store/user/userSlice";
import request from "../utils/request";
import useAuth from "./useAuth";
import { useLocalStorage } from "./useLocalStorage";
import { useNavigate } from "react-router-dom";
import { App } from "antd";

const useUser = () => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { message } = App.useApp();

  const { logout } = useAuth();
  const { setObjectItem } = useLocalStorage();

  const updateUser = async (name: string, email: string, avatar: File | null) => {
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);

      if (avatar) {
        formData.append("avatar", avatar);
      } else {
        formData.append("avatar", "");
      }

      const response = await request.put(`/api/users/${user.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const newUser = response.data;

      dispatch(saveUser(newUser));
      setObjectItem("user", newUser);
      message.success("更新成功");
      navigate(-1);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          message.error("請重新登入");
          logout();
        } else {
          message.error("系統發生錯誤");
        }
      } else {
        console.error(error);
        message.error("用戶端發生錯誤");
      }
    }
  };

  return { user, updateUser };
};

export default useUser;
