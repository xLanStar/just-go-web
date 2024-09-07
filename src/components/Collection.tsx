import { Flex } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Color } from "../data/color";
import PlaceCard from "./PlaceCard";
import { Place } from "../types/googleMapInterface";
import { CollectionMode } from "../types/modeInterface";

import "../assets/scss/collection.scss";

interface Props {
  places: Place[];
  closeCollection: () => void;
}

const Collection: React.FunctionComponent<Props> = ({
  places,
  closeCollection,
}) => {
  return (
    <Flex className="collection" vertical justify="flex-start" align="center">
      <Flex
        className="collection_header"
        vertical={false}
        justify="flex-start"
        align="center"
        style={{
          backgroundColor: Color.blue,
        }}
      >
        <h1 className="collection_title">我的收藏</h1>
        <CloseOutlined
          className="collection_close_button"
          onClick={() => closeCollection()}
        />
      </Flex>
      <Flex
        className="collection_content"
        vertical
        justify="flex-start"
        align="center"
      >
        {places.map((place) => (
          <PlaceCard place={place} mode={CollectionMode.Explore} />
        ))}
      </Flex>
    </Flex>
  );
};

export default Collection;
