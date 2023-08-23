"use client"

import { useSessionStorage } from "@/hooks/useSessionStorage";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext} from "react";

const TranscriptionContext = createContext<{transcription?: string, setTranscription?: Dispatch<SetStateAction<string>>}>({});

interface Props {
  children: ReactNode;
}

export function TranscriptionProvider({ children }: Props) {
  const [transcription, setTranscription] = useSessionStorage("transcription", "")

  return <TranscriptionContext.Provider value={{transcription, setTranscription}}>{children}</TranscriptionContext.Provider>;
}

export function useTranscription() {
  return useContext(TranscriptionContext)
}