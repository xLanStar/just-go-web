import { Button, Flex, FloatButton, Layout, Spin } from "antd";
import { Provider } from "react-redux";
import store from "../store";
import { useAppDispatch } from "../hooks";
import { setMode, setPage } from "../store/page/pageSlice";
import { PlanList } from "../components/PlanList";
import { PlanDetail } from "../components/PlanDetail";
import Sider from "antd/es/layout/Sider";
import { BarChartOutlined, BookOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import "../assets/scss/planning.scss"
import { MemberList } from "../components/MemberList";
import Map from "../components/Map";
import { useEffect, useRef, useState } from "react";
import { AutoComplete, LatLngLiteral, Mark, Place, PlaceDetail, PlaceDetailsRequest, PlaceSearchRequest, PlacesService } from "../types/googleMapInterface";
import { useGoogleMap } from "../components/GoogleMapProvider";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import CollectionV2 from "../components/CollectionV2";
import { CollectionMode } from "../types/modeInterface";



const Planning: React.FunctionComponent = () => {
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
  const [collection, setCollection] = useState<Place[]>(randomCreateCollection());

  useEffect(() => {
    // if (!localStorage.getItem("jwtToken")) {
    //   navigate("/signin", { replace: true });
    // }
    dispatch(setPage("行程規劃"));
    dispatch(setMode("edit"));
  }, [navigate]);

  if (loadError) {
    console.error(loadError.message);
    return;
  }

  // const onPlaceChanged = () => {
  //   if (!mapRef.current || !autoCompleteRef.current) {
  //     return;
  //   }

  //   const place = autoCompleteRef.current.getPlace();

  //   if (!place.geometry || !place.geometry.location) {
  //     return;
  //   }

  //   const position: LatLngLiteral = {
  //     lat: place.geometry.location.lat(),
  //     lng: place.geometry.location.lng(),
  //   };

  //   mapRef.current.panTo(position);
  //   mapRef.current.setZoom(17);
  //   searchNearby(position);
  // };

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

  // const searchNearby = (position: LatLngLiteral) => {
  //   if (!mapRef.current || !placesServiceRef.current) {
  //     return;
  //   }

  //   const request: PlaceSearchRequest = {
  //     location: position,
  //     radius: 500,
  //     type: searchType,
  //   };

  //   placesServiceRef.current.nearbySearch(request, (results, status) => {
  //     if (status !== google.maps.places.PlacesServiceStatus.OK || !results) {
  //       return;
  //     }

  //     // 過濾掉暫停營業的景點
  //     const newMarkList: Mark[] = results
  //       .filter((place) => place.business_status === "OPERATIONAL")
  //       .map((place) => ({
  //         name: place.name as string,
  //         location: {
  //           lat: place.geometry?.location?.lat() as number,
  //           lng: place.geometry?.location?.lng() as number,
  //         } as LatLngLiteral,
  //         placeId: place.place_id as string,
  //       }));

  //     setMarkList(newMarkList);
  //   });
  // };

  // const savePlace = (place: PlaceDetail) => {
  //   setCollection([
  //     ...collection,
  //     {
  //       name: place.name,
  //       photo: place.photo,
  //       rating: place.rating,
  //     },
  //   ]);
  // };

  // const onPlaceInfoClose = () => {
  //   setShowPlaceInfo(false);
  // };

  const closeCollection = () => {
    setShowCollection(false);
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
    <Layout className="planning">
      <Provider store={store}>
        <Sider>
          <PlanList />
          <PlanDetail />
          <MemberList />
        </Sider>
        <Content className="planning-content">
          {showCollection ? (
            <CollectionV2 places={collection} closeCollection={closeCollection} mode={CollectionMode.Planning} />
          ) : null}
          <Map
            mapRef={mapRef}
            placesServiceRef={placesServiceRef}
            markList={markList}
            onMarkerClicked={onMarkerClicked}
          />
          <Button icon={<BarChartOutlined />} className="planning-planCompare">方案比較</Button>
          <FloatButton
            className="planning-collectionButton"
            type="primary"
            icon={<BookOutlined />}
            onClick={() => setShowCollection(true)}
          />

        </Content>
      </Provider>
    </Layout>
  );
};

export default Planning;

function randomCreateCollection(): Place[] {
  let result: Place[] = []
  const count: number = Math.floor(10 + Math.random() * 10)
  for (let i = 0; i < count; i++) {
    const name: string = "測試景點" + (i + 1)
    const photo: string = "Photo" + (i + 1)
    const rating: number = Math.floor(1 + Math.random() * 5)
    result.push({ name, photo, rating })
  }
  return result
}