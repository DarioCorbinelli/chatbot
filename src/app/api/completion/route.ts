import { transcriptionPrompt } from '@/helpers/constants/chatbot-prompt';
import { openai } from '@/lib/open-ai'
import { OpenAIStream, StreamingTextResponse } from 'ai';

function getTranscriptionSegments(transcription:string, chunkSize:number) {
  const sentences = transcription.split('.'); // Dividi il testo in frasi
  const chunks = [];
  let currentChunk = '';

  for (const sentence of sentences) {
    if ((currentChunk + ' ' + sentence).length <= chunkSize) {
      // Aggiungi la frase corrente al pezzo corrente
      currentChunk = currentChunk ? currentChunk + ' ' + sentence : sentence;
    } else {
      // Aggiungi il pezzo corrente all'array di pezzi e inizia un nuovo pezzo
      chunks.push(currentChunk);
      currentChunk = sentence;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
}

async function getSegmentSummary(segment:string) {
  const prompt = `Shorten the following text while keeping all the relevant informations intact:\n"${segment}"`;
  
  try {
    const response = await openai.completions.create({
      prompt,
      model: "text-davinci-003",
      max_tokens: 1000
    });

    return response.choices[0].text.trim();
  } catch (error) {
    console.error('An error accoured during the request to OpenAI:', error);
    return null;
  }
}

async function getTrascriptionSummary(segments: string[]) {
  const riassunti = [];
  
  for (const segment of segments) {
    const segmentSummary = await getSegmentSummary(segment);
    if (segmentSummary) {
      riassunti.push(segmentSummary);
    }
  }

  const transcriptionSummary = riassunti.join('\n');
  return transcriptionSummary
}

export async function POST(req: Request) {
  const { prompt: transcription } = await req.json()

  const segments = getTranscriptionSegments(transcription, 1000)

  const transcriptionSummary = await getTrascriptionSummary(segments)

  const response = await openai.completions.create({
    model: 'text-davinci-003',
    prompt: `${transcriptionPrompt} ${transcriptionSummary}`,
    stream: true,
    max_tokens: 1000
  })

  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}