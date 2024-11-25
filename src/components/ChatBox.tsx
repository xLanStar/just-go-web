import { MutableRefObject, useState } from "react";
import { Flex, Input } from "antd";
import { CloseOutlined, RobotOutlined, SendOutlined } from "@ant-design/icons";
import { Chat, Place } from "../types/chatInterface";
import { askAI } from "../utils/gemini";
import {
  FindPlaceFromQueryRequest,
  PlacesService,
} from "../types/googleMapInterface";
import PlaceCard from "./PlaceCard";
import { CollectionMode } from "../types/modeInterface";

const { TextArea } = Input;

import "../assets/scss/chatBox.scss";

interface Props {
  placesServiceRef: MutableRefObject<PlacesService | undefined>;
  closeChatBox: () => void;
}

const ChatBox: React.FunctionComponent<Props> = ({
  placesServiceRef,
  closeChatBox,
}) => {
  const [chatHistory, setChatHistory] = useState<Chat[]>([
    {
      role: "bot",
      type: "text",
      content: "你好，我是行程規劃機器人，請問有什麼可以幫助你的?",
    },
  ]);
  const [messages, setMessages] = useState<string>("");

  const sendMessage = async (message: string) => {
    const response = await askAI(message);

    if (response.type === "text") {
      setChatHistory((pre) => [
        ...pre,
        {
          role: "bot",
          type: response.type,
          content: response.content,
        },
      ]);
    } else if (response.type === "attraction") {
      if (!placesServiceRef.current) {
        return;
      }

      const places: Place[] = [];

      for (const place of response.content) {
        const request: FindPlaceFromQueryRequest = {
          query: place.name,
          fields: ["name", "place_id", "photo", "rating"],
        };

        placesServiceRef.current.findPlaceFromQuery(
          request,
          (result, status) => {
            if (
              status !== google.maps.places.PlacesServiceStatus.OK ||
              !result
            ) {
              return;
            }

            places.push({
              day: place.day as number,
              name: result[0].name as string,
              placeId: result[0].place_id as string,
              photo: result[0].photos?.[0].getUrl() as string,
              rating: result[0].rating as number,
            });
          }
        );
      }

      console.log(places);

      setChatHistory((pre) => [
        ...pre,
        {
          role: "bot",
          type: response.type,
          content: places,
        },
      ]);
    }
  };

  return (
    <Flex className="chatbox" vertical justify="flex-start" align="center">
      <Flex
        className="chatbox_header"
        vertical={false}
        justify="flex-start"
        align="center"
      >
        <h1 className="chatbox_title">行程規劃機器人</h1>
        <CloseOutlined
          className="chatbox_close_button"
          onClick={closeChatBox}
        />
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
                {
                  chat.type === "text" ? (
                    <TextArea
                      className="chatbox_bot_message"
                      variant="filled"
                      readOnly
                      autoSize
                      value={chat.content as string}
                    />
                  ) : null
                  // <>
                  //   <TextArea
                  //     className="chatbox_bot_message"
                  //     variant="filled"
                  //     readOnly
                  //     autoSize
                  //     value={"以下是為您規劃的行程"}
                  //   />
                  //   {(chat.content as Place[]).map((place) => (
                  //     <PlaceCard
                  //       place={{
                  //         name: place.name,
                  //         photo: place.photo,
                  //         rating: place.rating,
                  //       }}
                  //       mode={CollectionMode.Edit}
                  //     />
                  //   ))}
                  // </>
                }
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
                  value={chat.content as string}
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
            setChatHistory((pre) => [
              ...pre,
              { role: "user", type: "text", content: messages },
            ]);
            sendMessage(messages);
            setMessages("");
          }}
        />
      </Flex>
    </Flex>
  );
};

export default ChatBox;
