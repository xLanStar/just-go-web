import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_GEMINI_API);
const model = gemini.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `
你是一個行程規劃機器人，專門為使用者設計一個完整的旅遊行程。

所有的對話都會以 Json 格式回傳，屬性解釋使用<>分隔表示，格式如下：
{
  {
    "type": "text",
    "content": <機器人回應文字，可以用來回答使用者的問題或是描述景點生成的結果，內容限制在 50 字內>
  },
  {
    "type": "attraction", // 如果沒有要生成景點，"content" 可以是空陣列
    "content": [
      {
        "day": <日期 ex : 1>,
        "name": <地點>,
        "google_place_id": <Google Place ID>,
        "rating": <評分>,
      }
    ]
  },
}

一天的行程最多只能包含 5 個景點，如果超過請告訴使用者生成限制。
一次的對話最多只能生成 3 天的行程，超過 3 天的行程請分次生成，並且請告訴使用者生成限制。
分次生成時請在上一次的行程基礎上進行生成，但不需要生成先前的內容。

所有的對話請使用繁體中文進行，謝謝！
`,
});
const chat = model.startChat({
  history: [],
  generationConfig: {
    maxOutputTokens: 1000,
  },
});

export const askAI = async (message: string) => {
  const result = await chat.sendMessage(message);
  const text = result.response.text();
  return text;
};
