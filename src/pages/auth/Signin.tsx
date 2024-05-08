import {
  GoogleCircleFilled,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Divider, Flex, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { CommonRules } from "../../data/form";

interface LoginFormData {
  email: string;
  password: string;
}

const Signin = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onFinish = (data: LoginFormData) => {
    console.log(data);
    // ++debug
    navigate("/");
    // --debug
  };

  return (
    <Flex vertical justify="center" align="center" style={{ height: "100%" }}>
      (logo)
      <h3>登入</h3>
      <Form
        form={form}
        layout="vertical"
        scrollToFirstError
        onFinish={onFinish}
        noValidate
      >
        <Form.Item
          name="email"
          label="信箱"
          rules={[CommonRules.Email, CommonRules.Required]}
        >
          <Input prefix={<UserOutlined />} placeholder="信箱" required />
        </Form.Item>
        <Form.Item name="password" label="密碼" rules={[CommonRules.Required]}>
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="密碼"
            required
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            登入
          </Button>
          <Divider>或</Divider>
          <Button icon={<GoogleCircleFilled />} style={{ width: "100%" }}>
            Google
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default Signin;
