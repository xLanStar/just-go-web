import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getJwtToken } from "../apis/auth";
import { Avatar, Button, Col, Flex, Row } from "antd";
import {
  AppstoreOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import TripCard from "../components/TripCard";
import { Color } from "../data/color";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getTripList } from "../apis/trip";
import { setTripList } from "../feature/trip/tripSlice";
import "../assets/scss/dashboard.scss";

const Dashboard: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const tripList = useAppSelector((state) => state.trip.tripList);

  useEffect(() => {
    if (!getJwtToken()) {
      navigate("/", { replace: true });
    }
    try {
      getTripList().then((res) => {
        dispatch(setTripList(res.data));
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
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
          <Button icon={<AppstoreOutlined />} type="text" size="large">
            我的行程
          </Button>
          <Button icon={<StarOutlined />} type="text" size="large">
            我的收藏
          </Button>
        </Flex>
        <Flex
          className="trip_type"
          vertical={false}
          justify="flex-start"
          align="center"
        >
          <h1>已發布行程</h1>
        </Flex>
        <Row className="trip_list" gutter={[16, 16]} justify="start">
          {tripList
            .filter((trip) => trip.type === "Published")
            .map((trip) => (
              <Col key={trip.id} sm={24} md={12} lg={8} xl={6}>
                <Flex
                  vertical
                  justify="center"
                  align="center"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <TripCard
                    title={trip.title}
                    image={trip.image}
                    update={trip.update}
                    labels={trip.labels}
                    like={trip.like}
                    isShare={trip.isShare}
                  />
                </Flex>
              </Col>
            ))}
        </Row>
        <Flex
          className="trip_type"
          vertical={false}
          justify="flex-start"
          align="center"
        >
          <h1>我的行程</h1>
        </Flex>
        <Row className="trip_list" gutter={[16, 16]} justify="start">
          {tripList
            .filter((trip) => trip.type === "Mine")
            .map((trip) => (
              <Col key={trip.id} sm={24} md={12} lg={8} xl={6}>
                <Flex
                  vertical
                  justify="center"
                  align="center"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <TripCard
                    title={trip.title}
                    image={trip.image}
                    update={trip.update}
                    labels={trip.labels}
                    like={trip.like}
                    isShare={trip.isShare}
                  />
                </Flex>
              </Col>
            ))}
        </Row>
        <Flex
          className="trip_type"
          vertical={false}
          justify="flex-start"
          align="center"
        >
          <h1>與我共編</h1>
        </Flex>
        <Row className="trip_list" gutter={[16, 16]} justify="start">
          {tripList
            .filter((trip) => trip.type === "Keep")
            .map((trip) => (
              <Col key={trip.id} sm={24} md={12} lg={8} xl={6}>
                <Flex
                  vertical
                  justify="center"
                  align="center"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <TripCard
                    title={trip.title}
                    image={trip.image}
                    update={trip.update}
                    labels={trip.labels}
                    like={trip.like}
                    isShare={trip.isShare}
                  />
                </Flex>
              </Col>
            ))}
        </Row>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
