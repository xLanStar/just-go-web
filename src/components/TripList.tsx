import { Col, Flex, Row } from "antd";
import { Fragment } from "react/jsx-runtime";
import TripCard from "./TripCard";
import { TripInfo } from "../types/tripInterface";

import "../assets/scss/tripList.scss";
import { useEffect, useState } from "react";
import { deleteTrip, favorTrip, loadTripsByMe } from "../apis/trip";

interface Props {
  title: string;
  category: string;
}

const TripList: React.FunctionComponent<Props> = ({ title, category }) => {
  const [tripList, setTripList] = useState<TripInfo[]>([]);

  useEffect(() => {
    loadTripsByMe(category).then((response) => {
      setTripList(response.data);
    });
  }, []);

  const toggleFavor = async (id: number) => {
    const response = await favorTrip(id);
    const { likeByMe } = response.data;
    const newTripList = [...tripList];
    const trip = newTripList.find((trip) => trip.id === id);
    if (likeByMe) {
      (trip as TripInfo).like++;
    } else {
      (trip as TripInfo).like--;
    }
    (trip as TripInfo).likeByMe = likeByMe;
    setTripList(newTripList);
  };

  const removeTrip = async (id: number) => {
    const response = await deleteTrip(id);
    const newTripList = tripList.filter((trip) => trip.id !== id);
    setTripList(newTripList);
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
