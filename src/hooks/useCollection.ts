import { App } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Place } from "../types/googleMapInterface";
import request from "../utils/request";
import useAuth from "./useAuth";

const useCollection = () => {
  const [collection, setCollection] = useState<Place[]>([]);

  const { message } = App.useApp();

  const { logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.get("/api/trips/collections");

        const placeIdList = response.data.map((place: any) => place.place_id);
        console.log(placeIdList);

        // 需要把 placeIdList 轉換成 Place[]
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

  const addPlace = async (place: Place) => {
    try {
      await request.post("/api/trips/collections", {
        googlePlaceId: place.placeId,
      });

      setCollection([...collection, place]);
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

  const deletePlace = async (place: Place) => {
    try {
      await request.delete("/api/trips/collections", {
        data: { googlePlaceId: place.placeId },
      });
      const newCollection = collection.filter(
        (place) => place.placeId !== place.placeId
      );
      setCollection(newCollection);
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
  };

  return { collection, addPlace, deletePlace };
};

export default useCollection;
