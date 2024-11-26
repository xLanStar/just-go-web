import React, { useEffect } from "react";
import { useAppDispatch } from "../hooks";
import { useNavigate } from "react-router-dom";
import { setMode, setPage } from "../store/page/pageSlice";
import { Flex } from "antd";
import TripList from "../components/TripList";
import { useLocalStorage } from "../hooks/useLocalStorage";

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
      className="home"
      vertical
      justify="flex-start"
      align="center"
      style={{
        width: "100%",
      }}
    >
      <Flex
        className="home-title"
        vertical={false}
        justify="center"
        align="center"
        style={{
          width: "100%",
          height: "80px",
        }}
      >
        <h1>熱門行程</h1>
      </Flex>
      <TripList type="public" />
    </Flex>
  );
};

export default Home;
