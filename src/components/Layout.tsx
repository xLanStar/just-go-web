import {
  CalendarOutlined,
  LogoutOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout as AntdLayout, Button, Dropdown, Space } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

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
      onClick: () => navigate("/signin"),
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
        }}
      >
        <Space>
          (Logo)
          <Button icon={<CalendarOutlined />} type="text">
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
