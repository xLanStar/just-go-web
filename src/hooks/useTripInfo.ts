import { useState, useEffect } from "react";
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
      const response = await request.post("/api/trips", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("建立成功");
      return response.data.tripInfo;
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

  const updateTripInfo = async (
    tripId: string,
    name: string,
    image: File | undefined,
    description: string,
    labels: string[]
  ) => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("labels", labels.join(","));

    if (description) {
      formData.append("description", description);
    } else {
      formData.append("description", "");
    }

    if (image) {
      formData.append("image", image);
    } else {
      formData.append("image", "");
    }

    try {
      const response = await request.put(`/api/trips/${tripId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("修改成功");
      return response.data.tripInfo;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          message.error("請重新登入");
          logout();
        } else if (error.status === 403) {
          message.error("你沒有權限修改此行程");
        } else if (error.status === 404) {
          message.error("找不到行程");
        } else if (error.status === 500) {
          message.error("系統發生錯誤");
        }
      }
    }
  };

  const publishTrip = async (tripId: string, isPublic: boolean) => {
    try {
      const response = await request.patch(`/api/trips/${tripId}/publish`, {
        isPublic,
      });
      message.success(isPublic ? "發佈成功" : "取消成功");
      return response.data.tripInfo;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          message.error("請重新登入");
          logout();
        } else if (error.status === 403) {
          message.error("你沒有權限修改此行程");
        } else if (error.status === 404) {
          message.error("找不到行程");
        } else if (error.status === 500) {
          message.error("系統發生錯誤");
        }
      }
    }
  };

  return {
    trips,
    favorTrip,
    deleteTrip,
    createTrip,
    updateTripInfo,
    publishTrip,
  };
};

export default useTripInfo;
