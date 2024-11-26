import { Mark } from "../types/googleMapInterface";
import { App } from "antd";
import useAuth from "./useAuth";
import { useAppDispatch, useAppSelector } from "../hooks";
import request from "../utils/request";
import { Attraction } from "../types/tripInterface";
import { setMarkList } from "../store/trip/tripSlice";
import axios from "axios";

const useMarkList = () => {
  const dispatch = useAppDispatch();

  const { message } = App.useApp();

  const { logout } = useAuth();

  const currentAttractions = useAppSelector(
    (state) => state.trip.currentAttractions
  );

  const markList = useAppSelector((state) => state.trip.markList);

  const loadMarkList = async (init: boolean = false) => {
    try {
      let placeIdList: string[] = [];

      if (!init) {
        placeIdList = currentAttractions.map(
          (attraction: Attraction) => attraction.googlePlaceId
        );
      }

      const response = await request.post("/api/places", {
        googlePlaceIdList: placeIdList,
      });

      const newMarkList: Mark[] = response.data.map((place: any) => {
        return {
          name: place.name,
          placeId: place.placeId,
          location: {
            lat: place.location.lat,
            lng: place.location.lng,
          },
        };
      });

      dispatch(setMarkList(newMarkList));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          message.error("請重新登入");
          logout();
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
    markList,
    loadMarkList,
  };
};

export default useMarkList;
