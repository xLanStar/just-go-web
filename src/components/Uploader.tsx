import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";

import "../assets/scss/uploader.scss";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface Props {
  value?: UploadFile[];
  onChange?: (fileList: UploadFile[]) => void;
}

const Uploader: React.FunctionComponent<Props> = ({ value = [], onChange }) => {
  const [image, setImage] = useState<UploadFile[]>(value);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleUpload = (file: FileType) => {
    const isImage = file.type === "image/png" || file.type === "image/jpeg";

    if (!isImage) {
      message.error(`${file.name}不是一個圖片檔`);
      return Upload.LIST_IGNORE;
    }

    setImage([file]);
    setImageUrl(URL.createObjectURL(file));

    // 通知 Form 組件更新
    if (onChange) {
      onChange([file]);
    }

    return false;
  };

  return (
    <Upload
      name="image"
      className="uploader"
      listType="picture-card"
      beforeUpload={handleUpload}
      showUploadList={false}
      fileList={image}
      maxCount={1}
    >
      {imageUrl ? (
        <img className="uploader_image" src={imageUrl} alt="image" />
      ) : (
        <button className="uploader_button" type="button">
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
      )}
    </Upload>
  );
};

export default Uploader;
