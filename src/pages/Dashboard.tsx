import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setMode, setPage } from "../store/page/pageSlice";
import UserInfo from "../components/UserInfo";
import TripTabList from "../components/TripTabList";
import TripList from "../components/TripList";

import "../assets/scss/dashboard.scss";
import { getJwtToken } from "../apis/auth";

const Dashboard: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const [tabMode, setTabMode] = useState<string>("own");

  useEffect(() => {
    if (!getJwtToken()) {
      navigate("/", { replace: true });
    }
    dispatch(setPage("行程管理"));
    dispatch(setMode("default"));
  }, []);

  return (
    <Flex className="dashboard" vertical justify="flex-start" align="center">
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
