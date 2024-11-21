import { useNavigate, useParams } from "react-router-dom";
import { Flex, FloatButton } from "antd";
import { useAppDispatch } from "../hooks";
import { useEffect, useState } from "react";
import { setMode, setPage } from "../store/page/pageSlice";
import {
  BookOutlined,
  RobotOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import ChatBox from "../components/ChatBox";
import { useGoogleMap } from "../components/GoogleMapProvider";
import Map from "../components/Map";
import { useLocalStorage } from "../hooks/useLocalStorage";
import useGoogleMapService from "../hooks/useMapService";
import useCollection from "../hooks/useCollection";
import Collection from "../components/Collection";
import { Mark } from "../types/googleMapInterface";
import useTrip from "../hooks/useTrip";
import PlanList from "../components/PlanList";

import "../assets/scss/tripEdit.scss";

const TripEdit: React.FunctionComponent = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isLoaded, loadError } = useGoogleMap();
  const { getItem } = useLocalStorage();
  const { mapRef, placesServiceRef } = useGoogleMapService();
  const { collection, addPlaceToTrip, deletePlace } = useCollection();
  const { tripInfo, plans } = useTrip(id as string);

  console.log("tripInfo", tripInfo);
  console.log("plans", plans);

  const [markList, setMarkList] = useState<Mark[]>([]);
  const [showPlanList, setShowPlanList] = useState<boolean>(false);
  const [showChatBox, setShowChatBox] = useState<boolean>(false);
  const [showCollection, setShowCollection] = useState<boolean>(false);

  useEffect(() => {
    if (!getItem("jwtToken")) {
      navigate("/signin", { replace: true });
    }
    dispatch(setPage("行程安排"));
    dispatch(setMode("edit"));
  }, [navigate]);

  if (loadError) {
    console.error(loadError.message);
    return;
  }

  if (!isLoaded) {
    return;
  }

  return (
    <Flex className="trip_edit" vertical justify="flex-start" align="center">
      <Map
        mapRef={mapRef}
        placesServiceRef={placesServiceRef}
        markList={markList}
        onMarkerClicked={() => {}}
        mode="Polyline"
      />
      <FloatButton
        className="trip_edit_plan_button"
        icon={<UnorderedListOutlined />}
        onClick={() => setShowPlanList(true)}
      />
      <FloatButton
        className="trip_edit_chatbox_button"
        type="primary"
        icon={<RobotOutlined />}
        onClick={() => setShowChatBox(true)}
      />
      <FloatButton
        className="trip_edit_collection_button"
        type="primary"
        icon={<BookOutlined />}
        onClick={() => setShowCollection(true)}
      />
      {showPlanList ? (
        <PlanList closePlanList={() => setShowPlanList(false)} />
      ) : null}
      {showChatBox ? (
        <ChatBox
          placesServiceRef={placesServiceRef}
          closeChatBox={() => setShowChatBox(false)}
        />
      ) : null}
      {showCollection ? (
        <Collection
          collection={collection}
          mode="Edit"
          closeCollection={() => setShowCollection(false)}
          addPlaceToTrip={addPlaceToTrip}
          deletePlace={deletePlace}
        />
      ) : null}
    </Flex>
  );
};

export default TripEdit;
