import axios from "axios";
import { AxiosResponse } from "axios";
import { handleError } from "../utils/handleError";

export const loadTrips = async() => {
    try {
        const response: AxiosResponse = await axios.get("/api/trip");
        return response.data;
    } catch (error) {
        handleError(error, "載入行程失敗");
    }
}

export const loadTripsByMe = async(type: string) => {
    try {
        const response: AxiosResponse = await axios.get(`/api/trip/${type}`);
        return response.data;
    } catch (error) {
        handleError(error, "載入行程失敗");
    }
}

export const favorTrip = async(id: number) => {
    try {
        const response: AxiosResponse = await axios.put(`/api/trip/${id}/favor`);
        return response.data;
    } catch (error) {
        handleError(error, "點擊收藏失敗");
    }
}

export const deleteTrip = async(id: number) => {
    try {
        const response: AxiosResponse = await axios.delete(`/api/trip/${id}`)
        return response.data;
    } catch (error) {
        handleError(error, "刪除行程失敗");
    }
}
