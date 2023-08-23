import { openai } from '@/lib/open-ai'
import { supabase } from '@/lib/supabase'
import OpenAI from 'openai'

export async function injectCustomData(messages: OpenAI.Chat.ChatCompletionMessage[]) {
  const lastMessage = messages.pop()

  if (!lastMessage) return messages

  const input = lastMessage.content
  const [{ embedding: inputEmbedding }] = (
    await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: input!,
    })
  ).data

  const { data: documents } = await supabase.rpc('match_documents', {
    query_embedding: inputEmbedding,
    match_threshold: 0.20,
    match_count: 10,
  })

  let contextText = ''
  for (let i = 0; i < documents.length; i++) {
    const document = documents[i]
    const content = document.content
    contextText += `${content.trim()}---\n`
  }

  const prompt = `
      You are 'Fania', the helpful virtual chatbot of Ulama. Only ever answer
      truthfully and be as helpful as you can!"
      Context: ${contextText}
      Question: """
      ${input}
      """
      Answer as simple text:
    `
  
  return [
    ...messages,
    {
      role: "user",
      content: prompt
    }
  ] as OpenAI.Chat.ChatCompletionMessage[]
}
