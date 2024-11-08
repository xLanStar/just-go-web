import { useRef } from "react";
import {
  AutoComplete,
  LatLngLiteral,
  Mark,
  PlaceDetailsRequest,
  PlaceSearchRequest,
  PlacesService,
} from "../types/googleMapInterface";

const useGoogleMapService = () => {
  const mapRef = useRef<google.maps.Map>();
  const placesServiceRef = useRef<PlacesService>();
  const autoCompleteRef = useRef<AutoComplete>();

  const nearbySearch = async (position: LatLngLiteral, placeType: string) => {
    let markList: Mark[] = [];

    if (!mapRef.current || !placesServiceRef.current) {
      return markList;
    }

    const request: PlaceSearchRequest = {
      location: position,
      radius: 500,
      type: placeType,
    };

    await new Promise<void>((resolve) => {
      placesServiceRef.current!.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          markList = results.map((place) => {
            return {
              name: place.name,
              placeId: place.place_id,
              location: {
                lat: place.geometry?.location?.lat() as number,
                lng: place.geometry?.location?.lng() as number,
              },
            } as Mark;
          });
        }
        resolve();
      });
    });

    return markList;
  };

  const detailSearch = (placeId: string) => {
    if (!placesServiceRef.current) {
      return;
    }

    const request: PlaceDetailsRequest = {
      placeId: placeId,
      fields: [
        "place_id",
        "name",
        "photo",
        "rating",
        "formatted_address",
        "formatted_phone_number",
        "website",
        "opening_hours",
      ],
    };

    placesServiceRef.current.getDetails(request, (place, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK || !place) {
        return;
      }
    });
  };

  const moveToPosition = (position: LatLngLiteral) => {
    if (!mapRef.current) {
      return;
    }

    mapRef.current.panTo(position);
    mapRef.current.setZoom(17);
  };

  const getAutoCompletePlace = () => {
    if (!mapRef.current || !autoCompleteRef.current) {
      return;
    }

    const place = autoCompleteRef.current.getPlace();

    if (!place.geometry || !place.geometry.location) {
      return;
    }

    const position: LatLngLiteral = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };

    return position;
  };

  return {
    mapRef,
    placesServiceRef,
    autoCompleteRef,
    nearbySearch,
    detailSearch,
    moveToPosition,
    getAutoCompletePlace,
  };
};

export default useGoogleMapService;
