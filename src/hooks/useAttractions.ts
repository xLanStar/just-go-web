import { App } from "antd";
import useAuth from "./useAuth";
import { Attraction, Day } from "../types/tripInterface";
import request from "../utils/request";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setCurrentAttractions, setCurrentDay } from "../store/trip/tripSlice";
import { Dayjs } from "dayjs";

const useAttrations = (tripId: string, placeId: string) => {
  const dispatch = useAppDispatch();

  const { message } = App.useApp();

  const { logout } = useAuth();

  const currentDay = useAppSelector((state) => state.trip.currentDay);
  const attractions = useAppSelector((state) => state.trip.currentAttractions);

  const loadAttractions = async (dayId: string, startAttractionId: string) => {
    try {
      const response: any = await request.get(
        `/api/trips/${tripId}/plans/${placeId}/days/${dayId}/attractions`
      );
      const attractions = response.data;
      const newAttractions: Attraction[] = [];
      let currentAttractionId = startAttractionId;
      while (currentAttractionId) {
        const newAttraction = attractions.find(
          (attraction: Attraction) => attraction.id === currentAttractionId
        );
        newAttractions.push(newAttraction);
        currentAttractionId = newAttraction.nextAttractionId;
      }

      dispatch(setCurrentAttractions(newAttractions));
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

  const deleteAttraction = async (
    dayId: string,
    attractionId: string,
    preAttractionId: string | null
  ) => {
    try {
      await request.delete(
        `/api/trips/${tripId}/plans/${placeId}/days/${dayId}/attractions/${attractionId}`,
        {
          data: {
            preAttractionId,
          },
        }
      );
      const newAttractions = attractions.filter(
        (attraction) => attraction.id !== attractionId
      );

      if (attractionId === currentDay?.startAttractionId) {
        const newCurrentDay = {
          ...(currentDay as Day),
          startAttractionId: newAttractions[0]?.id as string,
        };
        dispatch(setCurrentDay(newCurrentDay));
      }

      dispatch(setCurrentAttractions(newAttractions));

      message.success("刪除成功");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          message.error("請重新登入");
          logout();
        } else if (error.response?.status === 403) {
          message.error("你沒有權限刪除此景點");
        } else if (error.response?.status === 404) {
          message.error("找不到景點");
        } else {
          message.error("系統發生錯誤");
        }
      } else {
        console.error(error);
        message.error("用戶端發生錯誤");
      }
    }
  };

  const changeAttractionOrder = async (
    dayId: string,
    attractionId: string,
    oldPreAttractionId: string | null,
    newPreAttractionId: string | null
  ) => {
    try {
      await request.patch(
        `/api/trips/${tripId}/plans/${placeId}/days/${dayId}/attractions/${attractionId}/order`,
        {
          oldPreAttractionId,
          newPreAttractionId,
        }
      );
      message.success("修改成功");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          message.error("請重新登入");
          logout();
        } else if (error.response?.status === 403) {
          message.error("你沒有權限變更此景點");
        } else if (error.response?.status === 404) {
          message.error("找不到景點");
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
    attractions,
    loadAttractions,
    deleteAttraction,
    changeAttractionOrder,
  };
};

export default useAttrations;
