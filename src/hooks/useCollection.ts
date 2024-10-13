import { useState } from "react";
import { Place, PlaceDetail } from "../types/googleMapInterface";
import request from "../utils/request";

const useCollection = () => {
  const [collection, setCollection] = useState<Place[]>([]);

  const addPlace = async (place: PlaceDetail) => {
    try {
      await request.post("/api/trips/collections");
    } catch (error) {
      console.error(error);
    }
  };

  const addPlaceToTrip = async (tripId: string) => {};

  const deletePlace = async (placeId: string) => {};

  return { collection, addPlace, addPlaceToTrip, deletePlace };
};
