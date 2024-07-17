import {
  CalendarOutlined,
  CompassOutlined,
  LogoutOutlined,
  MenuOutlined,
  PlusOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Layout as AntdLayout,
  Avatar,
  Button,
  Col,
  Dropdown,
  Flex,
  Row,
} from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../apis/auth";
import { useAppSelector } from "../hooks";
import { cursor, fullSize } from "../data/reference";

import "../assets/scss/layout.scss";

const { Header, Footer, Content } = AntdLayout;

const Layout = () => {
  const navigate = useNavigate();
  const page = useAppSelector((state) => state.page.name);
  const user = useAppSelector((state) => state.user.user);

  const buttonMenu: MenuProps["items"] = [
    {
      key: "add_trip",
      icon: <PlusOutlined />,
      label: "建立行程",
    },
    {
      key: "explore",
      icon: <CompassOutlined />,
      label: "景點探索",
      onClick: () => {
        navigate("/explore");
      },
    },
    {
      key: "trip_plan",
      icon: <CalendarOutlined />,
      label: "行程規劃",
      onClick: () => {
        navigate("/dashboard");
      },
    },
  ];

  const avatarMenu: MenuProps["items"] = [
    {
      key: "trip_manage",
      icon: <CalendarOutlined />,
      label: "行程管理",
      onClick: () => {
        navigate("/dashboard");
      },
    },
    {
      key: "setting",
      icon: <SettingOutlined />,
      label: "設定",
      onClick: () => {
        navigate("/profile");
      },
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "登出",
      onClick: () => {
        logout();
        navigate("/signin");
      },
    },
  ];

  return (
    <AntdLayout style={{ height: "100%" }}>
      <Header>
        <Row
          style={{
            height: 64,
            lineHeight: "64px",
            overflowX: "auto",
          }}
        >
          <Col xs={6} sm={8}>
            <Flex
              vertical={false}
              justify="flex-start"
              align="center"
              gap="small"
              style={fullSize}
            >
              <img
                className="logo"
                src="src/assets/logo.png"
                alt="logo"
                onClick={() => navigate("/")}
                style={cursor}
              />
              <Button
                className="navigate_bar"
                icon={<CompassOutlined />}
                type="text"
                onClick={() => navigate("/explore")}
              >
                景點探索
              </Button>
              <Button
                className="navigate_bar"
                icon={<CalendarOutlined />}
                type="text"
                onClick={() => navigate("/dashboard")}
              >
                行程規劃
              </Button>
            </Flex>
          </Col>
          <Col xs={12} sm={8}>
            <Flex
              vertical={false}
              justify="center"
              align="center"
              style={fullSize}
            >
              <h2 className="title_name">{page}</h2>
            </Flex>
          </Col>
          <Col xs={6} sm={8}>
            <Flex
              className="right_flex"
              vertical={false}
              justify="flex-end"
              align="center"
              style={fullSize}
            >
              <Dropdown
                className="button_menu"
                menu={{ items: buttonMenu }}
                placement="bottomLeft"
              >
                <Button icon={<MenuOutlined />} type="text" size="large" />
              </Dropdown>
              <Button className="add_trip" icon={<PlusOutlined />}>
                建立新行程
              </Button>
              <Dropdown menu={{ items: avatarMenu }} placement="bottomRight">
                {user.avatar ? (
                  <Avatar
                    src={<img src={user.avatar} alt="avatar" />}
                    size="large"
                    style={cursor}
                  />
                ) : (
                  <Avatar icon={<UserOutlined />} size="large" style={cursor} />
                )}
              </Dropdown>
            </Flex>
          </Col>
        </Row>
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: "center" }}>Copyright©2024 JustGo</Footer>
    </AntdLayout>
  );
};

export default Layout;
