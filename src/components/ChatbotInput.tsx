'use client'

import React, { HTMLAttributes, KeyboardEvent, useEffect, useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useChatbotChat } from '@/context/ChatContext'
import { cn } from '@/lib/utils'
import { CornerDownLeft, Loader2 } from 'lucide-react'
import useTextarea from '@/hooks/useTextarea'

interface Props extends HTMLAttributes<HTMLFormElement> {}

export default function ChatbotInput({ className, ...rest }: Props) {
  const { input, handleInputChange, isLoading, handleSubmit, setInput } = useChatbotChat()
  const { formRef, inputRef, handleKeyDown } = useTextarea(input, setInput)

  useEffect(() => {
    if (!isLoading) inputRef.current?.focus()
  }, [isLoading])

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={cn(['p-4', className])} {...rest}>
      <label htmlFor="input" className="sr-only">
        Input
      </label>
      <div className={cn(['overflow-hidden rounded-sm relative after:absolute after:block after:w-full after:bottom-0 after:h-0.5 after:bg-primary', { 'opacity-50': isLoading }])}>
        <TextareaAutosize id="input" ref={inputRef} autoFocus disabled={isLoading} onKeyDown={handleKeyDown} placeholder="Write a message..." className="block w-full text-sm placeholder:text-muted-foreground pr-8 resize-none border-none bg-muted focus:ring-0 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-p-y-1 scrollbar-w-2" value={input} onChange={handleInputChange} maxRows={4} />
        <div className="absolute w-5 h-5 right-2 bottom-2 bg-background rounded-sm flex items-center justify-center" aria-hidden>
          {isLoading ? <Loader2 className="w-3 text-muted-foreground animate-spin" /> : <CornerDownLeft className="w-3 text-muted-foreground" />}
        </div>
      </div>
    </form>
  )
}
