import { Button, Dropdown, MenuProps } from "antd";
import {
  HeartOutlined,
  InfoCircleOutlined,
  LockOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";

interface Props {
  className?: string;
  mode: string;
  onCreateTrip: () => void;
  onTripSetting: () => void;
}

const ActionMenu: React.FunctionComponent<Props> = ({
  className,
  mode,
  onCreateTrip,
  onTripSetting,
}) => {
  const defaultItems: MenuProps["items"] = [
    {
      key: "add_trip",
      icon: <PlusOutlined />,
      label: "建立行程",
      onClick: onCreateTrip,
    },
  ];

  const editItems: MenuProps["items"] = [
    {
      key: "trip_setting",
      icon: <InfoCircleOutlined />,
      label: "設定",
      onClick: onTripSetting,
    },
    {
      key: "co_edit",
      icon: <LockOutlined />,
      label: "共用",
    },
  ];

  const shareItems: MenuProps["items"] = [
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

  let items: MenuProps["items"];

  switch (mode) {
    case "edit":
      items = editItems;
      break;
    case "share":
      items = shareItems;
      break;
    default:
      items = defaultItems;
  }

  return (
    <Dropdown
      className={className}
      menu={{
        items,
      }}
      placement="bottomRight"
    >
      <Button icon={<PlusOutlined />} type="text" size="large" />
    </Dropdown>
  );
};

export default ActionMenu;
