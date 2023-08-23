import { useRef, KeyboardEvent, Dispatch, SetStateAction } from 'react'

export default function useTextarea(input?: string, setInput?: Dispatch<SetStateAction<string>>) {
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const cleanedInput = input?.trim().replace('/\n/g', '')

    if (e.key === 'Enter' && e.ctrlKey) setInput!((prev) => prev + '\n')
    else if (e.key === 'Enter' && !cleanedInput) e.preventDefault()
    else if (e.key === 'Enter') {
      e.preventDefault()
      formRef.current?.requestSubmit()
    }
  }

  return { formRef, inputRef, handleKeyDown }
}
