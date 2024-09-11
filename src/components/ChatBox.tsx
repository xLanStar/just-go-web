import { Flex, Input } from "antd";
import { RobotOutlined, SendOutlined } from "@ant-design/icons";

const { TextArea } = Input;

import "../assets/scss/chatBox.scss";

const ChatBox: React.FunctionComponent = () => {
  return (
    <Flex className="chatbox" vertical justify="flex-start" align="center">
      <Flex
        className="chatbox_header"
        vertical={false}
        justify="flex-start"
        align="center"
      >
        <h1 className="chatbox_title">行程規劃機器人</h1>
      </Flex>
      <Flex
        className="chatbox_content"
        vertical
        justify="flex-start"
        align="center"
      >
        <Flex
          className="chatbox_content_message"
          vertical={false}
          justify="flex-start"
          align="flex-end"
          gap="small"
        >
          <Flex
            className="chatbox_bot_image_box"
            vertical
            justify="center"
            align="center"
          >
            <RobotOutlined className="chatbox_bot_image" />
          </Flex>
          <TextArea
            className="chatbox_bot_message"
            variant="filled"
            readOnly
            autoSize
            value={"您好，我是行程規劃機器人，有什麼可以幫助您的嗎？"}
          />
        </Flex>
      </Flex>
      <Flex
        className="chatbox_footer"
        vertical={false}
        justify="flex-start"
        align="center"
      >
        <TextArea
          className="chatbox_input"
          variant="borderless"
          autoSize={{ minRows: 1, maxRows: 3 }}
          placeholder="輸入訊息..."
        />
        <SendOutlined className="chatbox_icon" />
      </Flex>
    </Flex>
  );
};

export default ChatBox;
