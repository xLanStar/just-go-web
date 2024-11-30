import { App } from "antd";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import request from "../utils/request";
import useAuth from "./useAuth";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setCurrentAttractions, setCurrentDay, setCurrentDays } from "../store/trip/tripSlice";

const useCollection = () => {
  const dispatch = useAppDispatch();

  const [collection, setCollection] = useState<string[]>([]);

  const { message } = App.useApp();

  const { logout } = useAuth();

  const currentTrip = useAppSelector((state) => state.trip.currentTrip);
  const currentPlan = useAppSelector((state) => state.trip.currentPlan);
  const currentDays = useAppSelector((state) => state.trip.currentDays);
  const currentDay = useAppSelector((state) => state.trip.currentDay);
  const currentAttractions = useAppSelector(
    (state) => state.trip.currentAttractions
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.get("/api/trips/collections");

        const placeIdList = response.data.map(
          (place: any) => place.googlePlaceId
        );

        setCollection(placeIdList);
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

  const addPlace = useCallback(
    async (placeId: string) => {
      try {
        await request.post("/api/trips/collections", {
          googlePlaceId: placeId,
        });

        setCollection((prevCollection) => [...prevCollection, placeId]);
        message.success("收藏成功");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            message.error("請重新登入");
            logout();
          } else if (error.response?.status === 409) {
            message.error("該景點已在收藏中");
          } else {
            message.error("系統發生錯誤");
          }
        } else {
          console.error(error);
          message.error("用戶端發生錯誤");
        }
      }
    },
    [collection]
  );

  const deletePlace = useCallback(
    async (placeId: string) => {
      try {
        await request.delete("/api/trips/collections", {
          data: { googlePlaceId: placeId },
        });

        const newCollection = collection.filter((id) => id !== placeId);
        setCollection(newCollection);

        message.success("刪除成功");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            message.error("請重新登入");
            logout();
          } else if (error.response?.status === 404) {
            message.error("找不到該景點");
          }
        } else {
          console.error(error);
          message.error("用戶端發生錯誤");
        }
      }
    },
    [collection]
  );

  const addPlaceToTrip = useCallback(
    async (placeId: string) => {
      try {
        if (!currentTrip || !currentPlan || !currentDay) {
          message.error("找不到行程的方案和日期");
          return;
        }

        const tripId = currentTrip.id;
        const planId = currentPlan.id;
        const dayId = currentDay.id;

        const preAttraction =
          currentAttractions.length > 0
            ? currentAttractions[currentAttractions.length - 1]
            : null;

        const response = await request.post(
          `/api/trips/${tripId}/plans/${planId}/days/${dayId}/attractions`,
          {
            googlePlaceId: placeId,
            preAttractionId: preAttraction ? preAttraction.id : null,
          }
        );

        const newAttractions = [...currentAttractions, response.data];
        dispatch(setCurrentAttractions(newAttractions));

        // 如果是第一個景點，則更新行程的開始時間
        if (!preAttraction) {
          const newCurrentDay = {
            ...(currentDay as any),
            startAttractionId: response.data.id,
          };

          dispatch(setCurrentDay(newCurrentDay));

          const newDays = currentDays.map((day) => {
            if (day.id === newCurrentDay.id) {
              return newCurrentDay;
            }
            return day;
          });

          dispatch(setCurrentDays(newDays));
        }

        message.success("加入成功");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            message.error("請重新登入");
            logout();
          } else if (error.response?.status === 404) {
            message.error("找不到日程");
          } else {
            message.error("系統發生錯誤");
          }
        } else {
          console.error(error);
          message.error("用戶端發生錯誤");
        }
      }
    },
    [currentTrip, currentPlan, currentDays, currentDay, currentAttractions, dispatch]
  );

  return { collection, addPlace, addPlaceToTrip, deletePlace };
};

export default useCollection;
