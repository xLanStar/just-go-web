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

/**
 * NavButtonList component renders a list of navigation buttons or a dropdown menu
 * based on the provided mode. It uses Ant Design components for UI elements.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {string} props.className - The CSS class name to apply to the container div.
 * @param {"button" | "menu"} props.mode - The mode in which to render the navigation items.
 *   - "button": Renders individual buttons for each navigation item.
 *   - "menu": Renders a dropdown menu containing the navigation items.
 *
 * @returns {JSX.Element} The rendered NavButtonList component.
 */
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
