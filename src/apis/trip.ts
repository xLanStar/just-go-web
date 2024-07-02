import axios from "axios";
import { AxiosResponse } from "axios";

export const loadTrips = async() => {
    const response: AxiosResponse = await axios.get("/api/trip");
    return response.data;
}

export const loadTripsByMe = async(type: string) => {
    const response: AxiosResponse = await axios.get(`/api/trip/${type}`);
    return response.data;
}

export const favorTrip = async(id: number) => {
    const response: AxiosResponse = await axios.put(`/api/trip/${id}/favor`);
    return response.data;
}

export const deleteTrip = async(id: number) => {
    const response: AxiosResponse = await axios.delete(`/api/trip/${id}`)
    return response.data;
}
