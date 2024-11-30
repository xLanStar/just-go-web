import { CloseCircleOutlined, SaveOutlined } from "@ant-design/icons";
import { Form, Input, Modal, DatePicker, ConfigProvider } from "antd";
import Uploader from "./Uploader";
import { TripFrom } from "../types/formInterface";
import { CommonRules } from "../data/form";
import useTripInfo from "../hooks/useTripInfo";
import { useNavigate } from "react-router-dom";

import "../assets/scss/tripModal.scss";

const { RangePicker } = DatePicker;

interface Props {
  open: boolean;
  handleClose: () => void;
}

const TripModal: React.FunctionComponent<Props> = ({ open, handleClose }) => {
  const navigate = useNavigate();

  const { createTrip } = useTripInfo("");
  const [form] = Form.useForm();

  const handleSubmit = async (form: TripFrom) => {
    const tripInfo = await createTrip(
      form.name,
      form.image,
      form.date[0].format("YYYY-MM-DD"),
      form.date[1].format("YYYY-MM-DD")
    );

    navigate(`/trip/${tripInfo.id}`);
    handleClose();
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
        onCancel={() => {
          handleClose();
          form.resetFields();
        }}
        afterClose={() => {
          form.resetFields();
        }}
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
