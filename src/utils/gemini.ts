import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_GEMINI_API);
const model = gemini.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `
你是一個行程規劃機器人，專門為使用者設計一個完整的旅遊行程。

所有的對話都會以 Json 格式回傳，請遵守以下規則：
  如果對話回應內容是回答使用者的問題，請回傳以下格式：

  {
    "type": "text",
    "content": <機器人回應內容，內容限制在 50 字內>
  }

  如果對話回應內容是生成景點，請回傳以下格式：

  {
    "type": "attraction",
    "content": [
      {
        "day": <日期 ex : 1>,
        "name": <地點名稱>,
      }, ...
    ]
  },

請注意以下事項：
1.如果該對話是要回答使用者的問題而不是生成景點，"content" 屬性就回傳 []>
2.一天的行程最多只能包含 5 個景點，如果超過請告訴使用者生成限制。
3.一次的對話最多只能生成 3 天的行程，如果超過 3 天請告知使用者要透過對話分次生成。
4.分次生成時請在上一次的行程基礎上進行生成，以及不需要再回傳先前的內容。
5.Google Map Place ID 請確認是正確的，否則會導致無法取得地點資訊。
6.所有的對話請使用繁體中文進行。
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
  return JSON.parse(text);
};
