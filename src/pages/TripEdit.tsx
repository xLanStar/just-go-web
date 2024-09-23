import { useNavigate } from "react-router-dom";
import { Flex, FloatButton } from "antd";
import { useAppDispatch } from "../hooks";
import { useEffect, useRef, useState } from "react";
import { setMode, setPage } from "../store/page/pageSlice";
import { PageMode } from "../types/modeInterface";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { BookOutlined, RobotOutlined } from "@ant-design/icons";
import ChatBox from "../components/ChatBox";
import { PlacesService } from "../types/googleMapInterface";
import { useGoogleMap } from "../components/GoogleMapProvider";
import Map from "../components/Map";

import "../assets/scss/tripEdit.scss";

const TripEdit: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const localStorage = useLocalStorage();
  const [showChatBox, setShowChatBox] = useState<boolean>(false);
  const { isLoaded, loadError } = useGoogleMap();

  const mapRef = useRef<google.maps.Map>();
  const placesServiceRef = useRef<PlacesService>();

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) {
      navigate("/signin", { replace: true });
    }
    dispatch(setPage("行程安排"));
    dispatch(setMode(PageMode.Edit));
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
        markList={[]}
        onMarkerClicked={() => {}}
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
      />
      {showChatBox ? <ChatBox placesServiceRef={placesServiceRef} /> : null}
    </Flex>
  );
};

export default TripEdit;
