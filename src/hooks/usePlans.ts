import { useEffect, useState } from "react";
import { App } from "antd";
import useAuth from "./useAuth";
import { Plan } from "../types/tripInterface";
import request from "../utils/request";
import axios from "axios";

const usePlans = (tripId: string) => {
  const { message } = App.useApp();

  const { logout } = useAuth();

  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await request.get(`/api/trips/${tripId}/plans`);
        const plans = response.data;
        setPlans(plans);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            message.error("請重新登入");
            logout();
          } else if (error.response?.status === 403) {
            message.error("你沒有權限訪問此行程");
          } else if (error.response?.status === 404) {
            message.error("找不到行程");
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

  return {
    plans,
  };
};

export default usePlans;
