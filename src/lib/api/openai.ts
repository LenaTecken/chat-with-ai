import "server-only";
import OpenAIApi from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAIApi({ apiKey: process.env.OPENAI_API_KEY });

export async function sendMessageToOpenAI(
  previousMessages: ChatCompletionMessageParam[],
  message: string
) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      ...previousMessages,
      {
        role: "user",
        content: message,
      },
    ],
  });

  return response.choices[0].message.content;
}
