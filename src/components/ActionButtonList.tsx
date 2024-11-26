import { Button } from "antd";
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

const ActionButtonList: React.FunctionComponent<Props> = ({
  className,
  mode,
  onCreateTrip,
  onTripSetting,
}) => {
  return (
    <>
      {(mode === "default" || mode === "explore") && (
        <Button
          className={className}
          icon={<PlusOutlined />}
          onClick={onCreateTrip}
        >
          建立行程
        </Button>
      )}
      {mode === "edit" && (
        <>
          <Button
            className={className}
            icon={<InfoCircleOutlined />}
            onClick={onTripSetting}
          >
            設定
          </Button>
          <Button className={className} icon={<LockOutlined />}>
            共用
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
