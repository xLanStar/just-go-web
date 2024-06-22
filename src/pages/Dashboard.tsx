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

const Dashboard: React.FunctionComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getJwtToken()) {
      navigate("/dashboard", { replace: true });
    }
    navigate("/dashboard", { replace: true });
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
        }}
      >
        <Flex
          vertical={false}
          justify="flex-start"
          align="center"
          gap="middle"
          style={{
            padding: "24px 64px",
            width: "100%",
            backgroundColor: Color.cyanHeavy,
            borderBottom: `1px solid ${Color.greyHeavy}`,
          }}
        >
          <Avatar size={80} icon={<UserOutlined />} />
          <Flex vertical justify="center" align="flex-start">
            <h2>flystar0526</h2>
            <p>flowermetoer@gmail.com</p>
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
          vertical={false}
          justify="flex-start"
          align="center"
          style={{
            padding: "0px 64px",
            width: "100%",
          }}
        >
          <h1>已發布行程</h1>
        </Flex>
        <Flex
          vertical={false}
          justify="center"
          align="center"
          style={{
            padding: "0px 64px",
            width: "100%",
          }}
        >
          <Row gutter={24}>
            <Col span={6}>
              <TripCard
                image="src/assets/taipei101.jpg"
                title="台北一日遊"
                update={5}
                labels={["台北", "101"]}
                like={1}
                isShare={true}
              />
            </Col>
            <Col span={6}>
              <TripCard
                image="src/assets/taipei101.jpg"
                title="台北一日遊"
                update={5}
                labels={["台北", "101"]}
                like={1}
                isShare={true}
              />
            </Col>
            <Col span={6}>
              <TripCard
                image="src/assets/taipei101.jpg"
                title="台北一日遊"
                update={5}
                labels={["台北", "101"]}
                like={1}
                isShare={true}
              />
            </Col>
            <Col span={6}>
              <TripCard
                image="src/assets/taipei101.jpg"
                title="台北一日遊"
                update={5}
                labels={["台北", "101"]}
                like={1}
                isShare={true}
              />
            </Col>
          </Row>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
