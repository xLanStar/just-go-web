import { MutableRefObject } from "react";
import { ConfigProvider, Flex, Input, Tabs, TabsProps } from "antd";
import {
  CarOutlined,
  CoffeeOutlined,
  HomeOutlined,
  SearchOutlined,
  ShoppingOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Autocomplete } from "@react-google-maps/api";
import type { AutoComplete } from "../types/googleMapInterface";

import "../assets/scss/searchBar.scss";

interface Props {
  autoCompleteRef: MutableRefObject<AutoComplete | undefined>;
  onSearchTypeChanged: (key: string) => void;
  onPlaceChanged: () => void;
}

const SearchBar: React.FunctionComponent<Props> = ({
  autoCompleteRef,
  onSearchTypeChanged,
  onPlaceChanged,
}) => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "景點",
      icon: <StarOutlined />,
    },
    {
      key: "2",
      label: "住宿",
      icon: <HomeOutlined />,
    },
    {
      key: "3",
      label: "購物",
      icon: <ShoppingOutlined />,
    },
    {
      key: "4",
      label: "餐廳",
      icon: <CoffeeOutlined />,
    },
    {
      key: "5",
      label: "交通",
      icon: <CarOutlined />,
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            horizontalItemGutter: 16,
            horizontalMargin: "0px",
            horizontalItemPadding: "9px 0px",
          },
        },
      }}
    >
      <Flex
        className="search_bar"
        vertical={false}
        justify="flex-start"
        align="center"
        gap="small"
      >
        <Autocomplete
          onLoad={(autocompleteRef) => {
            autoCompleteRef.current = autocompleteRef;
          }}
          onPlaceChanged={onPlaceChanged}
        >
          <Input
            className="search_bar_input"
            prefix={<SearchOutlined />}
            size="large"
            placeholder="請輸入地點、關鍵字"
          />
        </Autocomplete>
        <Tabs
          className="search_bar_place_type"
          defaultActiveKey="1"
          items={items}
          onTabClick={(key: string) => onSearchTypeChanged(key)}
        />
      </Flex>
    </ConfigProvider>
  );
};

export default SearchBar;
