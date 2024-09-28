import { Button } from "antd";
import {
  HeartOutlined,
  InfoCircleOutlined,
  LockOutlined,
  PlusOutlined,
  SaveOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

interface Props {
  className?: string;
  mode: string;
  addTrip: () => void;
}

/**
 * `ActionButtonList` is a functional component that renders a list of action buttons
 * based on the provided `mode` prop. It supports three modes: "default", "edit", and "share".
 *
 * @param {Object} props - The props object.
 * @param {string} props.className - The CSS class name to apply to the container div.
 * @param {"default" | "edit" | "share"} props.mode - The mode that determines which buttons to display.
 *
 * @returns {JSX.Element} The rendered list of action buttons.
 */
const ActionButtonList: React.FunctionComponent<Props> = ({
  className,
  mode,
  addTrip,
}) => {
  return (
    <>
      {mode === "default" && (
        <Button className={className} icon={<PlusOutlined />} onClick={addTrip}>
          建立行程
        </Button>
      )}
      {mode === "edit" && (
        <>
          <Button className={className} icon={<InfoCircleOutlined />}>
            設定
          </Button>
          <Button className={className} icon={<LockOutlined />}>
            共用
          </Button>
          <Button className={className} icon={<UsergroupAddOutlined />}>
            6
          </Button>
        </>
      )}
      {mode === "share" && (
        <>
          <Button className={className} icon={<SaveOutlined />}>
            建立副本
          </Button>
          <Button className={className} icon={<HeartOutlined />}>
            收藏
          </Button>
        </>
      )}
    </>
  );
};

export default ActionButtonList;
