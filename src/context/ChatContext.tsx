"use client"

import { UseChatHelpers, useChat } from "ai/react";
import { ReactNode, createContext, useContext } from "react";

const ChatContext = createContext<Partial<UseChatHelpers>>({});

interface Props {
  children: ReactNode;
}

export function ChatProvider({ children }: Props) {
  const { input, messages, handleInputChange, isLoading, handleSubmit, error, setInput } = useChat();

  return <ChatContext.Provider value={{input, messages, handleInputChange, isLoading, handleSubmit, error, setInput}}>{children}</ChatContext.Provider>;
}

export function useChatbotChat() {
  return useContext(ChatContext)
}