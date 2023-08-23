import { injectCustomData } from "@/helpers/functions/chatbot";
import { openai } from "@/lib/open-ai"
import { OpenAIStream, StreamingTextResponse } from 'ai'

export async function POST(req: Request) {
  const {messages} = await req.json()
  const messagesWithCustomData = await injectCustomData(messages);

  const res = await openai.chat.completions.create({
    model: "gpt-4",
    stream: true,
    messages: messagesWithCustomData
  })

  const stream = OpenAIStream(res)

  return new StreamingTextResponse(stream)
}