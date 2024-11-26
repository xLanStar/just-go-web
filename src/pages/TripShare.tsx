import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { setMode, setPage } from "../store/page/pageSlice";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Flex, FloatButton } from "antd";
import Map from "../components/Map";
import useMarkList from "../hooks/useMarkList";
import useGoogleMapService from "../hooks/useMapService";
import { useGoogleMap } from "../components/GoogleMapProvider";
import { UnorderedListOutlined } from "@ant-design/icons";
import PlanDetail from "../components/PlanDetail";
import useTrip from "../hooks/useTrip";
import usePlans from "../hooks/usePlans";
import { Plan } from "../types/tripInterface";
import {
  setCurrentAttractions,
  setCurrentDay,
  setCurrentPlan,
} from "../store/trip/tripSlice";
import { Color } from "../data/color";

import "../assets/scss/tripShare.scss";

const TripShare: React.FunctionComponent = () => {
  const { id } = useParams();

  if (!id) {
    return null;
  }

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isLoaded, loadError } = useGoogleMap();
  const { getItem } = useLocalStorage();
  const { mapRef, placesServiceRef } = useGoogleMapService();
  const { currentTrip } = useTrip(id);
  const { plans } = usePlans(id);
  const { markList, loadMarkList } = useMarkList();

  const [finalPlan, setFinalPlan] = useState<Plan | null>(null);
  const [showPlanDetail, setShowPlanDetail] = useState<boolean>(false);

  useEffect(() => {
    if (!getItem("jwtToken")) {
      navigate("/signin", { replace: true });
    }
    dispatch(setPage("行程分享"));
    dispatch(setMode("share"));
    dispatch(setCurrentPlan(null));
    dispatch(setCurrentDay(null));
    dispatch(setCurrentAttractions([]));
    loadMarkList(true);
  }, [navigate]);

  useEffect(() => {
    if (!currentTrip) return;
    const finalPlan = plans.find((plan) => plan.id === currentTrip.finalPlanId);
    setFinalPlan(finalPlan as Plan);
  }, [currentTrip, plans]);

  console.log("currentTrip", currentTrip);

  if (loadError) {
    console.error(loadError.message);
    return;
  }

  if (!isLoaded) {
    return;
  }

  return (
    <Flex className="trip-share" vertical justify="flex-start" align="center">
      <Map
        mapRef={mapRef}
        placesServiceRef={placesServiceRef}
        markList={markList}
        onMarkerClicked={() => {}}
        mode="Polyline"
      />
      <FloatButton
        className="trip-share-plan-button"
        icon={<UnorderedListOutlined />}
        onClick={() => setShowPlanDetail(true)}
      />
      {showPlanDetail ? (
        <PlanDetail
          tripId={currentTrip?.id as string}
          finalPlanId={currentTrip?.finalPlanId as string}
          plan={finalPlan as Plan}
          color={Color.blue}
          mode="Read"
          closePlanDetail={() => setShowPlanDetail(false)}
          onPlanNameChange={() => {}}
        />
      ) : null}
    </Flex>
  );
};

export default TripShare;
