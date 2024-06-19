import { Rule } from "antd/es/form";

export const CommonRules: { [name: string]: Rule } = {
  Email: {
    type: "email",
    message: "不是一個有效的電子信箱!",
  },
  Required: {
    required: true,
    message: "此欄位為必填!",
  },
  CheckPassword: ({ getFieldValue }) => ({
    validator(_: unknown, value: string) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("再次輸入密碼必須和密碼一致"));
    },
  }),
};
