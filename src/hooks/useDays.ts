import { App } from "antd";
import useAuth from "./useAuth";
import { useEffect, useState } from "react";
import { Day } from "../types/tripInterface";
import request from "../utils/request";
import axios from "axios";

const useDays = (tripId: string, planId: string) => {
  const { message } = App.useApp();

  const { logout } = useAuth();

  const [days, setDays] = useState<Day[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await request.get(
          `/api/trips/${tripId}/plans/${planId}/days`
        );
        const days = response.data;

        const newDays = days.sort((a: Day, b: Day) => {
          return a.id < b.id ? -1 : 1;
        });

        setDays(newDays);
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
    days,
  };
};

export default useDays;
