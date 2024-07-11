import axios from "axios";
import { AxiosResponse } from "axios";
import { TripInfo } from "../types/tripInterface";

export const loadTrips = async() => {
  const response: AxiosResponse = await axios.get("/api/trip");
  return response.data;
}

export const loadTripsByMe = async(type: string) => {
  const response: AxiosResponse = await axios.get(`/api/trip/${type}`);
  const trips: TripInfo[] = response.data.data;
  return trips;
}

export const favorTrip = async(id: number) => {
  const response: AxiosResponse = await axios.put(`/api/trip/${id}/favor`);
  const likeByMe: boolean = response.data.data.likeByMe
  return likeByMe;
}

export const deleteTrip = async(id: number) => {
  const response: AxiosResponse = await axios.delete(`/api/trip/${id}`)
  return response.data;
}
