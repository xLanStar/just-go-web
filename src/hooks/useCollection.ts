import { App } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Place } from "../types/googleMapInterface";
import request from "../utils/request";
import useAuth from "./useAuth";

const testCollection: Place[] = [
  { name: "test1", placeId: "placeId1", photo: undefined, rating: 3.9, address: "Test address 1", phone: "0909099099",website: undefined, opening_hours: undefined},
  { name: "test2", placeId: "placeId2", photo: undefined, rating: 2.9, address: "Test address 2", phone: "0909099099",website: undefined, opening_hours: undefined},
  { name: "test3", placeId: "placeId3", photo: undefined, rating: 3.9, address: "Test address 3", phone: "0909099099",website: undefined, opening_hours: undefined}
]

const useCollection = () => {
  const [collection, setCollection] = useState<Place[]>(testCollection);
  
  const { message } = App.useApp();

  const { logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionResponse = await request.get("/api/trips/collections");
        const placeIdList = collectionResponse.data.map(
          (place: any) => place.googlePlaceId
        );

        const placeResponse = await request.post("/api/places", {
          googlePlaceIdList: placeIdList,
        });

        setCollection(placeResponse.data);
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
  };

  const deletePlace = async (place: Place) => {
    try {
      await request.delete("/api/trips/collections", {
        data: { googlePlaceId: place.placeId },
      });
      const newCollection = collection.filter(
        (oldPlace) => oldPlace.placeId !== place.placeId
      );
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
  };

  const addPlaceToTrip = () => {};

  return { collection, addPlace, addPlaceToTrip, deletePlace };
};

export default useCollection;
