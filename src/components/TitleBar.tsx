import {
  CalendarOutlined,
  LogoutOutlined,
  UserOutlined,
  CompassOutlined,
  SettingOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space, Row, Col } from "antd";
import Logo from "../image/logo.png";

export const TitleBar = () => {

  const items: MenuProps["items"] = [
    {
      key: "1",
      icon: <CalendarOutlined />,
      label: "行程管理",
    },
    {
      key: "2",
      icon: <SettingOutlined />,
      label: "設定",
    },
    {
      key: "3",
      icon: <LogoutOutlined />,
      label: "登出",
    },
  ];

  return (
    <Row style={{
      display: "flex",
      height: 60,
      width: '100%',
      lineHeight: '5px',
      paddingInline: "10px",
      alignItems: 'center',
      backgroundColor: "white",
    }}>
      <Col span={8} style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Space>
          <img src={Logo} style={{ height: "50px" }} />
          <Button icon={<CompassOutlined />} type="text">景點探索</Button>
          <Button icon={<CalendarOutlined />} type="text">行程規劃</Button>
        </Space>
      </Col>
      <Col span={8} style={{ display: 'flex', justifyContent: 'center'}}>
        <h2>景點探索</h2>
      </Col>
      <Col span={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Space>
          <Dropdown menu={{ items }} placement="bottomRight">
            <Button
              icon={<UserOutlined />}
              shape="circle"
              type="text"
              size="large"
            />
          </Dropdown>
        </Space>
      </Col>
    </Row>
  );
};
