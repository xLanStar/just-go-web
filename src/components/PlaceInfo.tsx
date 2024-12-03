import { Button, Flex, Rate } from "antd";
import {
  ClockCircleOutlined,
  CloseOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  PhoneOutlined,
  PlusOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { convertToTraditional } from "../utils/textConverter";
import { Place } from "../types/googleMapInterface";

import "../assets/scss/placeInfo.scss";

interface Props {
  place: Place;
  onPlaceInfoClose: () => void;
  addPlace: (placeId: string) => void;
}

const PlaceInfo: React.FunctionComponent<Props> = ({
  place,
  onPlaceInfoClose,
  addPlace,
}) => {
  return (
    <Flex className="place_info" vertical justify="flex-start" align="center">
      <Flex
        className="place_info_header"
        vertical={false}
        justify="flex-start"
        align="center"
      >
        <h1 className="place_info_title">{place.name}</h1>
        <CloseOutlined
          className="place_info_close_button"
          onClick={onPlaceInfoClose}
        />
      </Flex>
      <div className="place_info_content">
        <Flex
          className="place_info_image_box"
          vertical
          justify="center"
          align="center"
        >
          <img className="place_info_image" src={place.photo} alt="image" />
        </Flex>
        <Flex
          className="place_info_rating_box"
          vertical={false}
          justify="flex-start"
          align="center"
          gap="small"
        >
          <StarOutlined className="place_info_icon" />
          <h2>{place.rating ? place.rating : 0}</h2>
          <Rate
            className="place_info_rating_rate"
            disabled
            allowHalf
            value={place.rating}
          />
        </Flex>
        <Flex
          className="place_info_address_box"
          vertical={false}
          justify="flex-start"
          align="center"
          gap="small"
        >
          <EnvironmentOutlined className="place_info_icon" />
          <h2>{convertToTraditional(place.address)}</h2>
        </Flex>
        <Flex
          className="place_info_phone_box"
          vertical={false}
          justify="flex-start"
          align="center"
          gap="small"
        >
          <PhoneOutlined className="place_info_icon" />
          <h2>{place.phone ? place.phone : "沒有資料"}</h2>
        </Flex>
        <Flex
          className="place_info_website_box"
          vertical={false}
          justify="flex-start"
          align="center"
          gap="small"
        >
          <GlobalOutlined className="place_info_icon" />
          <h2>
            {place.website ? (
              <a
                href={place.website}
                style={{
                  wordWrap: "break-word",
                  wordBreak: "break-all",
                  whiteSpace: "normal",
                }}
              >
                {place.website}
              </a>
            ) : (
              "沒有資料"
            )}
          </h2>
        </Flex>
        <Flex
          className="place_info_opening_hours_box"
          vertical={false}
          justify="flex-start"
          align="center"
          gap="small"
        >
          <ClockCircleOutlined className="place_info_icon" />
          <Flex vertical justify="center" align="flex-start">
            {place.opening_hours ? (
              <>
                {place.opening_hours.map((day, index) => (
                  <h2 key={index}>{day}</h2>
                ))}
              </>
            ) : (
              <h2>沒有資料</h2>
            )}
          </Flex>
        </Flex>
      </div>
      <Flex
        className="place_info_footer"
        vertical={false}
        justify="flex-end"
        align="center"
        gap="small"
      >
        <Button
          icon={<PlusOutlined />}
          size="large"
          onClick={() => {
            addPlace(place.placeId);
          }}
        >
          收藏景點
        </Button>
      </Flex>
    </Flex>
  );
};

export default PlaceInfo;
