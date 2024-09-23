import request from "../utils/request";
import { TripInfo } from "../types/tripInterface";

interface OwnTrips {
  own: TripInfo[];
  coEdit: TripInfo[];
}

interface TripsResponse {
  data: TripInfo[];
}

interface MyTripsResponse {
  data: OwnTrips | TripInfo[];
}

interface LikeResponse {
  isLike: boolean;
}

interface DeleteResponse {
  message: string;
}

export const loadTrips = async () => {
  const response: TripsResponse = await request.get("/api/trips");
  return response.data;
};

export const loadTripsById = async (id: string) => {
  const response: TripsResponse = await request.get(`/api/trips/${id}`);
  return response.data;
};

export const loadTripsByMe = async (id: string, type: string) => {
  const response: MyTripsResponse = await request.get(
    `/api/trips/${id}/${type}`
  );
  return response.data;
};

export const favorTrip = async (id: string) => {
  const response: LikeResponse = await request.put(`/api/trips/${id}/favor`);
  const isLike: boolean = response.isLike;
  return isLike;
};

export const deleteTrip = async (id: string) => {
  const response: DeleteResponse = await request.delete(`/api/trips/${id}`);
  return response.message;
};

export const createTrip = async (
  userId: string,
  name: string,
  image: File | undefined,
  startTime: string,
  endTime: string
) => {
  const formData = new FormData();

  formData.append("userId", userId);
  formData.append("name", name);

  if (image) {
    formData.append("image", image);
  } else {
    formData.append("image", "");
  }

  formData.append("startTime", startTime);
  formData.append("endTime", endTime);

  await request.post("/api/trips", formData);
  return;
};
