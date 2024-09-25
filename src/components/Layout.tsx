import {
  CalendarOutlined,
  CompassOutlined,
  HeartOutlined,
  InfoCircleOutlined,
  LockOutlined,
  LogoutOutlined,
  MenuOutlined,
  PlusOutlined,
  SaveOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
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
import { useAppSelector } from "../hooks";
import { PageMode } from "../types/modeInterface";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useState } from "react";
import TripModal from "./TripModal";

import "../assets/scss/layout.scss";

const { Header, Footer, Content } = AntdLayout;

const Layout = () => {
  const navigate = useNavigate();
  const localStorage = useLocalStorage();
  const user = useAppSelector((state) => state.user.user);
  const page = useAppSelector((state) => state.page.name);
  const mode = useAppSelector((state) => state.page.mode);

  const [showTripModal, setShowTripModal] = useState<boolean>(false);

  const defaultMenu: MenuProps["items"] = [
    {
      key: "add_trip",
      icon: <PlusOutlined />,
      label: "建立行程",
    },
  ];

  const editMenu: MenuProps["items"] = [
    {
      key: "copy_trip",
      icon: <SaveOutlined />,
      label: "建立副本",
    },
    {
      key: "keep_trip",
      icon: <HeartOutlined />,
      label: "收藏",
    },
  ];

  const shareMenu: MenuProps["items"] = [
    {
      key: "trip_setting",
      icon: <InfoCircleOutlined />,
      label: "設定",
    },
    {
      key: "co_edit",
      icon: <LockOutlined />,
      label: "共用",
    },
  ];

  const rightMenu: MenuProps["items"] = [
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
        localStorage.removeItem("user");
        localStorage.removeItem("jwtToken");
        navigate("/signin");
      },
    },
  ];

  return (
    <AntdLayout
      className="layout"
      style={{
        width: "100%",
        minHeight: "100%",
      }}
    >
      <Header className="layout_header">
        <Row className="layout_content">
          <Col sm={8} xs={15}>
            <Flex
              className="layout_content_left"
              vertical={false}
              justify="flex-start"
              align="center"
            >
              <img
                className="layout_logo"
                src="/src/assets/image/logo.png"
                alt="logo"
                onClick={() => navigate("/")}
              />
              <Button
                className="layout_nav_button"
                icon={<CompassOutlined />}
                type="text"
                onClick={() => navigate("/explore")}
              >
                景點探索
              </Button>
              <Button
                className="layout_nav_button"
                icon={<CalendarOutlined />}
                type="text"
                onClick={() => navigate("/dashboard")}
              >
                行程規劃
              </Button>
              <h2 className="layout_content_left_title">{page}</h2>
            </Flex>
          </Col>
          <Col sm={8} xs={0}>
            <Flex
              className="layout_content_center"
              vertical={false}
              justify="center"
              align="center"
            >
              <h2 className="layout_content_center_title">{page}</h2>
            </Flex>
          </Col>
          <Col sm={8} xs={9}>
            <Flex
              className="layout_content_right"
              vertical={false}
              justify="flex-end"
              align="center"
            >
              {mode === PageMode.Default || mode === PageMode.Explore ? (
                <>
                  <Button
                    className="layout_action_button"
                    icon={<PlusOutlined />}
                    onClick={() => setShowTripModal(true)}
                  >
                    建立新行程
                  </Button>
                  <Dropdown
                    className="layout_action_menu"
                    menu={{ items: defaultMenu }}
                    placement="bottomRight"
                  >
                    <Button icon={<PlusOutlined />} type="text" size="large" />
                  </Dropdown>
                </>
              ) : null}
              {mode === PageMode.Edit ? (
                <>
                  <Button
                    className="layout_action_button"
                    icon={<InfoCircleOutlined />}
                  >
                    設定
                  </Button>
                  <Button
                    className="layout_action_button"
                    icon={<LockOutlined />}
                  >
                    共用
                  </Button>
                  <Button
                    className="layout_action_buttom"
                    icon={<UsergroupAddOutlined />}
                  >
                    6
                  </Button>
                  <Dropdown
                    className="layout_action_menu"
                    menu={{ items: shareMenu }}
                    placement="bottomRight"
                  >
                    <Button icon={<PlusOutlined />} type="text" size="large" />
                  </Dropdown>
                </>
              ) : null}
              {mode === PageMode.Share ? (
                <>
                  <Button
                    className="layout_action_button"
                    icon={<SaveOutlined />}
                  >
                    建立副本
                  </Button>
                  <Button
                    className="layout_action_button"
                    icon={<HeartOutlined />}
                  >
                    收藏
                  </Button>
                  <Dropdown
                    className="layout_action_menu"
                    menu={{ items: editMenu }}
                    placement="bottomRight"
                  >
                    <Button icon={<PlusOutlined />} type="text" size="large" />
                  </Dropdown>
                </>
              ) : null}
              <Dropdown
                className="layout_action_menu"
                menu={{ items: rightMenu }}
                placement="bottomLeft"
              >
                <Button icon={<MenuOutlined />} type="text" size="large" />
              </Dropdown>
              <Dropdown menu={{ items: avatarMenu }} placement="bottomRight">
                {user.avatar ? (
                  <Avatar
                    className="layout_user_avatar"
                    src={<img src={user.avatar} alt="avatar" />}
                    size="large"
                  />
                ) : (
                  <Avatar
                    className="layout_user_avatar"
                    icon={<UserOutlined />}
                    size="large"
                  />
                )}
              </Dropdown>
            </Flex>
          </Col>
        </Row>
      </Header>
      <Content className="layout_outlet">
        <Outlet />
        {showTripModal ? (
          <TripModal
            open={showTripModal}
            handleClose={() => setShowTripModal(false)}
          />
        ) : null}
      </Content>
      {mode === PageMode.Default ? (
        <Footer className="layout_footer">Copyright©2024 JustGo</Footer>
      ) : null}
    </AntdLayout>
  );
};

export default Layout;
