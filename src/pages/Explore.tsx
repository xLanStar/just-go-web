import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { getJwtToken } from "../apis/auth";
import { setMode, setPage } from "../store/page/pageSlice";
import { PageMode } from "../types/modeInterface";
import { Flex, Spin } from "antd";
import { useGoogleMap } from "../components/GoogleMapProvider";
import { Color } from "../data/color";
import {
  AutoComplete,
  LatLngLiteral,
  Mark,
  PlaceSearchRequest,
  PlacesService,
} from "../types/googleMapInterface";
import SearchBar from "../components/SearchBar";
import Map from "../components/Map";

const Explore: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoaded, loadError } = useGoogleMap();

  const mapRef = useRef<google.maps.Map>();
  const placesServiceRef = useRef<PlacesService>();
  const autoCompleteRef = useRef<AutoComplete>();

  const [markList, setMarkList] = useState<Mark[]>([]);
  const [searchType, setSearchType] = useState<string>("tourist_attraction");

  useEffect(() => {
    if (!getJwtToken()) {
      navigate("/signin", { replace: true });
    }
    dispatch(setPage("景點探索"));
    dispatch(setMode(PageMode.Explore));
  }, [navigate]);

  if (loadError) {
    console.error(loadError.message);
    return;
  }

  const onPlaceChanged = () => {
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

    mapRef.current.panTo(position);
    searchNearby(position);
  };

  const onSearchTypeChanged = (key: string) => {
    switch (key) {
      case "1": // 景點
        setSearchType("tourist_attraction");
        break;
      case "2": // 住宿
        setSearchType("lodging");
        break;
      case "3": // 購物
        setSearchType("store");
        break;
      case "4": // 餐廳
        setSearchType("restaurant");
        break;
      case "5": // 交通
        setSearchType("subway_station");
        break;
    }
  };

  const searchNearby = (position: LatLngLiteral) => {
    if (!mapRef.current || !placesServiceRef.current) {
      return;
    }

    const request: PlaceSearchRequest = {
      location: position,
      radius: 500,
      type: searchType,
    };

    console.log(request);

    placesServiceRef.current.nearbySearch(request, (results, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK || !results) {
        return;
      }

      const newMarkList: Mark[] = results.map((place) => ({
        name: place.name as string,
        location: {
          lat: place.geometry?.location?.lat() as number,
          lng: place.geometry?.location?.lng() as number,
        } as LatLngLiteral,
        placeID: place.place_id as string,
      }));

      setMarkList(newMarkList);
    });
  };

  if (!isLoaded) {
    return (
      <Flex
        className="explore"
        vertical
        justify="center"
        align="center"
        style={{
          width: "100%",
          height: "calc(100vh - 64px)",
        }}
      >
        <Spin
          tip="Loading..."
          style={{
            backgroundColor: Color.bodyGrey,
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
            }}
          ></div>
        </Spin>
      </Flex>
    );
  }

  return (
    <Flex
      className="explore"
      vertical
      justify="flex-start"
      align="center"
      style={{
        width: "100%",
        height: "calc(100vh - 64px)",
      }}
    >
      <SearchBar
        autoCompleteRef={autoCompleteRef}
        onPlaceChanged={onPlaceChanged}
        onSearchTypeChanged={onSearchTypeChanged}
      />
      <Map
        mapRef={mapRef}
        placesServiceRef={placesServiceRef}
        markList={markList}
      />
    </Flex>
  );
};

export default Explore;
