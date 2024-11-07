import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import request from "../utils/request";
import { App } from "antd";
import axios from "axios";
import { TripInfo } from "../types/tripInterface";

const useTripInfo = (type: string) => {
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
            localStorage.removeItem("user");
            localStorage.removeItem("jwtToken");
            navigate("/signin", { replace: true });
          } else if (error.status === 500) {
            message.error("系統發生錯誤");
          }
        }
      }
    };
    fetchData();
  }, [type]);

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
  };

  const createTrip = async (
    name: string,
    image: File | undefined,
    startTime: string,
    endTime: string
  ) => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);

    if (image) {
      formData.append("image", image);
    } else {
      formData.append("image", "");
    }

    try {
      await request.post("/api/trips", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/edit");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          localStorage.removeItem("user");
          localStorage.removeItem("jwtToken");
          navigate("/signin", { replace: true });
        } else if (error.status === 500) {
          message.error("系統發生錯誤");
        }
      } else {
        console.error(error);
      }
    }
  };

  return { trips, favorTrip, deleteTrip, createTrip };
};

export default useTripInfo;