import { useEffect, useState } from "react";
import { App } from "antd";
import useAuth from "./useAuth";
import { Plan } from "../types/tripInterface";
import request from "../utils/request";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setCurrentPlan } from "../store/trip/tripSlice";

const usePlans = (tripId: string) => {
  const dispatch = useAppDispatch();

  const { message } = App.useApp();

  const { logout } = useAuth();

  const currentPlan = useAppSelector((state) => state.trip.currentPlan);

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

  const changePlanName = async (planId: string, name: string) => {
    try {
      await request.patch(`/api/trips/${tripId}/plans/${planId}/name`, {
        name,
      });
      const newPlans = plans.map((plan) => {
        if (plan.id === planId) {
          return { ...plan, name };
        }
        return plan;
      });
      setPlans(newPlans);
      const newCurrentPlan = { ...currentPlan, name } as Plan;
      dispatch(setCurrentPlan(newCurrentPlan));
      message.success("修改成功");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          message.error("請重新登入");
          logout();
        } else if (error.response?.status === 403) {
          message.error("你沒有權限訪問此方案");
        } else if (error.response?.status === 404) {
          message.error("找不到方案");
        } else {
          message.error("系統發生錯誤");
        }
      } else {
        console.error(error);
        message.error("用戶端發生錯誤");
      }
    }
  };

  return {
    plans,
    changePlanName,
  };
};

export default usePlans;
