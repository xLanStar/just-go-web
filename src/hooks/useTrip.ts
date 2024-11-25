import { App } from "antd";
import { useEffect } from "react";
import useAuth from "./useAuth";
import axios from "axios";
import request from "../utils/request";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setCurrentTrip } from "../store/trip/tripSlice";

const useTrip = (tripId: string) => {
  const { message } = App.useApp();

  const { logout } = useAuth();

  const dispatch = useAppDispatch();

  const currentTrip = useAppSelector((state) => state.trip.currentTrip);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await request.get(`/api/trips/${tripId}/details`);
        const trip = response.data;
        const tripInfo = trip.tripInfo;
        dispatch(setCurrentTrip(tripInfo));
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
    currentTrip,
  };
};

export default useTrip;
