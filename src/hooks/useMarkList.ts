import { useEffect, useState } from "react";
import { Mark } from "../types/googleMapInterface";
import { App } from "antd";
import useAuth from "./useAuth";
import { useAppSelector } from "../hooks";
import request from "../utils/request";
import { Attraction } from "../types/tripInterface";

const useMarkList = () => {
  const { message } = App.useApp();

  const { logout } = useAuth();

  const currentAttractions = useAppSelector(
    (state) => state.trip.currentAttractions
  );

  const [markList, setMarkList] = useState<Mark[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const placeIdList = currentAttractions.map(
          (attraction: Attraction) => attraction.googlePlaceId
        );

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

        setMarkList(newMarkList);
      } catch (error) {
        console.error(error);
        message.error("系統發生錯誤");
      }
    };
    fetchData();
  }, [currentAttractions]);

  return {
    markList,
  };
};

export default useMarkList;
