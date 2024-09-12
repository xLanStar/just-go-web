import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_GEMINI_API);
const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
const chat = model.startChat({
  history: [],
  generationConfig: {
    maxOutputTokens: 100,
  },
});

export const askAI = async (message: string) => {
  const result = await chat.sendMessage(message);
  const text = result.response.text();
  return text;
};
