"use client"

import { useTranscription } from "@/context/TranscriptionContext";
import { chatPrompt } from "@/helpers/constants/chatbot-prompt";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { UseChatHelpers, useChat } from "ai/react";
import { ReactNode, createContext, useContext } from "react";

const ChatContext = createContext<Partial<UseChatHelpers>>({});

interface Props {
  children: ReactNode;
}


export function ChatProvider({ children }: Props) {
  const {transcription} = useTranscription()

  const payload = {prompt: chatPrompt, transcription}
  const { input, messages, handleInputChange, isLoading, handleSubmit, error, setInput } = useChat({body: payload});

  return <ChatContext.Provider value={{input, messages, handleInputChange, isLoading, handleSubmit, error, setInput}}>{children}</ChatContext.Provider>;
}

export function useChatbotChat() {
  return useContext(ChatContext)
}