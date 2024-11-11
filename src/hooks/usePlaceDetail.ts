import { App } from "antd";
import { useState } from "react";
import request from "../utils/request";
import { Place } from "../types/googleMapInterface";
import axios from "axios";
import useAuth from "./useAuth";

const usePlaceDetail = () => {
  const { message } = App.useApp();
  const { logout } = useAuth();

  const [placeDetail, setPlaceDetail] = useState<Place>({
    name: "",
    placeId: "",
    photo: "",
    rating: undefined,
    address: "",
    phone: undefined,
    website: undefined,
    opening_hours: undefined,
  });

  const getPlaceDetail = async (placeId: string) => {
    try {
      const response = await request.post("/api/places", {
        googlePlaceIdList: [placeId],
      });
      const placeDetail = response.data[0];

      console.log(placeDetail);

      setPlaceDetail(placeDetail);
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

  return { placeDetail, getPlaceDetail };
};

export default usePlaceDetail;
