import React from 'react'

export default function ChatbotHeader() {
  return (
    <div>
      <div className='text-xs w-fit'>Chat with</div>
      <div className='flex items-center gap-1.5'>
        <span className='w-2 h-2 rounded-full bg-green-500'></span>
        <p className='font-medium'>Ulama support</p>
      </div>
    </div>
  )
}
