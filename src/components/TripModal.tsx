import {
  CloseCircleOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Form, Input, Modal, DatePicker, Upload, ConfigProvider } from "antd";
import { useState } from "react";

import "../assets/scss/tripModal.scss";

const { RangePicker } = DatePicker;

interface Props {
  open: boolean;
  handleClose: () => void;
}

const TripModal: React.FunctionComponent<Props> = ({ open, handleClose }) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            titleFontSize: 24,
          },
          Form: {
            labelFontSize: 16,
            itemMarginBottom: 16,
          },
        },
      }}
    >
      <Modal
        className="trip_modal"
        title="建立行程"
        centered
        open={open}
        onCancel={handleClose}
        destroyOnClose
        okButtonProps={{
          icon: <SaveOutlined />,
        }}
        cancelButtonProps={{
          icon: <CloseCircleOutlined />,
        }}
        modalRender={(dom) => (
          <Form layout="vertical" scrollToFirstError noValidate>
            {dom}
          </Form>
        )}
      >
        <Form.Item name="image" label="行程封面">
          <Upload
            name="image"
            listType="picture-card"
            className="trip_modal_image_uploader"
            showUploadList={false}
          >
            {imageUrl ? (
              <img className="trip_modal_image" src={imageUrl} alt="image" />
            ) : (
              <button className="trip_modal_upload_button" type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            )}
          </Upload>
        </Form.Item>
        <Form.Item name="name" label="行程名稱">
          <Input size="large" placeholder="行程名稱" required />
        </Form.Item>
        <Form.Item name="date" label="行程日期">
          <RangePicker className="trip_modal_form_item" size="large" />
        </Form.Item>
      </Modal>
    </ConfigProvider>
  );
};

export default TripModal;
