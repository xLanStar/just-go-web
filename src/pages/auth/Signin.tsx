import {
  GoogleCircleFilled,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Divider, Flex, Form, Input, message } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommonRules } from "../../data/form";
import {
  getJwtToken,
  register,
  saveUser,
  setJwtToken,
  signin,
} from "../../apis/auth";
import { User, setUser } from "../../feature/user/userSlice";
import { useAppDispatch } from "../../hooks";

export interface LoginFormData {
  name?: string;
  email: string;
  password: string;
  checkPassword?: string;
}

const Signin: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isSignin, setIsSignin] = useState<boolean>(true);

  useEffect(() => {
    if (getJwtToken()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const onFinish = async (data: LoginFormData) => {
    console.log(data);
    try {
      const response = isSignin
        ? await signin({
            email: data.email,
            password: data.password,
          })
        : await register({
            name: data.name,
            email: data.email,
            password: data.password,
          });
      const user: User = response.data;
      setJwtToken(response.token);
      saveUser(user);
      dispatch(setUser(user));
      navigate("/", { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        messageApi.open({
          type: "error",
          content: error.message,
        });
      }
    }
  };

  return (
    <Fragment>
      {contextHolder}
      <Flex vertical justify="center" align="center" style={{ height: "100%" }}>
        <img
          src="src/assets/logo.png"
          alt="logo.png"
          width={480}
          height={195}
        />
        <h2>{isSignin ? "登入" : "註冊"}</h2>
        <Form
          form={form}
          layout="vertical"
          scrollToFirstError
          onFinish={onFinish}
          noValidate
          style={{
            width: "480px",
          }}
        >
          {!isSignin && (
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
          )}
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
          <Form.Item
            name="password"
            label="密碼"
            validateTrigger="onBlur"
            rules={[CommonRules.Required]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              size="large"
              placeholder="密碼"
              required
            />
          </Form.Item>
          {!isSignin && (
            <Form.Item
              name="checkPassword"
              label="再次輸入密碼"
              validateTrigger="onBlur"
              dependencies={["password"]}
              rules={[CommonRules.Required, CommonRules.CheckPassword]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                size="large"
                placeholder="再次輸入密碼"
                required
              />
            </Form.Item>
          )}
          <Form.Item>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              style={{ width: "100%" }}
            >
              登入
            </Button>
            <Divider>或</Divider>
            <Button
              icon={<GoogleCircleFilled />}
              size="large"
              style={{ width: "100%" }}
            >
              Google
            </Button>
          </Form.Item>
        </Form>
        <p
          onClick={() => {
            setIsSignin(!isSignin);
            form.resetFields();
          }}
        >
          {isSignin ? "沒有just go 帳號了? 註冊" : "已經有just go 帳號了? 登入"}
        </p>
      </Flex>
    </Fragment>
  );
};

export default Signin;
