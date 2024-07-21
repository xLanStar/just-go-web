import request from "../utils/request";
import { TripInfo } from "../types/tripInterface";

interface TripResponse {
  data: TripInfo[];
}

interface LikeResponse {
  isLike: boolean;
}

interface DeleteResponse {
  message: string;
}

export const loadTrips = async () => {
  const response: TripResponse = await request.get("/api/trip");
  return response.data;
}

export const loadTripsByMe = async(type: string) => {
  const response: TripResponse = await request.get(`/api/trips/${type}`);
  const trips: TripInfo[] = response.data;
  return trips;
}

export const favorTrip = async(id: string) => {
  const response: LikeResponse = await request.put(`/api/trips/${id}/favor`);
  const isLike: boolean = response.isLike
  return isLike;
}

export const deleteTrip = async(id: string) => {
  const response: DeleteResponse = await request.delete(`/api/trips/${id}`)
  return response.message;
}
