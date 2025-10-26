
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this example, we'll rely on the environment variable being set.
  console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateSummary = async (content: string): Promise<string> => {
  if (!API_KEY) return "AI功能不可用，请配置API密钥。";
  try {
    const prompt = `为以下游戏攻略生成一个3到5行的关键点摘要，使用中文。摘要应该清晰、简洁，帮助玩家快速了解攻略的核心内容。\n\n攻略内容：\n---\n${content}\n---\n\n摘要：`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    return response.text;
  } catch (error) {
    console.error("Error generating summary:", error);
    return "抱歉，生成摘要时发生错误。";
  }
};

export const getChatResponse = async (
  messages: ChatMessage[],
  context: { guideTitle: string; guideContent: string } | null
): Promise<string> => {
  if (!API_KEY) return "AI功能不可用，请配置API密钥。";
  try {
    const userMessages = messages.filter(m => m.sender === 'user');
    const lastUserMessage = userMessages[userMessages.length - 1];

    if (!lastUserMessage) {
      return "你好！有什么可以帮你的吗？";
    }

    let systemInstruction = "你是一个专业且友好的游戏攻略AI助手“智囊团”。你的任务是根据提供的攻略内容，精确、简洁地回答玩家的问题。";
    if (context) {
      systemInstruction += ` 当前的知识库限定在以下攻略：《${context.guideTitle}》。请严格依据这份攻略回答，不要提供攻略之外的信息。\n\n攻略内容：\n${context.guideContent}`;
    } else {
        systemInstruction += " 请根据你广泛的游戏知识库来回答问题。"
    }

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: "user", parts: [{ text: lastUserMessage.text }] }],
        config: {
            systemInstruction,
        }
    });

    return response.text;

  } catch (error) {
    console.error("Error getting chat response:", error);
    return "抱歉，我在回答时遇到了问题。";
  }
};
