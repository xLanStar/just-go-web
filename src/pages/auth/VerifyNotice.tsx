import { Flex, Result } from "antd";

const VerifyNotice: React.FunctionComponent = () => {
  return (
    <Flex
      justify="center"
      align="center"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Result
        title="請驗證信箱"
        subTitle="我們已經發送了一封驗證信到您的郵箱。請點擊郵件中的連結來完成註冊。"
      />
    </Flex>
  );
};

export default VerifyNotice;
