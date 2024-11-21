import React, { memo, useEffect } from "react";
import { Card, Button, Rate, Flex } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Place } from "../types/googleMapInterface";
import { convertToTraditional } from "../utils/textConverter";
import usePlaceDetail from "../hooks/usePlaceDetail";

import "../assets/scss/placeCard.scss";

interface Props {
  placeId: string;
  mode: "Edit" | "Explore";
  addPlaceToTrip: () => void;
  deletePlace: (place: Place) => void;
}

const PlaceCard: React.FunctionComponent<Props> = memo(
  ({ placeId, mode, addPlaceToTrip, deletePlace }) => {
    const { placeDetail: place, getPlaceDetail } = usePlaceDetail();

    useEffect(() => {
      getPlaceDetail(placeId);
    }, [placeId]);

    console.log("render placeId", placeId);

    return (
      <Card
        className="place_card"
        cover={
          <img
            className="place_card_photo"
            alt={place.name}
            src={place.photo}
          />
        }
      >
        <Card.Meta
          title={place.name}
          description={convertToTraditional(place.address)}
        />
        <Flex
          className="place_card_rating"
          vertical={false}
          justify="flex-start"
          align="center"
          gap="small"
        >
          <h3>{place.rating}</h3>
          <Rate disabled allowHalf value={place.rating} />
        </Flex>
        <Flex
          className="place_card_footer"
          vertical={false}
          justify="space-between"
          align="center"
        >
          {mode === "Edit" && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={addPlaceToTrip}
            >
              新增至方案
            </Button>
          )}
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deletePlace(place)}
          >
            刪除
          </Button>
        </Flex>
      </Card>
    );
  }
);

export default PlaceCard;
