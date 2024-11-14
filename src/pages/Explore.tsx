import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { setMode, setPage } from "../store/page/pageSlice";
import { Flex, FloatButton, Spin } from "antd";
import { useGoogleMap } from "../components/GoogleMapProvider";
import { LatLngLiteral, Mark } from "../types/googleMapInterface";
import SearchBar from "../components/SearchBar";
import Map from "../components/Map";
import PlaceInfo from "../components/PlaceInfo";
import { BookOutlined } from "@ant-design/icons";
import Collection from "../components/Collection";
import { useLocalStorage } from "../hooks/useLocalStorage";
import useSearchBar from "../hooks/useSearchBar";
import useGoogleMapService from "../hooks/useMapService";
import useCollection from "../hooks/useCollection";
import usePlaceDetail from "../hooks/usePlaceDetail";

import "../assets/scss/explore.scss";

const Explore: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isLoaded, loadError } = useGoogleMap();
  const { getItem } = useLocalStorage();
  const {
    mapRef,
    placesServiceRef,
    autoCompleteRef,
    nearbySearch,
    moveToPosition,
    getAutoCompletePlace,
  } = useGoogleMapService();
  const { placeType, changePlaceType } = useSearchBar();
  const { placeDetail, getPlaceDetail } = usePlaceDetail();
  const { collection, addPlace, addPlaceToTrip, deletePlace } = useCollection();

  const [markList, setMarkList] = useState<Mark[]>([]);
  const [showPlaceInfo, setShowPlaceInfo] = useState<boolean>(false);
  const [showCollection, setShowCollection] = useState<boolean>(false);

  useEffect(() => {
    if (!getItem("jwtToken")) {
      navigate("/signin", { replace: true });
    }

    dispatch(setPage("景點探索"));
    dispatch(setMode("explore"));
  }, [navigate]);

  if (loadError) {
    console.error(loadError.message);
    return;
  }

  const onSearchTypeChanged = async (key: string) => {
    changePlaceType(key);

    let placeType = "";

    switch (key) {
      case "1":
        placeType = "tourist_attraction";
        break;
      case "2":
        placeType = "lodging";
        break;
      case "3":
        placeType = "shopping_mall";
        break;
      case "4":
        placeType = "restaurant";
        break;
      case "5":
        placeType = "transit_station";
        break;
    }

    const position = getAutoCompletePlace();
    const result = await nearbySearch(position as LatLngLiteral, placeType);
    setMarkList(result);
  };

  const onPlaceChanged = async () => {
    const position = getAutoCompletePlace();

    if (!position) {
      return;
    }

    moveToPosition(position);
    const result = await nearbySearch(position, placeType);
    setMarkList(result);
  };

  const onMarkerClicked = async (placeId: string) => {
    await getPlaceDetail(placeId);
    setShowPlaceInfo(true);
  };

  if (!isLoaded) {
    return (
      <Flex className="explore" vertical justify="center" align="center">
        <Spin className="explore_loading" tip="Loading...">
          <div className="explore_loading_box"></div>
        </Spin>
      </Flex>
    );
  }

  return (
    <Flex className="explore" vertical justify="flex-start" align="center">
      <SearchBar
        autoCompleteRef={autoCompleteRef}
        onSearchTypeChanged={onSearchTypeChanged}
        onPlaceChanged={onPlaceChanged}
      />
      <Map
        mapRef={mapRef}
        placesServiceRef={placesServiceRef}
        markList={markList}
        onMarkerClicked={onMarkerClicked}
      />
      <FloatButton
        className="explore_collection_button"
        type="primary"
        icon={<BookOutlined />}
        onClick={() => setShowCollection(true)}
      />
      {showPlaceInfo ? (
        <PlaceInfo
          place={placeDetail}
          onPlaceInfoClose={() => setShowPlaceInfo(false)}
          addPlace={addPlace} // 有 Bug，先註解
        />
      ) : null}
      {showCollection ? (
        <Collection
          places={collection}
          closeCollection={() => setShowCollection(false)}
          addPlaceToTrip={addPlaceToTrip}
          deletePlace={deletePlace}
        />
      ) : null}
    </Flex>
  );
};

export default Explore;
