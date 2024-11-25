import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import request from "../utils/request";
import { App } from "antd";
import axios from "axios";
import { TripInfo } from "../types/tripInterface";
import useAuth from "./useAuth";

const useTripInfo = (type: string) => {
  const { message } = App.useApp();

  const { logout } = useAuth();

  const [trips, setTrips] = useState<TripInfo[]>([]);
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
            message.error("請重新登入");
            logout();
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
      const response: any = await request.post(`/api/trips/${id}/favor`);
      const isLike = response.isLike;
      trip.like = isLike ? trip.like + 1 : trip.like - 1;
      trip.isLike = isLike;
      setTrips([...trips]);
      message.success(isLike ? "已加入收藏" : "已取消收藏");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          message.error("請重新登入");
          logout();
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
      message.success("刪除成功");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          message.error("請重新登入");
          logout();
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
      message.success("建立成功");
      navigate("/edit");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          message.error("請重新登入");
          logout();
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
