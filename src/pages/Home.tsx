import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks";
import { useNavigate } from "react-router-dom";
import { setMode, setPage } from "../store/page/pageSlice";
import { App, Flex, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { TripInfo } from "../types/tripInterface";
import TripList from "../components/TripList";
// import "../assets/scss/home.scss";
import "./Home.css";
import testImg from "../assets/image/taipei101.jpg";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Home: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { getItem } = useLocalStorage();

  const { message } = App.useApp();

  const [trips, setTrips] = useState<TripInfo[]>(randomCreate());
  
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

      <TripList type="public" />
    </Flex>
  );
};

export default Home;
function randomCreate(): TripInfo[] {
  let result: TripInfo[] = [];
  const count: number = Math.floor(10 + Math.random() * 10);
  for (let i = 0; i < count; i++) {
    result.push({
      id: "1",
      user: "user",
      userId: "userId",
      title: "title",
      image: testImg,
      day: Math.floor(1 + Math.random() * 7),
      publishDay: "publisDay",
      labels: ["labels"],
      like: Math.floor(1 + Math.random() * 100),
      isLike: true,
      isPublic: true,
    });
  }
  return result;
}
