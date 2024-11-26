import { useNavigate } from "react-router-dom";
import {
  CalendarOutlined,
  CompassOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";

interface Props {
  className?: string;
  mode: string;
}

const NavButtonList: React.FunctionComponent<Props> = ({ className, mode }) => {
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
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

  return (
    <div className={className}>
      {mode === "button" && (
        <>
          <Button
            icon={<CompassOutlined />}
            type="text"
            onClick={() => navigate("/explore")}
          >
            景點探索
          </Button>
          <Button
            icon={<CalendarOutlined />}
            type="text"
            onClick={() => navigate("/dashboard")}
          >
            行程規劃
          </Button>{" "}
        </>
      )}
      {mode === "menu" && (
        <Dropdown menu={{ items }} placement="bottomLeft">
          <Button icon={<MenuOutlined />} type="text" size="large" />
        </Dropdown>
      )}
    </div>
  );
};

export default NavButtonList;
