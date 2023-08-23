"use client"

import ChatbotHeader from '@/components/ChatbotHeader'
import ChatbotInput from '@/components/ChatbotInput'
import ChatbotMessages from '@/components/ChatbotMessages'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useTranscription } from '@/context/TranscriptionContext'

export default function Chatbot() {
  const {transcription} = useTranscription()

  if (!transcription) return null

  return (
    <Accordion type='single' collapsible className='fixed right-8 bottom-8 bg-background border border-border rounded-md w-80'>
      <AccordionItem value='item-1'>
        <AccordionTrigger className='px-6'><ChatbotHeader /></AccordionTrigger>
        <AccordionContent className='border-t'>
          <div className='flex flex-col h-80'>
            <ChatbotMessages className='flex-1' />
            <ChatbotInput className='border-t' />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
