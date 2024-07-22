import { useEffect, useState } from "react";
import { App, Col, Flex, Row } from "antd";
import TripCard from "./TripCard";
import { TripInfo } from "../types/tripInterface";
import { deleteTrip, favorTrip } from "../apis/trip";
import { TripInfoMode } from "../types/modeInterface";

import "../assets/scss/tripList.scss";

interface Props {
  trips: TripInfo[];
  mode: TripInfoMode;
  isPublic: boolean;
  isDelete: boolean;
}

const TripList: React.FunctionComponent<Props> = ({
  trips,
  mode,
  isPublic,
  isDelete,
}) => {
  const { message } = App.useApp();
  const [tripList, setTripList] = useState<TripInfo[]>([]);

  useEffect(() => {
    setTripList(trips);
  }, [trips]);

  const toggleFavor = async (id: string) => {
    try {
      const isLike = await favorTrip(id);
      const newTripList = [...tripList];
      const trip = newTripList.find((trip) => trip.id === id);

      if (isLike) {
        (trip as TripInfo).like++;
      } else {
        (trip as TripInfo).like--;
      }

      (trip as TripInfo).isLike = isLike;
      setTripList(newTripList);
    } catch (error: any) {
      if (error.name === "ResponseError") {
        message.error("點擊收藏失敗");
      } else {
        message.error(error.message);
      }
    }
  };

  const removeTrip = async (id: string) => {
    try {
      await deleteTrip(id);
      const newTripList = tripList.filter((trip) => trip.id !== id);
      setTripList(newTripList);
    } catch (error: any) {
      if (error.name === "ResponseError") {
        message.error("點擊刪除失敗");
      } else {
        message.error(error.message);
      }
    }
  };

  return (
    <Row className="trip_list" gutter={[16, 16]} justify="start">
      {tripList.map((trip) => (
        <Col key={trip.id} sm={24} md={12} lg={8} xl={6}>
          <Flex
            vertical
            justify="center"
            align="center"
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <TripCard
              trip={trip}
              mode={mode}
              isPublic={isPublic}
              isDelete={isDelete}
              toggleFavor={toggleFavor}
              removeTrip={removeTrip}
            />
          </Flex>
        </Col>
      ))}
    </Row>
  );
};

export default TripList;
