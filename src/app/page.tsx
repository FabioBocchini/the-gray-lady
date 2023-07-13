'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { Conversation, Message, Role } from '@/types/conversation'
import { changeChatRole, removeSystemMessages } from '@/utils/chat'
import AsciiFace from '@/app/components/asciiFace'
import Send from '../../public/asset/icons/send.svg'
import { sendQuestionToAI } from '@/utils/apiClient'

const Home: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('')
  const [conversation, setConversation] =
    useState<Conversation>([])
  const promptRef = useRef<HTMLTextAreaElement>(null)
  const conversationRef = useRef<HTMLDivElement>(null)

  const handleChangePrompt = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setPrompt(e.target.value)

      if (promptRef.current) {
        promptRef.current.style.height = 'auto'
        promptRef.current.style.height = `${promptRef.current.scrollHeight}px`
      }
    },
    [promptRef]
  )

  const scrollToBottom = useCallback(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTo(0, conversationRef.current.scrollHeight)
    }
  }, [])

  const updateConversation = useCallback((role: Role, content: string) => {
    setConversation(c => [...c, { role, content }])
  }, [])

  const handleSubmit = useCallback(async () => {
    if (prompt.length < 1) {
      return
    }
    updateConversation(Role.USER, prompt)
    setPrompt('')
    const answer = await sendQuestionToAI(prompt, conversation)
    updateConversation(Role.ASSISTANT, answer)
  }, [conversation, prompt, updateConversation])

  const handleOnPromptKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        return handleSubmit()
      }
    },
    [handleSubmit]
  )

  useEffect(() => {
    scrollToBottom()
  }, [scrollToBottom, conversation])

  return (
    <div
      className="flex p-5 pt-0 justify-center"
      style={{ minHeight: '100svh' }}
    >
      <div className="flex flex-col max-w-2xl w-full min-h-max items-center justify-end">
        <div className="fixed top-5">
          <AsciiFace />
        </div>
        <div
          ref={conversationRef}
          className={clsx(
            'flex flex-col flex-grow flex-nowrap',
            'w-full border-2 border-better-white px-5 mb-5 max-h-80 overflow-y-auto',
            'backdrop-filter backdrop-blur-sm'
          )}
        >
          <div className="mt-auto">
            {removeSystemMessages(conversation).map(
              (message: Message, index: number) => (
                <div className="mb-2 text-md" key={index}>
                  <span className="font-extrabold inline">
                    {`${changeChatRole(message.role)}: `}
                  </span>
                  <span className="font-thin inline whitespace-pre-line">
                    {message.content}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
        <div className="flex flex-row justify-end w-full bg-better-gray border-2 border-better-gray">
          <textarea
            ref={promptRef}
            className={clsx(
              'w-full bg-transparent text-better-white p-3 focus:outline-none font-extralight',
              'resize-none max-h-40 overflow-y-auto'
            )}
            placeholder="write a message"
            rows={1}
            value={prompt}
            onChange={handleChangePrompt}
            onKeyDown={handleOnPromptKeyDown}
          />
          <button
            className="flex items-end justify-center w-12 p-2"
            onClick={handleSubmit}
          >
            <Image src={Send} alt="send" width={30} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
