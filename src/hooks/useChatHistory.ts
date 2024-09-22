import { useState } from "react";
import { Chat } from "../types/chatInterface";

export const useChatHistory = () => {
  const [chatHistory, setChatHistory] = useState<Chat[]>([
    {
      role: "bot",
      type: "text",
      content: "你好，我是行程規劃機器人，請問有什麼可以幫助你的?",
    },
  ]);

  const addHistory = (chat: Chat) => {
    setChatHistory((pre) => [...pre, chat]);
  };

  return {
    chatHistory,
    addHistory,
  };
};
