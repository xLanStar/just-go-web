import { App } from "antd";
import { useEffect } from "react";
import useAuth from "./useAuth";
import axios from "axios";
import request from "../utils/request";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setPlans, setTripInfo } from "../store/trip/tripSlice";
import { Attraction, Day, Plan } from "../types/tripInterface";

const useTrip = (tripId: string) => {
  const { message } = App.useApp();

  const { logout } = useAuth();

  const dispatch = useAppDispatch();
  const tripInfo = useAppSelector((state) => state.trip.tripInfo);
  const plans = useAppSelector((state) => state.trip.plans);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await request.get(`/api/trips/${tripId}/details`);
        const trip = response.data;

        const tripInfo = trip.tripInfo;
        dispatch(setTripInfo(tripInfo));

        // 解析 trip 資訊
        const newPlans = [];
        const temp = trip.planList;

        for (const plan of temp) {
          const newPlan: Plan = {
            id: plan.planId,
            name: plan.planName,
            days: [],
          };

          for (const day of plan.dayList) {
            const newDay: Day = {
              id: day.id,
              planId: day.planId,
              startAttractionId: day.startAttractionId,
              attractions: [],
            };

            newPlan.days.push(newDay);

            let currentAttractionId = day.startAttractionId;

            while (currentAttractionId) {
              const nextAttraction: any = day.attrList.find(
                (attraction: any) => attraction.id === currentAttractionId
              );

              const newAttraction: Attraction = {
                id: nextAttraction.id,
                dayId: nextAttraction.dayId,
                googlePlaceId: nextAttraction.googlePlaceId,
                startAt: nextAttraction.startAt,
                endAt: nextAttraction.endAt,
                note: nextAttraction.note,
              };

              newDay.attractions.push(newAttraction);
              currentAttractionId = nextAttraction.nextAttractionId;
            }
          }

          newPlans.push(newPlan);
        }

        dispatch(setPlans(newPlans));
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

  return { tripInfo, plans };
};

export default useTrip;
