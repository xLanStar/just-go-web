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
import { logout } from "../apis/auth";
import { useAppSelector } from "../hooks";
import { cursor, fullSize } from "../data/reference";
import { Mode } from "../types/modeInterface";

import "../assets/scss/layout.scss";

const { Header, Footer, Content } = AntdLayout;

const Layout = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const page = useAppSelector((state) => state.page.name);
  const mode = useAppSelector((state) => state.page.mode);

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
          }}
        >
          <Col sm={8} xs={15}>
            <Flex
              className="left_flex"
              vertical={false}
              justify="flex-start"
              align="center"
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
              <h2 className="left_title">{page}</h2>
            </Flex>
          </Col>
          <Col sm={8} xs={0}>
            <Flex
              vertical={false}
              justify="center"
              align="center"
              style={fullSize}
            >
              <h2 className="center_title">{page}</h2>
            </Flex>
          </Col>
          <Col sm={8} xs={9}>
            <Flex
              className="right_flex"
              vertical={false}
              justify="flex-end"
              align="center"
              style={fullSize}
            >
              {mode === Mode.Default ? (
                <>
                  <Button className="right_button" icon={<PlusOutlined />}>
                    建立新行程
                  </Button>
                  <Dropdown
                    className="right_menu"
                    menu={{ items: defaultMenu }}
                    placement="bottomRight"
                  >
                    <Button icon={<PlusOutlined />} type="text" size="large" />
                  </Dropdown>
                </>
              ) : null}
              {mode === Mode.Edit ? (
                <>
                  <Button className="right_button" icon={<SaveOutlined />}>
                    建立副本
                  </Button>
                  <Button className="right_button" icon={<HeartOutlined />}>
                    收藏
                  </Button>
                  <Dropdown
                    className="right_menu"
                    menu={{ items: editMenu }}
                    placement="bottomRight"
                  >
                    <Button icon={<PlusOutlined />} type="text" size="large" />
                  </Dropdown>
                </>
              ) : null}
              {mode === Mode.Share ? (
                <>
                  <Button
                    className="right_button"
                    icon={<InfoCircleOutlined />}
                  >
                    設定
                  </Button>
                  <Button className="right_button" icon={<LockOutlined />}>
                    共用
                  </Button>
                  <Button
                    className="right_button"
                    icon={<UsergroupAddOutlined />}
                  >
                    6
                  </Button>
                  <Dropdown
                    className="right_menu"
                    menu={{ items: shareMenu }}
                    placement="bottomRight"
                  >
                    <Button icon={<PlusOutlined />} type="text" size="large" />
                  </Dropdown>
                </>
              ) : null}
              <Dropdown
                className="right_menu"
                menu={{ items: rightMenu }}
                placement="bottomLeft"
              >
                <Button icon={<MenuOutlined />} type="text" size="large" />
              </Dropdown>
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
