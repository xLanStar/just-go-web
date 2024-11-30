import { Button } from "antd";
import {
  InfoCircleOutlined,
  LockOutlined,
  PlusOutlined,
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
          <Button
            className={className}
            icon={<InfoCircleOutlined />}
            onClick={onTripSetting}
          >
            行程資訊
          </Button>
        </>
      )}
    </>
  );
};

export default ActionButtonList;
