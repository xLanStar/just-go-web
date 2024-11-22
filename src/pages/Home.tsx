import React, { useEffect } from "react";
import { useAppDispatch } from "../hooks";
import { useNavigate } from "react-router-dom";
import { setMode, setPage } from "../store/page/pageSlice";
import { Flex, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import TripList from "../components/TripList";
import { useLocalStorage } from "../hooks/useLocalStorage";

import "../assets/scss/home.scss"

const Home: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { getItem } = useLocalStorage();

  useEffect(() => {
    if (!getItem("jwtToken")) {
      navigate("/signin", { replace: true });
    }
    dispatch(setPage("行程探索"));
    dispatch(setMode("default"));
  }, [navigate]);

  return (
    <Flex
      className="Home"
      vertical
      justify="flex-start"
      align="center"
      style={{
        width: "100%",
      }}
    >
      <Flex
        vertical={false}
        justify="center"
        align="center"
        style={{
          width: "100%",
          height: "80px",
        }}
      >
        <Input
          className="search_bar"
          prefix={<SearchOutlined />}
          size="large"
          placeholder="請輸入地點、關鍵字"
        />
      </Flex>
      <TripList type="public" />
    </Flex>
  );
};

export default Home;
