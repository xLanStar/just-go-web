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
};
