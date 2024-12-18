import { Col, Flex, Row } from "antd";
import TripCard from "./TripCard";
import useTripInfo from "../hooks/useTripInfo";
import { TripInfoMode } from "../types/modeInterface";

import "../assets/scss/tripList.scss";

interface Props {
  type: string;
}

const TripList: React.FunctionComponent<Props> = ({ type }) => {
  const { trips, favorTrip, deleteTrip } = useTripInfo(type);

  return (
    <>
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
                  isDelete={true}
                  toggleFavor={favorTrip}
                  deleteTrip={deleteTrip}
                />
              ) : null}
              {type === "coEdit" ? (
                <TripCard
                  trip={trip}
                  mode={TripInfoMode.Private}
                  isDelete={false}
                  toggleFavor={favorTrip}
                  deleteTrip={deleteTrip}
                />
              ) : null}
              {type === "keep" ? (
                <TripCard
                  trip={trip}
                  mode={TripInfoMode.Private}
                  isDelete={false}
                  toggleFavor={favorTrip}
                  deleteTrip={deleteTrip}
                />
              ) : null}
              {type === "public" ? (
                <TripCard
                  trip={trip}
                  mode={TripInfoMode.Public}
                  isDelete={false}
                  toggleFavor={favorTrip}
                  deleteTrip={deleteTrip}
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
