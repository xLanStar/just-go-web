import request from "../utils/request";
import { TripInfo } from "../types/tripInterface";

interface TripResponse {
  data: TripInfo[];
}

interface LikeResponse {
  likeByMe: boolean;
}

interface DeleteResponse {
  message: string;
}

export const loadTrips = async () => {
  const response: TripResponse = await request.get("/api/trip");
  return response.data;
}

export const loadTripsByMe = async (type: string) => {
  const response: TripResponse = await request.get(`/api/trip/${type}`);
  const trips: TripInfo[] = response.data;
  return trips;
}

export const favorTrip = async (id: number) => {
  const response: LikeResponse = await request.put(`/api/trip/${id}/favor`);
  const likeByMe: boolean = response.likeByMe
  return likeByMe;
}

export const deleteTrip = async (id: number) => {
  const response: DeleteResponse = await request.delete(`/api/trip/${id}`)
  return response.message;
}
