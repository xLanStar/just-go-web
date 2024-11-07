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

export const loadTrips = async () => {
  const response: TripsResponse = await request.get("/api/trips");
  return response.data;
};

export const loadTripsById = async (id: string) => {
  const response: TripsResponse = await request.get(`/api/trips/${id}`);
  return response.data;
};

export const loadTripsByMe = async (userId: string, type: string) => {
  const response: MyTripsResponse = await request.get(
    `/api/users/${userId}/trips/${type}`
  );
  return response.data;
};
