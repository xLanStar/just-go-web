import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks";
import { useNavigate } from "react-router-dom";
import { setMode, setPage } from "../store/page/pageSlice";
import { PageMode, TripInfoMode } from "../types/modeInterface";
import { App, Flex, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { TripInfo } from "../types/tripInterface";
import TripList from "../components/TripList";
import { loadTrips } from "../apis/trip";
import { useLocalStorage } from "../hooks/useLocalStorage";

import "../assets/scss/home.scss";

const Home: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const localStorage = useLocalStorage();
  const { message } = App.useApp();

  const [trips, setTrips] = useState<TripInfo[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) {
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
    <Flex className="home" vertical justify="flex-start" align="center">
      <Flex
        className="home_search_box"
        vertical={false}
        justify="center"
        align="center"
        style={{}}
      >
        <Input
          className="home_search"
          prefix={<SearchOutlined />}
          size="large"
          placeholder="請輸入地點、關鍵字"
        />
      </Flex>
      <h1 className="home_title">熱門行程</h1>
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
