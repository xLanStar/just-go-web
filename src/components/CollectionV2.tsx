import { Flex } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Color } from "../data/color";
import PlaceCard from "./PlaceCard";
import { CollectionMode } from "../types/modeInterface";

import "../assets/scss/collectionV2.scss";
import { Place } from "../types/googleMapInterface";

interface Props {
  places: Place[];
  closeCollection: () => void;
  mode: CollectionMode;
}

const CollectionV2: React.FunctionComponent<Props> = ({
  places,
  closeCollection,
  mode,
}) => {
  return (
    <Flex className="collection2" vertical justify="flex-start" align="center">
      <Flex
        className="collection2_header"
        vertical={false}
        justify="flex-start"
        align="center"
        style={{
          backgroundColor: Color.blue,
        }}
      >
        <h1 className="collection2_title">我的收藏</h1>
        <CloseOutlined
          className="collection_close_button"
          onClick={() => closeCollection()}
        />
      </Flex>
      <Flex
        className="collection2_content"
        vertical
        justify="flex-start"
        align="center"
      >
        {places.map((place) => (
          <PlaceCard place={place} mode={mode} />
        ))}
      </Flex>
    </Flex>
  );
};

export default CollectionV2;
