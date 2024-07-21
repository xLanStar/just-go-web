import { useEffect, useState } from "react";
import { App, Col, Flex, Row } from "antd";
import { Fragment } from "react/jsx-runtime";
import TripCard from "./TripCard";
import { TripInfo } from "../types/tripInterface";
import { deleteTrip, favorTrip, loadTripsByMe } from "../apis/trip";

import "../assets/scss/tripList.scss";
import { TripInfoMode } from "../types/modeInterface";

interface Props {
  title: string;
  category: string;
}

const TripList: React.FunctionComponent<Props> = ({ title, category }) => {
  const { message } = App.useApp();
  const [tripList, setTripList] = useState<TripInfo[]>([]);

  useEffect(() => {
    loadTripsByMe(category)
      .then((trips: TripInfo[]) => setTripList(trips))
      .catch((error: any) => {
        if (error.name === "ResponseError") {
          message.error("載入行程失敗");
        } else {
          message.error(error.message);
        }
      });
  }, []);

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
    <Fragment>
      <Flex
        className="trip_type"
        vertical={false}
        justify="flex-start"
        align="center"
      >
        <h1>{title}</h1>
      </Flex>
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
                mode={TripInfoMode.Private}
                isShare={true}
                isDelete={true}
                toggleFavor={toggleFavor}
                removeTrip={removeTrip}
              />
            </Flex>
          </Col>
        ))}
      </Row>
    </Fragment>
  );
};

export default TripList;
