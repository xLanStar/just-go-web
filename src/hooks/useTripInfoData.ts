import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import request from "../utils/request";
import { App } from "antd";
import axios from "axios";
import { TripInfo } from "../types/tripInterface";

/**
 * Custom hook to manage trip information data.
 *
 * @param {string} type - The type of trips to fetch.
 * @returns {Object} - An object containing trips data and functions to favor and delete trips.
 * @returns {TripInfo[]} trips - The list of trips.
 * @returns {Function} favorTrip - Function to favor/unfavor a trip.
 * @returns {Function} deleteTrip - Function to delete a trip.
 *
 * @example
 * const { trips, favorTrip, deleteTrip } = useTripInfoData("own");
 *
 * @remarks
 * This hook fetches trip data based on the user ID and trip type. It also provides
 * functionality to favor/unfavor and delete trips. If the user is not authenticated,
 * it redirects to the sign-in page.
 */
const useTripInfoData = (type: string) => {
  const [trips, setTrips] = useState<TripInfo[]>([]);
  const { message } = App.useApp();
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        switch (type) {
          case "own":
          case "coEdit":
          case "keep":
            response = await request.get(`/api/users/${user.id}/trips/${type}`);
            setTrips(response.data);
            break;
          case "public":
            response = await request.get(`/api/trips`);
            setTrips(response.data);
            break;
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.status === 401) {
            navigate("/signin", { replace: true });
          } else if (error.status === 500) {
            message.error("系統發生錯誤");
          }
        }
      }
    };
    console.log("fetchData");
    fetchData();
  }, []);

  const favorTrip = async (id: string) => {
    const trip = trips.find((trip) => trip.id === id);

    if (trip === undefined) {
      message.error("找不到該行程");
      return;
    }

    try {
      const response = await request.put(`/api/trips/${id}/favor`);
      const isLike = response.data;
      trip.like = isLike ? trip.like + 1 : trip.like - 1;
      trip.isLike = isLike;
      setTrips([...trips]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          navigate("/signin", { replace: true });
        } else if (error.status === 500) {
          message.error("系統發生錯誤");
        }
      }
    }    
  };

  const deleteTrip = async (id: string) => {
    try {
      await request.delete(`/api/trips/${id}`);
      setTrips(trips.filter((trip) => trip.id !== id));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          navigate("/signin", { replace: true });
        } else if (error.status === 500) {
          message.error("系統發生錯誤");
        }
      }
    }
  }

  return { trips, favorTrip, deleteTrip };
};

export default useTripInfoData;
