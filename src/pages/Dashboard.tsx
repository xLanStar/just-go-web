import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJwtToken } from "../apis/auth";
import { App, Avatar, Button, Flex } from "antd";
import {
  AppstoreOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Color } from "../data/color";
import { useAppSelector } from "../hooks";
import TripList from "../components/TripList";

import "../assets/scss/dashboard.scss";

enum Mode {
  Own,
  Keep,
}

const Dashboard: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const user = useAppSelector((state) => state.user.user);

  const [listMode, setListMode] = useState<Mode>(Mode.Own);

  const buttonStyle = {
    borderEndStartRadius: "0px",
    borderEndEndRadius: "0px",
  };

  const buttonActive = {
    borderBottom: "1px solid black",
  };

  useEffect(() => {
    if (!getJwtToken()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <Flex
      vertical
      justify="center"
      align="center"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Flex
        vertical
        justify="flex-start"
        align="center"
        style={{
          width: "100%",
          height: "100%",
          overflowY: "auto",
        }}
      >
        <Flex
          className="user_info"
          vertical={false}
          justify="flex-start"
          align="center"
          gap="middle"
          style={{
            backgroundColor: Color.cyanHeavy,
            borderBottom: `1px solid ${Color.greyHeavy}`,
          }}
        >
          <Avatar size={80} icon={<UserOutlined />} />
          <Flex vertical justify="center" align="flex-start">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </Flex>
        </Flex>
        <Flex
          vertical={false}
          justify="center"
          align="center"
          style={{
            padding: "12px 0px",
            width: "100%",
          }}
        >
          <Button
            icon={<AppstoreOutlined />}
            type="text"
            size="large"
            style={
              listMode === Mode.Own
                ? {
                    ...buttonStyle,
                    ...buttonActive,
                  }
                : buttonStyle
            }
            onClick={() => {
              setListMode(Mode.Own);
            }}
          >
            我的行程
          </Button>
          <Button
            icon={<StarOutlined />}
            type="text"
            size="large"
            style={
              listMode === Mode.Keep
                ? {
                    ...buttonStyle,
                    ...buttonActive,
                  }
                : buttonStyle
            }
            onClick={() => {
              setListMode(Mode.Keep);
            }}
          >
            我的收藏
          </Button>
        </Flex>
        {listMode === Mode.Own ? (
          <>
            <TripList title="已發布行程" category="Publish" />
            <TripList title="我的行程" category="Own" />
            <TripList title="與我共編" category="CoEdit" />
          </>
        ) : (
          <TripList title="我的收藏" category="Favor" />
        )}
      </Flex>
    </Flex>
  );
};

export default Dashboard;
