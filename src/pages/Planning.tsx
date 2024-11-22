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
import { useEffect, useState } from "react";
import { LatLngLiteral, Mark, Place } from "../types/googleMapInterface";
import { useGoogleMap } from "../components/GoogleMapProvider";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Collection from "../components/Collection";
import useGoogleMapService from "../hooks/useMapService";
import useSearchBar from "../hooks/useSearchBar";
import usePlaceDetail from "../hooks/usePlaceDetail";
import useCollection from "../hooks/useCollection";

const Planning: React.FunctionComponent = () => {
  const testplace: Place[] = []
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoaded, loadError } = useGoogleMap();
  const { getItem } = useLocalStorage();
  const {
    mapRef,
    placesServiceRef,
    nearbySearch,
    moveToPosition,
    getAutoCompletePlace,
  } = useGoogleMapService();

  const { placeType, changePlaceType } = useSearchBar();
  const { placeDetail, getPlaceDetail } = usePlaceDetail();
  // const { collection, addPlace, addPlaceToTrip, deletePlace } = useCollection();

  const [markList, setMarkList] = useState<Mark[]>([]);
  const [showPlaceInfo, setShowPlaceInfo] = useState<boolean>(false);
  const [showCollection, setShowCollection] = useState<boolean>(false);

  // plan的placeinfo，places[i][] 為第i+1天的所有景點
  const [places, setPlaces] = useState<Place[][]>([]);

  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    // if (!getItem("jwtToken")) {
    //   navigate("/signin", { replace: true });
    // }

    dispatch(setPage("行程規劃"));
    dispatch(setMode("edit"));
  }, [navigate]);

  if (loadError) {
    console.error(loadError.message);
    return;
  }


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
      <Flex className="planning" vertical justify="center" align="center">
        <Spin className="planning-loading" tip="Loading...">
          <div className="planning-loading-box"></div>
        </Spin>
      </Flex>
    );
  }

  return (
    <Layout className="planning">
      <Provider store={store}>
        <Sider>
          <PlanList />
          <PlanDetail places={places}/>
          <MemberList />
        </Sider>
        <Content className="planning-content">
          {showCollection ? (
            <Collection
              places={testplace}
              mode="Edit"
              closeCollection={() => setShowCollection(false)}
              addPlaceToTrip={() => {
                //修改全局變數plan
                //setMarkList
              }}
              deletePlace={() =>{}}
            />
          ) : null}
          <Map
            mode="Edit"
            mapRef={mapRef}
            placesServiceRef={placesServiceRef}
            markList={markList}
            onMarkerClicked={onMarkerClicked}
          />
          <FloatButton
            className="planning-collection-button"
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