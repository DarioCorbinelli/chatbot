"use client"

import { useChatbotChat } from '@/context/ChatContext'
import { cn } from '@/lib/utils'
import React, { HTMLAttributes, useEffect, useRef } from 'react'

interface Props extends HTMLAttributes<HTMLUListElement> {}

export default function ChatbotMessages({className, ...rest}:Props) {
  const {messages, error} = useChatbotChat()
  const messagesRef = useRef<HTMLUListElement>(null)

  useEffect(() => messagesRef.current?.scrollTo(0, messagesRef.current.scrollHeight), [messages])

  return (
    <ul ref={messagesRef} className={cn(["flex flex-col gap-2 overflow-y-auto p-4 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2", className])} {...rest}>
      {messages?.map(mess => (
        <li key={mess.id} className={cn(['list-none w-fit py-1.5 px-2 rounded-md', mess.role === 'assistant' ? "bg-muted" : "bg-primary text-background self-end"])}>{mess.content}</li>
      ))}
      {error && <li className='list-none w-fit py-1.5 px-2 rounded-md bg-destructive text-background'>Something went wrong. Please try again.</li> }
    </ul>
  )
}
