import { useState } from "react";
import { Flex, Input } from "antd";
import { RobotOutlined, SendOutlined } from "@ant-design/icons";
import { Chat } from "../types/chatInterface";

const { TextArea } = Input;

import "../assets/scss/chatBox.scss";

const ChatBox: React.FunctionComponent = () => {
  const [chatHistory, setChatHistory] = useState<Chat[]>([
    {
      role: "bot",
      message: "歡迎使用行程規劃機器人！",
    },
  ]);
  const [messages, setMessages] = useState<string>("");

  const sendMessage = (message: string) => {};

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
        gap="small"
      >
        {chatHistory.map((chat, index) => (
          <div className="chatbox_content_box" key={index}>
            {chat.role === "bot" ? (
              <Flex
                vertical={false}
                justify="flex-start"
                align="flex-start"
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
                  value={chat.message}
                />
              </Flex>
            ) : (
              <Flex
                className="chatbox_content_box"
                vertical={false}
                justify="flex-end"
                align="flex-start"
                gap="small"
              >
                <TextArea
                  className="chatbox_user_message"
                  variant="filled"
                  readOnly
                  autoSize
                  value={chat.message}
                />
              </Flex>
            )}
          </div>
        ))}
      </Flex>
      <Flex
        className="chatbox_footer"
        vertical={false}
        justify="flex-start"
        align="center"
      >
        <TextArea
          className="chatbox_input"
          value={messages}
          onChange={(e) => setMessages(e.target.value)}
          variant="borderless"
          autoSize={{ minRows: 1, maxRows: 3 }}
          placeholder="輸入訊息..."
        />
        <SendOutlined
          className="chatbox_icon"
          onClick={() => {
            sendMessage(messages);
            setChatHistory([
              ...chatHistory,
              { role: "user", message: messages },
            ]);
            setMessages("");
          }}
        />
      </Flex>
    </Flex>
  );
};

export default ChatBox;
