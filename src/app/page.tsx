'use client'

import { Button } from '@/components/ui/button'
import { useTranscription } from '@/context/TranscriptionContext'
import useTextarea from '@/hooks/useTextarea'
import { useCompletion } from 'ai/react'
import { FormEvent } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

export default function Home() {
  const {transcription, setTranscription} = useTranscription()
  const {input, handleInputChange, handleSubmit, completion, setInput, isLoading} = useCompletion({
    onFinish: (prompt, completion) => setTranscription!(completion)
  })
  const {formRef, inputRef} = useTextarea(input, setInput)

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTranscription!("")
    handleSubmit!(e)
  }

  return (
    <main className=" container mt-12">
      <form ref={formRef} className="w-fit mx-auto flex items-start gap-2" onSubmit={handleFormSubmit}>
        <TextareaAutosize ref={inputRef} value={input} onChange={handleInputChange} maxRows={6} rows={1} className="border-border rounded-md resize-none text-sm w-96 focus:ring-0" placeholder="Inserisci qui la tua trascrizione..." />
        <Button type='submit' className='shrink-0'>{isLoading ? "Loading..." : `Add transcription`}</Button>
      </form>
      {completion ? <p>{transcription}</p> : <p>{transcription}</p>}
    </main>
  )
}
