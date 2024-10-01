import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  App,
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
import type { UploadProps } from "antd";
import {
  CloseCircleOutlined,
  MailOutlined,
  SaveOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../hooks";
import { CommonRules } from "../data/form";
import { ProfileForm } from "../types/formInterface";
import { setMode, setPage } from "../store/page/pageSlice";
import { useLocalStorage } from "../hooks/useLocalStorage";

import "../assets/scss/profile.scss";

const Profile: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const localStorage = useLocalStorage();
  const user = useAppSelector((state) => state.user.user);
  const [avatarUrl, setAvatarUrl] = useState<string>(user.avatar);
  const [avatar, setAvatar] = useState<File | null>(null);
  const { message } = App.useApp();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) {
      navigate("/", { replace: true });
    }
    dispatch(setPage("個人資料"));
    dispatch(setMode("default"));
  }, [navigate]);

  const uploadProps: UploadProps = {
    beforeUpload: (avatar) => {
      const isImage =
        avatar.type === "image/png" || avatar.type === "image/jpeg";

      if (!isImage) {
        message.error(`${avatar.name}不是一個圖片檔`);
        return Upload.LIST_IGNORE;
      }

      setAvatar(avatar);
      setAvatarUrl(URL.createObjectURL(avatar));

      return false;
    },
    maxCount: 1,
    showUploadList: false,
  };

  const submitForm = async (form: ProfileForm) => {
    // try {
    //   await dispatch(
    //     updateUser({
    //       id: user.id,
    //       name: form.name,
    //       email: form.email,
    //       avatar: avatar,
    //     })
    //   );
    //   navigate(-1);
    // } catch (error) {
    //   if (error instanceof Error) {
    //     message.error(error.message);
    //   }
    // }
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
      <Flex className="profile" vertical justify="center" align="center">
        <Flex
          className="profile_form"
          vertical
          justify="center"
          align="center"
          gap="middle"
        >
          <Row className="profile_avatar_box">
            <Col span={16}>
              <Flex
                className="profile_avatar"
                vertical={false}
                justify="flex-start"
                align="center"
                gap="middle"
              >
                {avatarUrl ? (
                  <Avatar
                    src={<img src={avatarUrl} alt="avatar" />}
                    size={80}
                  />
                ) : (
                  <Avatar icon={<UserOutlined />} size={80} />
                )}
                <h2>你的照片</h2>
              </Flex>
            </Col>
            <Col span={8}>
              <Flex
                className="profile_avatar_upload"
                vertical={false}
                justify="flex-end"
                align="center"
              >
                <Upload {...uploadProps}>
                  <Button
                    className="profile_avatar_upload_button"
                    icon={<UploadOutlined />}
                    size="large"
                  >
                    上傳頭像
                  </Button>
                </Upload>
              </Flex>
            </Col>
          </Row>
          <Form
            className="profile_form_item_box"
            form={form}
            layout="vertical"
            scrollToFirstError
            onFinish={submitForm}
            noValidate
            initialValues={{ name: user.name, email: user.email }}
            requiredMark={false}
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
                className="profile_form_action_box"
                vertical={false}
                justify="flex-end"
                align="center"
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
                <Button
                  icon={<CloseCircleOutlined />}
                  size="large"
                  htmlType="button"
                  onClick={() => navigate(-1)}
                >
                  取消
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </ConfigProvider>
  );
};

export default Profile;
