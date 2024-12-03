import { useNavigate } from "react-router-dom";
import axios from "axios";
import { App } from "antd";
import { useAppDispatch } from "../hooks";
import { saveUser } from "../store/user/userSlice";
import { useLocalStorage } from "./useLocalStorage";

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { message } = App.useApp();

  const { setItem, setObjectItem, removeItem } = useLocalStorage();

  const signin = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://voidcloud.net/api/auth/login", {
        email,
        password,
      });
      const resultData = response.data;
      const user = resultData.data;
      const token = resultData.token;

      setItem("jwtToken", token);
      setObjectItem("user", user);
      dispatch(saveUser(user));

      message.success("登入成功");
      navigate("/", { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          message.error("帳號或密碼錯誤");
        } else if (error.response?.status === 409) {
          message.error("帳號已存在");
        } else {
          message.error("系統發生錯誤");
        }
      } else {
        console.error(error);
        message.error("用戶端發生錯誤");
      }
    }
  };

  const googleSignin = async (accessToken: string) => {
    try {
      const response = await axios.post(
        "http://voidcloud.net/api/auth/google",
        {
          token: accessToken,
        }
      );
      const resultData = response.data;
      const user = resultData.data;
      const token = resultData.token;

      setItem("jwtToken", token);
      setObjectItem("user", user);
      dispatch(saveUser(user));

      message.success("登入成功");
      navigate("/", { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          message.error("Google 登入失敗");
        } else {
          message.error("系統發生錯誤");
        }
      } else {
        console.error(error);
        message.error("用戶端發生錯誤");
      }
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      await axios.post("http://voidcloud.net/api/auth/register", {
        username: name,
        email,
        password,
      });

      message.success("註冊成功");
      navigate("/verify-notice");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          message.error("帳號已存在");
        } else {
          message.error("系統發生錯誤");
        }
      } else {
        console.error(error);
        message.error("用戶端發生錯誤");
      }
    }
  };

  const logout = () => {
    removeItem("user");
    removeItem("jwtToken");
    navigate("/signin", { replace: true });
  };

  return { signin, googleSignin, register, logout };
};

export default useAuth;
