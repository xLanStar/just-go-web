import {
  GoogleCircleFilled,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { App, Button, Divider, Flex, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommonRules } from "../../data/form";
import { useCustomGoogleLogin, getJwtToken } from "../../apis/auth";
import { useAppDispatch } from "../../hooks";
import { SigninForm } from "../../types/formInterface";
import { registerUser, signinUser } from "../../store/user/userSlice";

import "../../assets/scss/signin.scss";

const Signin: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const [isSignin, setIsSignin] = useState<boolean>(true);

  useEffect(() => {
    if (getJwtToken()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const onFinish = async (form: SigninForm) => {
    try {
      if (isSignin) {
        await dispatch(
          signinUser({ email: form.email, password: form.password })
        );
      } else {
        await dispatch(
          registerUser({
            name: form.name as string,
            email: form.email,
            password: form.password,
          })
        );
      }
      navigate("/", { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      }
    }
  };

  const customGoogleLogin = useCustomGoogleLogin()

  return (
    <Flex
      vertical
      justify="center"
      align="center"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Flex className="signin_page" vertical align="center">
        <img className="logo_image" src="src/assets/logo.png" alt="logo.png" />
        <h2>{isSignin ? "登入" : "註冊"}</h2>
        <Form
          className="signin_form"
          form={form}
          layout="vertical"
          scrollToFirstError
          onFinish={onFinish}
          noValidate
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
              {isSignin ? "登入" : "註冊"}
            </Button>
            <Divider>或</Divider>
            <Button
              icon={<GoogleCircleFilled />}
              size="large"
              style={{ width: "100%" }}
              onClick={customGoogleLogin}
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
    </Flex>
  );
};

export default Signin;
