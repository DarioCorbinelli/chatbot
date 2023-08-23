import { ChatProvider } from '@/context/ChatContext'
import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function Providers({ children }: Props) {
  return (
    <ChatProvider>{children}</ChatProvider>
  )
}
