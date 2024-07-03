import {
  CalendarOutlined,
  CompassOutlined,
  LogoutOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout as AntdLayout, Button, Dropdown, Space } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../apis/auth";

const { Header, Footer, Content } = AntdLayout;

const Layout = () => {
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "基本資料",
    },
    {
      key: "2",
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
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 64,
          paddingInline: 48,
          lineHeight: "64px",
          backgroundColor: "white",
          overflowX: "auto",
        }}
      >
        <Space>
          <img src="src/assets/logo.png" alt="logo" height={48} />
          <Button icon={<CompassOutlined />} type="text">
            景點探索
          </Button>
          <Button
            icon={<CalendarOutlined />}
            type="text"
            onClick={() => navigate("/dashboard")}
          >
            規劃行程
          </Button>
        </Space>
        <Space>
          <Button icon={<PlusOutlined />}>建立新行程</Button>
          <Dropdown menu={{ items }} placement="bottomRight">
            <Button
              icon={<UserOutlined />}
              shape="circle"
              type="text"
              size="large"
            />
          </Dropdown>
        </Space>
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: "center" }}>Copyright©2024 JustGo</Footer>
    </AntdLayout>
  );
};

export default Layout;
