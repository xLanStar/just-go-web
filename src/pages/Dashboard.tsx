import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setMode, setPage } from "../store/page/pageSlice";
import UserInfo from "../components/UserInfo";
import TripTabList from "../components/TripTabList";
import TripList from "../components/TripList";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Dashboard: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const { getItem } = useLocalStorage();

  const [tabMode, setTabMode] = useState<string>("own");

  useEffect(() => {
    if (!getItem("jwtToken")) {
      navigate("/", { replace: true });
    }
    dispatch(setPage("行程管理"));
    dispatch(setMode("default"));
  }, []);

  return (
    <Flex
      className="dashboard"
      vertical
      justify="flex-start"
      align="center"
      style={{
        width: "100%",
      }}
    >
      <UserInfo user={user} />
      <TripTabList
        tabMode={tabMode}
        setTabMode={(mode: string) => {
          setTabMode(mode);
        }}
      />
      <TripList type={tabMode} />
    </Flex>
  );
};

export default Dashboard;
