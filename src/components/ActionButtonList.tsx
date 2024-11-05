import { Button } from "antd";
import {
  HeartOutlined,
  InfoCircleOutlined,
  LockOutlined,
  PlusOutlined,
  SaveOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { TripSettingDialog } from "./TripSettingDialog";
import { ShareSettingDialog } from "./ShareSettingDialog";

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
  const [isTripSettingDialogOpen, setTripSettingDialogOpen] = useState(false);
  const [isShareSettingDialogOpen, setShareSettingDialogOpen] = useState(false);
  return (
    <>
      {mode === "default" && (
        <Button className={className} icon={<PlusOutlined />} onClick={addTrip}>
          建立行程
        </Button>
      )}
      {mode === "edit" && (
        <>
          <TripSettingDialog isOpen={isTripSettingDialogOpen} onCancel={() => { setTripSettingDialogOpen(false) }} />
          <ShareSettingDialog isOpen={isShareSettingDialogOpen} onCancel={() => { setShareSettingDialogOpen(false) }} />
          <Button className={className} icon={<InfoCircleOutlined />} onClick={() => { setTripSettingDialogOpen(true) }}>
            設定
          </Button>
          <Button className={className} icon={<LockOutlined />} onClick={() => { setShareSettingDialogOpen(true) }}>
            共用
          </Button>
          <Button className={className} icon={<UsergroupAddOutlined />} onClick={() => { document.getElementById("memberList")!.style.display = 'flex' }}>
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
