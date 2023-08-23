import { openai } from "@/lib/open-ai"
import { OpenAIStream, StreamingTextResponse } from 'ai'

export async function POST(req: Request) {
  const {messages, prompt, transcription} = await req.json()

  const res = await openai.chat.completions.create({
    model: "gpt-4",
    stream: true,
    messages: [{role: "system", content: `${prompt} ${transcription}`}, ...messages]
  })

  const stream = OpenAIStream(res)

  return new StreamingTextResponse(stream)
}