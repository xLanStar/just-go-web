import {
  CloseCircleOutlined,
  SaveOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Form, Input, Modal, ConfigProvider, Flex, Button, Tag } from "antd";
import Uploader from "./Uploader";
import { CommonRules } from "../data/form";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect, useState } from "react";
import TagEditList from "./TagEditList";
import { TripEditFrom } from "../types/formInterface";
import useTripInfo from "../hooks/useTripInfo";
import { setCurrentTrip } from "../store/trip/tripSlice";

import "../assets/scss/tripEditModal.scss";

const { TextArea } = Input;

interface Props {
  open: boolean;
  mode: "Read" | "Edit";
  handleClose: () => void;
}

const TripEditModal: React.FunctionComponent<Props> = ({
  open,
  mode,
  handleClose,
}) => {
  const dispatch = useAppDispatch();

  const currentTrip = useAppSelector((state) => state.trip.currentTrip);

  const { updateTripInfo, publishTrip } = useTripInfo("");

  const [form] = Form.useForm();

  const [labels, setLabels] = useState<string[]>(currentTrip?.labels || []);

  useEffect(() => {
    setLabels(currentTrip?.labels || []);
  }, [currentTrip]);

  const handleSubmit = async (form: TripEditFrom) => {
    const tripInfo = await updateTripInfo(
      currentTrip?.id as string,
      form.name,
      form.image,
      form.description,
      labels
    );
    dispatch(setCurrentTrip(tripInfo));
    handleClose();
  };

  const handlePublish = async () => {
    const tripInfo = await publishTrip(
      currentTrip?.id as string,
      !currentTrip?.isPublic
    );
    dispatch(setCurrentTrip(tripInfo));
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
        className="trip-edit-modal"
        title={mode === "Read" ? "行程資訊" : "編輯行程"}
        centered
        open={open}
        onCancel={() => {
          handleClose();
          form.resetFields();
          setLabels(currentTrip?.labels || []);
        }}
        afterClose={() => {
          form.resetFields();
          setLabels(currentTrip?.labels || []);
        }}
        destroyOnClose
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            {mode === "Edit" && (
              <>
                <Button
                  className="trip-edit-modal-publish-button"
                  icon={<SendOutlined />}
                  onClick={handlePublish}
                >
                  {currentTrip?.isPublic ? "取消發布" : "發布"}
                </Button>
                <CancelBtn />
                <OkBtn />
              </>
            )}
          </>
        )}
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
          {mode === "Read" ? (
            <img
              className="trip-edit-modal-image"
              src={"https://voidcloud.net" + currentTrip?.image}
              alt="trip"
            />
          ) : (
            <Uploader
              defaultImageUrl={"https://voidcloud.net" + currentTrip?.image}
            />
          )}
        </Form.Item>
        <Form.Item
          name="name"
          label="行程名稱"
          validateTrigger="onBlur"
          initialValue={currentTrip?.title}
          rules={[CommonRules.Required]}
        >
          <Input
            size="large"
            placeholder="行程名稱"
            disabled={mode === "Read"}
            required
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="行程介紹"
          validateTrigger="onBlur"
          initialValue={currentTrip?.description}
        >
          <TextArea
            size="large"
            placeholder="行程介紹"
            disabled={mode === "Read"}
            rows={3}
            maxLength={255}
            style={{ resize: "none" }}
          />
        </Form.Item>
        <Flex
          className="trip-edit-modal-tags"
          vertical
          justify="center"
          align="flex-start"
          gap="small"
        >
          <h3>行程標籤</h3>
          {mode === "Read" ? (
            <>
              <Flex
                vertical={false}
                justify="flex-start"
                align="center"
                gap="small"
              >
                {labels.length === 0 && (
                  <h3 className="trip-edit-modal-no-label">無標籤</h3>
                )}
                {labels.map((label, index) => (
                  <Tag key={index} color="blue">
                    {label}
                  </Tag>
                ))}
              </Flex>
            </>
          ) : (
            <>
              <TagEditList tags={labels} setTags={setLabels} />
            </>
          )}
        </Flex>
      </Modal>
    </ConfigProvider>
  );
};

export default TripEditModal;
