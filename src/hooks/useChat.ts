import { useState } from "react";
import { Chat } from "../types/chatInterface";
import { askGemini } from "../utils/gemini";

const useChat = () => {
  const [chatHistory, setChatHistory] = useState<Chat[]>([
    {
      role: "bot",
      content: "你好，我是行程規劃機器人，請問有什麼可以幫助你的?",
    },
  ]);

  const sendMessage = async (message: string) => {
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      {
        role: "user",
        content: message,
      },
    ]);

    // Send message to AI
    const response = await askGemini(message);
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      {
        role: "bot",
        content: response,
      },
    ]);
  };

  return { chatHistory, sendMessage };
};

export default useChat;
