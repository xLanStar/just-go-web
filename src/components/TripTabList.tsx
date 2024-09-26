import { Flex, Button } from "antd";
import {
  AppstoreOutlined,
  EditOutlined,
  StarOutlined,
} from "@ant-design/icons";

import "../assets/scss/tripTabList.scss";

interface Props {
  tabMode: string;
  setTabMode: (mode: string) => void;
}

const TripTabList: React.FunctionComponent<Props> = ({
  tabMode,
  setTabMode,
}) => {
  return (
    <Flex
      className="trip_tab_list"
      vertical={false}
      justify="center"
      align="center"
    >
      <Button
        className={
          tabMode === "own"
            ? "trip_tab_list_button_active"
            : "trip_tab_list_button"
        }
        icon={<AppstoreOutlined />}
        type="text"
        size="large"
        onClick={() => {
          setTabMode("own");
        }}
      >
        我的行程
      </Button>
      <Button
        className={
          tabMode === "coEdit"
            ? "trip_tab_list_button_active"
            : "trip_tab_list_button"
        }
        icon={<EditOutlined />}
        type="text"
        size="large"
        onClick={() => {
          setTabMode("coEdit");
        }}
      >
        與我共編
      </Button>
      <Button
        className={
          tabMode === "keep"
            ? "trip_tab_list_button_active"
            : "trip_tab_list_button"
        }
        icon={<StarOutlined />}
        type="text"
        size="large"
        onClick={() => {
          setTabMode("keep");
        }}
      >
        我的收藏
      </Button>
    </Flex>
  );
};

export default TripTabList;
