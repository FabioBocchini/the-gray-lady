'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { Conversation, Role } from '@/types/conversation'
import { sendQuestion } from '@/utils/api-client'
import AsciiFace from '@/app/components/ascii-face'
import ConversationBox from '@/app/components/conversation-box'
import TextInput from '@/app/components/text-input'

const Home: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('')
  const [conversation, setConversation] = useState<Conversation>([])
  
  const updateConversation = useCallback((role: Role, content: string) => {
    setConversation(c => [...c, { role, content }])
  }, [])

  const handleSubmit = useCallback(async () => {
    if (prompt.length < 1) {
      return
    }

    updateConversation(Role.USER, prompt)
    setPrompt('')

    try {
      const answer = await sendQuestion(prompt, conversation)
      updateConversation(Role.ASSISTANT, answer)
    } catch (e) {
      if (e instanceof Error) {
        console.error('[Error]', e.message)
      }
    }
  }, [conversation, prompt, updateConversation])

  useEffect(() => {
    console.log('© 2023 FABIO BOCCHINI')
  }, [])

  return (
    <div
      className='flex p-5 pt-0 justify-center'
      style={{ minHeight: '100svh' }}
    >
      <div className='flex flex-col max-w-2xl w-full min-h-max items-center justify-end'>
        <div className='fixed top-5'>
          <AsciiFace />
        </div>
        <ConversationBox conversation={conversation} />
        <TextInput prompt={prompt} setPrompt={setPrompt} handleSubmit={handleSubmit} />
      </div>
    </div>
  )
}

export default Home
