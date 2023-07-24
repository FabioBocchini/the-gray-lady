import React, { useCallback, useEffect, useRef } from 'react'
import clsx from 'clsx'
import { changeChatRole, removeSystemMessages } from '@/utils/chat'
import { Conversation, Message } from '@/types/conversation'

type Props = {
  conversation: Conversation
}

const ConversationBox: React.FC<Props> = ({ conversation }) => {
  const conversationRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTo(0, conversationRef.current.scrollHeight)
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [scrollToBottom, conversation])

  return (
    <div
      ref={conversationRef}
      className={clsx(
        'flex flex-col flex-grow flex-nowrap',
        'w-full border-2 border-better-white px-5 mb-5 max-h-80 overflow-y-auto',
        'backdrop-filter backdrop-blur-sm'
      )}
    >
      <div className='mt-auto'>
        {removeSystemMessages(conversation).map(
          (message: Message, index: number) => (
            <div className='mb-2 text-md' key={index}>
                  <span className='font-extrabold inline'>
                    {`${changeChatRole(message.role)}: `}
                  </span>
              <span className='font-thin inline whitespace-pre-line'>
                    {message.content}
                  </span>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default ConversationBox
