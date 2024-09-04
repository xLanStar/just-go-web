import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { setMode, setPage } from "../store/page/pageSlice";
import { PageMode } from "../types/modeInterface";
import { Flex, FloatButton, Spin } from "antd";
import { useGoogleMap } from "../components/GoogleMapProvider";
import { Color } from "../data/color";
import {
  AutoComplete,
  LatLngLiteral,
  Mark,
  Place,
  PlaceDetail,
  PlaceDetailsRequest,
  PlaceSearchRequest,
  PlacesService,
} from "../types/googleMapInterface";
import SearchBar from "../components/SearchBar";
import Map from "../components/Map";
import PlaceInfo from "../components/PlaceInfo";
import { BookOutlined } from "@ant-design/icons";
import Collection from "../components/Collection";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Explore: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const localStorage = useLocalStorage();
  const { isLoaded, loadError } = useGoogleMap();

  const mapRef = useRef<google.maps.Map>();
  const placesServiceRef = useRef<PlacesService>();
  const autoCompleteRef = useRef<AutoComplete>();

  const [markList, setMarkList] = useState<Mark[]>([]);
  const [searchType, setSearchType] = useState<string>("tourist_attraction");
  const [showPlaceInfo, setShowPlaceInfo] = useState<boolean>(false);
  const [showCollection, setShowCollection] = useState<boolean>(false);
  const [placeDetail, setPlaceDetail] = useState<PlaceDetail>({
    name: "",
    photo: "",
    rating: undefined,
    address: "",
    phone: undefined,
    website: undefined,
    opening_hours: undefined,
  });
  const [collection, setCollection] = useState<Place[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) {
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
    mapRef.current.setZoom(17);
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

  // 搜尋地點資訊
  const onMarkerClicked = (placeId: string) => {
    if (!placesServiceRef.current) {
      return;
    }

    const request: PlaceDetailsRequest = {
      placeId: placeId,
      fields: [
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

      setPlaceDetail({
        name: place.name as string,
        photo: place.photos?.[0].getUrl() as string,
        rating: place.rating,
        address: place.formatted_address as string,
        phone: place.formatted_phone_number,
        website: place.website,
        opening_hours: place.opening_hours?.weekday_text,
      });
      setShowPlaceInfo(true);
    });
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

    placesServiceRef.current.nearbySearch(request, (results, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK || !results) {
        return;
      }

      // 過濾掉暫停營業的景點
      const newMarkList: Mark[] = results
        .filter((place) => place.business_status === "OPERATIONAL")
        .map((place) => ({
          name: place.name as string,
          location: {
            lat: place.geometry?.location?.lat() as number,
            lng: place.geometry?.location?.lng() as number,
          } as LatLngLiteral,
          placeId: place.place_id as string,
        }));

      setMarkList(newMarkList);
    });
  };

  const savePlace = (place: PlaceDetail) => {
    setCollection([
      ...collection,
      {
        name: place.name,
        photo: place.photo,
        rating: place.rating,
      },
    ]);
  };

  const onPlaceInfoClose = () => {
    setShowPlaceInfo(false);
  };

  const closeCollection = () => {
    setShowCollection(false);
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
        onMarkerClicked={onMarkerClicked}
      />
      <FloatButton
        type="primary"
        icon={<BookOutlined />}
        style={{ width: 50, height: 50, zIndex: 1 }}
        onClick={() => setShowCollection(true)}
      />
      {showPlaceInfo ? (
        <PlaceInfo
          place={placeDetail}
          onPlaceInfoClose={onPlaceInfoClose}
          savePlace={savePlace}
        />
      ) : null}
      {showCollection ? (
        <Collection places={collection} closeCollection={closeCollection} />
      ) : null}
    </Flex>
  );
};

export default Explore;
