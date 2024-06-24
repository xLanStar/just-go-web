import axios from "axios";
import { AxiosResponse, AxiosError } from "axios";

export const getTripList = async () => {
  const response: AxiosResponse = await axios.get("/api/trip");
  return response.data;
}
