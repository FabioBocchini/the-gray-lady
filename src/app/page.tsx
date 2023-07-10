'use client'
import React, { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { Conversation, Message } from '@/types/conversation'
import { changeChatRole } from '@/utils/chat'
import AsciiFace from '@/app/components/asciiFace'
import Send  from '../../public/asset/icons/send.svg'

const conversation: Conversation = [
  {role: 'user', content: `hi, what's your name?` },
  {role: 'assistant', content: `i am the great AI, the Gray Lady` }
]

const Home: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('')
  const promptRef = useRef<HTMLTextAreaElement>(null)

  const handleChangePrompt = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value)

    if(promptRef.current){
      promptRef.current.style.height = 'auto'
      promptRef.current.style.height = `${promptRef.current.scrollHeight}px`
    }
  }, [promptRef])

  const handleSubmit = useCallback(() => {
    console.log('submit!')
    setPrompt('')
  },[])

  const handleOnPromptKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  },[handleSubmit])



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
          className={clsx(
            'flex flex-col flex-grow justify-end',
            'w-full border-2 border-better-white px-5 mb-5 max-h-60 overflow-y-auto',
            'backdrop-filter backdrop-blur-sm'
          )}
        >
          {conversation.map((message: Message, index: number) => (
              <div className="flex items-center mb-2 text-md flex-wrap" key={index}>
                <span className="flex font-extrabold mr-2 max-w-full">{`${changeChatRole(message.role)}: `}</span>
                <span className="flex font-thin">{message.content}</span>
              </div>
          ))}
        </div>
        <div className="flex flex-row justify-end w-full bg-better-gray border-2 border-better-gray">
          <textarea
            ref={promptRef}
            className={ clsx(
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
