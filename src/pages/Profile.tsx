import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Col,
  ConfigProvider,
  Flex,
  Form,
  Input,
  Row,
  Upload,
} from "antd";
import {
  CloseCircleOutlined,
  MailOutlined,
  SaveOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "../hooks";
import { CommonRules } from "../data/form";
import { getJwtToken } from "../apis/auth";

import "../assets/scss/profile.scss";

export interface ProfileFormData {
  name: string;
  email: string;
}

const Profile: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!getJwtToken()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const onFinish = async (data: ProfileFormData) => {
    console.log(data);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelFontSize: 18,
          },
        },
      }}
    >
      <Flex
        vertical
        justify="center"
        align="center"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Flex
          vertical
          align="center"
          style={{
            width: "100%",
            overflowY: "auto",
          }}
        >
          <Flex
            className="profile_form"
            vertical
            justify="center"
            align="center"
            gap="middle"
          >
            <Row
              style={{
                width: "100%",
              }}
            >
              <Col span={16}>
                <Flex
                  vertical={false}
                  justify="flex-start"
                  align="center"
                  gap="middle"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Avatar
                    src={<img src="src/assets/avatar.jpg" alt="avatar" />}
                    size={80}
                  />
                  <h2>你的照片</h2>
                </Flex>
              </Col>
              <Col span={8}>
                <Flex
                  vertical={false}
                  justify="flex-end"
                  align="center"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Upload>
                    <Button
                      icon={<UploadOutlined />}
                      size="large"
                      style={{ width: "100%" }}
                    >
                      上傳頭像
                    </Button>
                  </Upload>
                </Flex>
              </Col>
            </Row>
            <Form
              form={form}
              layout="vertical"
              scrollToFirstError
              onFinish={onFinish}
              noValidate
              initialValues={{ name: user.name, email: user.email }}
              requiredMark={false}
              style={{
                width: "100%",
              }}
            >
              <Form.Item
                name="name"
                label="姓名"
                validateTrigger="onBlur"
                rules={[CommonRules.Required]}
              >
                <Input
                  prefix={<UserOutlined />}
                  size="large"
                  placeholder="姓名"
                  required
                />
              </Form.Item>
              <Form.Item
                name="email"
                label="信箱"
                validateTrigger="onBlur"
                rules={[CommonRules.Email, CommonRules.Required]}
              >
                <Input
                  prefix={<MailOutlined />}
                  size="large"
                  placeholder="信箱"
                  required
                />
              </Form.Item>
              <Form.Item>
                <Flex
                  vertical={false}
                  justify="flex-end"
                  align="center"
                  style={{
                    width: "100%",
                  }}
                  gap="small"
                >
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    size="large"
                    htmlType="submit"
                  >
                    儲存
                  </Button>
                  <Button icon={<CloseCircleOutlined />} size="large">
                    取消
                  </Button>
                </Flex>
              </Form.Item>
            </Form>
          </Flex>
        </Flex>
      </Flex>
    </ConfigProvider>
  );
};

export default Profile;
