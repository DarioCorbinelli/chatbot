import { ChatProvider } from '@/context/ChatContext'
import { TranscriptionProvider } from '@/context/TranscriptionContext'
import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function Providers({ children }: Props) {
  return (
    <TranscriptionProvider>
      <ChatProvider>{children}</ChatProvider>
    </TranscriptionProvider>
  )
}
