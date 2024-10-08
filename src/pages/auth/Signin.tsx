import axios from "axios";
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
import { register, signin, googleSignin } from "../../apis/auth";
import { useAppDispatch } from "../../hooks";
import { SigninForm } from "../../types/formInterface";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { setUser } from "../../store/user/userSlice";
import { useGoogleLogin } from "@react-oauth/google";

import "../../assets/scss/signin.scss";

const Signin: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const localStorage = useLocalStorage();
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const [isSignin, setIsSignin] = useState<boolean>(true);

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      navigate("/", { replace: true });
    }
  }, []);

  const submitForm = async (form: SigninForm) => {
    try {
      if (isSignin) {
        const { user, token } = await signin(form.email, form.password);
        localStorage.setItem("user", user);
        localStorage.setItem("jwtToken", token);
        dispatch(setUser(user));
        navigate("/", { replace: true });
      } else {
        await register(form.name as string, form.email, form.password);
        navigate("/verify-notice");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          message.error("帳號或密碼錯誤");
        } else if (error.status === 409) {
          message.error("帳號已存在");
        } else if (error.status === 500) {
          message.error("系統發生錯誤");
        }
      }
      console.error(error);
    }
  };

  const google = useGoogleLogin({
    onSuccess: async (response) => {
      const accessToken = response.access_token;
      const { user, token } = await googleSignin(accessToken);

      localStorage.setItem("user", user);
      localStorage.setItem("jwtToken", token);
      dispatch(setUser(user));
      navigate("/", { replace: true });
    },
    onError: () => {
      message.error("Google登入失敗");
    },
  });

  return (
    <Flex className="signin" vertical justify="center" align="center">
      <Flex className="signin_content" vertical align="center">
        <img
          className="signin_logo"
          src="/src/assets/image/logo.png"
          alt="logo.png"
        />
        <h2>{isSignin ? "登入" : "註冊"}</h2>
        <Form
          className="signin_form"
          form={form}
          layout="vertical"
          scrollToFirstError
          onFinish={submitForm}
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
              className="signin_button"
              type="primary"
              size="large"
              htmlType="submit"
            >
              {isSignin ? "登入" : "註冊"}
            </Button>
            <Divider>或</Divider>
            <Button
              className="signin_button"
              icon={<GoogleCircleFilled />}
              size="large"
              onClick={() => google()}
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
