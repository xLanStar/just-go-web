import { Avatar, Dropdown, MenuProps } from "antd";
import {
  CalendarOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import "../assets/scss/avatarMenu.scss";

interface Props {
  avatarUrl: string;
}

/**
 * AvatarMenu component renders a dropdown menu that appears when the user clicks on their avatar.
 * The menu contains options for managing trips, settings, and logging out.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {string} props.avatarUrl - The URL of the user's avatar image.
 *
 * @returns {JSX.Element} The rendered AvatarMenu component.
 *
 * @example
 * <AvatarMenu avatarUrl="https://example.com/avatar.jpg" />
 *
 * @remarks
 * This component uses the `useNavigate` hook from `react-router-dom` to navigate to different routes.
 * It also uses `localStorage` to remove user data upon logout.
 */
const AvatarMenu: React.FunctionComponent<Props> = ({ avatarUrl }) => {
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
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
    <Dropdown className="avatar_menu" menu={{ items }} placement="bottomRight">
      {avatarUrl ? (
        <Avatar
          className="avatar_menu_image"
          src={<img src={"https://voidcloud.net" + avatarUrl} alt="avatar" />}
          size="large"
        />
      ) : (
        <Avatar
          className="avatar_menu_image"
          icon={<UserOutlined />}
          size="large"
        />
      )}
    </Dropdown>
  );
};

export default AvatarMenu;
