import { CloseCircleOutlined, SaveOutlined } from "@ant-design/icons";
import { Form, Input, Modal, DatePicker, ConfigProvider, App } from "antd";
import Uploader from "./Uploader";
import { TripFrom } from "../types/formInterface";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createTrip } from "../apis/trip";
import { CommonRules } from "../data/form";
import { useLocalStorage } from "../hooks/useLocalStorage";

import "../assets/scss/tripModal.scss";

const { RangePicker } = DatePicker;

interface Props {
  open: boolean;
  handleClose: () => void;
}

const TripModal: React.FunctionComponent<Props> = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const localStorage = useLocalStorage();
  const { message } = App.useApp();
  const [form] = Form.useForm();

  const handleSubmit = async (form: TripFrom) => {
    try {
      await createTrip(
        form.name,
        form.image,
        form.date[0].format("YYYY-MM-DD"),
        form.date[1].format("YYYY-MM-DD")
      );
      navigate("/edit");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          localStorage.removeItem("user");
          localStorage.removeItem("jwtToken");
          navigate("/signin", { replace: true });
        } else if (error.status === 500) {
          message.error("系統發生錯誤");
        }
      }
      console.error(error);
    }
  };

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
          htmlType: "submit",
        }}
        cancelButtonProps={{
          icon: <CloseCircleOutlined />,
        }}
        modalRender={(dom) => (
          <Form
            form={form}
            layout="vertical"
            scrollToFirstError
            noValidate
            requiredMark={false}
            onFinish={handleSubmit}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="image"
          label="行程封面"
          valuePropName="value"
          getValueFromEvent={(e) => e?.[0]}
        >
          <Uploader />
        </Form.Item>
        <Form.Item
          name="name"
          label="行程名稱"
          validateTrigger="onBlur"
          rules={[CommonRules.Required]}
        >
          <Input size="large" placeholder="行程名稱" required />
        </Form.Item>
        <Form.Item
          name="date"
          label="行程日期"
          validateTrigger="onBlur"
          rules={[CommonRules.Required]}
        >
          <RangePicker className="trip_modal_form_item" size="large" />
        </Form.Item>
      </Modal>
    </ConfigProvider>
  );
};

export default TripModal;
