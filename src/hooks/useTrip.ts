import { App } from "antd";
import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import axios from "axios";
import request from "../utils/request";

const useTrip = (tripId: string) => {
  const { message } = App.useApp();

  const { logout } = useAuth();

  const [test, setTest] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.get(`/api/trips/${tripId}/details`);
        console.log(response.data);
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
    fetchData();
  }, []);

  return { test };
};

export default useTrip;
