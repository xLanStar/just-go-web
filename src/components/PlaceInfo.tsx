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
import { Color } from "../data/color";
import { convertToTraditional } from "../utils/textConverter";
import { PlaceDetail } from "../types/googleMapInterface";

import "../assets/scss/placeInfo.scss";

interface Props {
  place: PlaceDetail;
  onPlaceInfoClose: () => void;
}

const PlaceInfo: React.FunctionComponent<Props> = ({
  place,
  onPlaceInfoClose,
}) => {
  return (
    <Flex
      className="place_info"
      vertical
      justify="flex-start"
      align="center"
      style={{
        height: "calc(100vh - 64px)",
        position: "absolute",
        top: "64px",
        left: "0px",
        backgroundColor: "white",
        zIndex: 1,
      }}
    >
      <Flex
        className="title"
        vertical={false}
        justify="flex-start"
        align="center"
        style={{
          height: "64px",
          backgroundColor: Color.blue,
          paddingLeft: "24px",
          paddingRight: "36px",
          position: "fixed",
          zIndex: 2,
        }}
      >
        <h1
          style={{
            color: "white",
            fontWeight: "bold",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {place.name}
        </h1>
        <CloseOutlined
          style={{
            fontSize: "20px",
            color: "white",
            position: "absolute",
            right: "16px",
            cursor: "pointer",
          }}
          onClick={() => {
            onPlaceInfoClose();
          }}
        />
      </Flex>
      <div
        className="content"
        style={{
          overflowY: "auto",
          margin: "64px 0px",
        }}
      >
        <Flex
          vertical
          justify="center"
          align="center"
          style={{
            width: "100%",
            height: "300px",
          }}
        >
          <img src={place.photo} alt="image" width="100%" height={300} />
        </Flex>
        <Flex
          vertical={false}
          justify="flex-start"
          align="center"
          gap="small"
          style={{
            width: "100%",
            height: "48px",
            padding: "4px 16px",
            borderBottom: `1px solid ${Color.greyHeavy}`,
          }}
        >
          <StarOutlined
            style={{
              fontSize: "20px",
            }}
          />
          <h2>{place.rating ? place.rating : 0}</h2>
          <Rate
            disabled
            allowHalf
            value={place.rating}
            style={{
              zIndex: 0,
            }}
          />
        </Flex>
        <Flex
          vertical={false}
          justify="flex-start"
          align="center"
          gap="small"
          style={{
            width: "100%",
            minHeight: "48px",
            padding: "4px 16px",
            borderBottom: `1px solid ${Color.greyHeavy}`,
          }}
        >
          <EnvironmentOutlined
            style={{
              fontSize: "20px",
            }}
          />
          <h2>{convertToTraditional(place.address)}</h2>
        </Flex>
        <Flex
          vertical={false}
          justify="flex-start"
          align="center"
          gap="small"
          style={{
            width: "100%",
            height: "48px",
            padding: "4px 16px",
            borderBottom: `1px solid ${Color.greyHeavy}`,
          }}
        >
          <PhoneOutlined
            style={{
              fontSize: "20px",
            }}
          />
          <h2>{place.phone ? place.phone : "沒有資料"}</h2>
        </Flex>
        <Flex
          vertical={false}
          justify="flex-start"
          align="center"
          gap="small"
          style={{
            width: "100%",
            minHeight: "48px",
            padding: "4px 16px",
            borderBottom: `1px solid ${Color.greyHeavy}`,
          }}
        >
          <GlobalOutlined
            style={{
              fontSize: "20px",
            }}
          />
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
          vertical={false}
          justify="flex-start"
          align="center"
          gap="small"
          style={{
            width: "100%",
            minHeight: "48px",
            padding: "4px 16px",
          }}
        >
          <ClockCircleOutlined
            style={{
              fontSize: "20px",
            }}
          />
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
        className="bottom"
        vertical={false}
        justify="flex-end"
        align="center"
        gap="small"
        style={{
          height: "64px",
          padding: "0px 16px",
          borderTop: `1px solid ${Color.greyHeavy}`,
          position: "fixed",
          backgroundColor: "white",
          left: 0,
          bottom: 0,
          zIndex: 2,
        }}
      >
        <Button icon={<PlusOutlined />} size="large">
          收藏景點
        </Button>
      </Flex>
    </Flex>
  );
};

export default PlaceInfo;
