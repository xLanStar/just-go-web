import { Col, Flex, Row } from "antd";
import TripCard from "./TripCard";
import useTripInfoData from "../hooks/useTripInfoData";
import { TripInfoMode } from "../types/modeInterface";

import "../assets/scss/tripList.scss";

interface Props {
  type: string;
}

const TripList: React.FunctionComponent<Props> = ({ type }) => {
  const { trips, favorTrip, deleteTrip } = useTripInfoData(type);

  return (
    <>
      {type === "own" ? <h1 className="trip_list_title">我的行程</h1> : null}
      {type === "coEdit" ? <h1 className="trip_list_title">與我共編</h1> : null}
      {type === "keep" ? <h1 className="trip_list_title">我的收藏</h1> : null}
      {type === "public" ? <h1 className="trip_list_title">熱門行程</h1> : null}
      <Row className="trip_list" gutter={[16, 16]} justify="start">
        {trips.map((trip) => (
          <Col key={trip.id} sm={24} md={12} lg={8} xl={6}>
            <Flex
              className="trip_list_card_box"
              vertical
              justify="center"
              align="center"
            >
              {type === "own" ? (
                <TripCard
                  trip={trip}
                  mode={TripInfoMode.Private}
                  isPublic={false}
                  isDelete={true}
                  toggleFavor={() => favorTrip(trip.id)}
                  removeTrip={() => deleteTrip(trip.id)}
                />
              ) : null}
              {type === "coEdit" ? (
                <TripCard
                  trip={trip}
                  mode={TripInfoMode.Private}
                  isPublic={false}
                  isDelete={false}
                  toggleFavor={() => favorTrip(trip.id)}
                  removeTrip={() => deleteTrip(trip.id)}
                />
              ) : null}
              {type === "keep" ? (
                <TripCard
                  trip={trip}
                  mode={TripInfoMode.Private}
                  isPublic={false}
                  isDelete={false}
                  toggleFavor={() => favorTrip(trip.id)}
                  removeTrip={() => deleteTrip(trip.id)}
                />
              ) : null}
              {type === "public" ? (
                <TripCard
                  trip={trip}
                  mode={TripInfoMode.Public}
                  isPublic={true}
                  isDelete={false}
                  toggleFavor={() => favorTrip(trip.id)}
                  removeTrip={() => deleteTrip(trip.id)}
                />
              ) : null}
            </Flex>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default TripList;
