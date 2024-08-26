import { Button, Flex } from "antd";
import { StarOutlined } from "@ant-design/icons";
import { Place } from "../types/googleMapInterface";
import { CollectionMode } from "../types/modeInterface";

import "../assets/scss/placeCard.scss";

interface Props {
  place: Place;
  mode: CollectionMode;
}

const PlaceCard: React.FunctionComponent<Props> = ({ place, mode }) => {
  return (
    <Flex
      className="place_card"
      vertical={false}
      justify="flex-start"
      align="center"
    >
      <img className="place_card_photo" src={place.photo} alt="place_photo" />
      <Flex
        className="place_card_info"
        vertical
        justify="flex-start"
        align="flex-start"
      >
        <div className="place_card_title_container">
          <h1 className="place_card_title">{place.name}</h1>
        </div>
        <Flex vertical={false} justify="flex-start" align="center" gap="small">
          <StarOutlined className="place_card_icon" />
          <h1>{place.rating}</h1>
        </Flex>
        <Flex
          className="place_card_footer"
          vertical={false}
          justify={mode === CollectionMode.Explore ? "flex-end" : "center"}
          align="center"
          gap="small"
        >
          {mode === CollectionMode.Explore ? (
            <Button
              type="primary"
              danger
              style={{
                width: "100%",
              }}
            >
              刪除
            </Button>
          ) : (
            <>
              <Button type="primary">新增</Button>
              <Button type="primary" danger>
                刪除
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PlaceCard;
