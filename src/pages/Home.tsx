import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks";
import { useNavigate } from "react-router-dom";
import { getJwtToken } from "../apis/auth";
import { setMode, setPage } from "../store/page/pageSlice";
import { PageMode, TripInfoMode } from "../types/modeInterface";
import { App, Flex, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { TripInfo } from "../types/tripInterface";
import TripList from "../components/TripList";
import { loadTrips } from "../apis/trip";

import "../assets/scss/home.scss";

const Home: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { message } = App.useApp();

  const [trips, setTrips] = useState<TripInfo[]>([]);

  useEffect(() => {
    if (!getJwtToken()) {
      navigate("/signin", { replace: true });
    }
    dispatch(setPage("行程探索"));
    dispatch(setMode(PageMode.Default));

    loadTrips()
      .then((tripList) => setTrips(tripList))
      .catch((error: any) => {
        if (error.name === "ResponseError") {
          message.error("載入行程失敗");
        } else {
          message.error(error.message);
        }
      });
  }, [navigate]);

  return (
    <Flex
      className="home"
      vertical
      justify="flex-start"
      align="center"
      style={{
        width: "100%",
        minHeight: "100%",
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
      <h1
        style={{
          padding: "12px 0px 12px 128px",
          width: "100%",
        }}
      >
        熱門行程
      </h1>
      <TripList
        trips={trips}
        mode={TripInfoMode.Public}
        isPublic={true}
        isDelete={false}
      />
    </Flex>
  );
};

export default Home;
