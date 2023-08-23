// keep the '.js' file extention for 'ts-node' to work

import { transcription } from "../helpers/constants/lesson-trascription.js";
import { openai } from "../lib/open-ai.js";
import { supabase } from "../lib/supabase.js";

export async function generateEmbeddings() {
  try {
    const [{embedding}] = (await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: transcription
    })).data

    await supabase.from("documents").insert({
      content: transcription,
      embedding
    })
  } catch (error) {
    console.log(error)
  }
}

generateEmbeddings()