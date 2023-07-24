import { Conversation } from '@/types/conversation'
import { prompt } from '@/utils/prompt'

export async function sendQuestion(
  question: string,
  conversation: Conversation
) {
  const numberOfMessagesInConversation = parseInt(
    process.env.NEXT_PUBLIC_MESSAGES_IN_CONVERSATION || '12'
  )
  const trimmedConversation = conversation.slice(
    -numberOfMessagesInConversation
  )

  const messages = [
    { role: 'system', content: prompt },
    ...trimmedConversation,
    { role: 'user', content: question }
  ]

  console.log(messages)

  const result = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ messages })
  })

  if (!result.ok) {
    throw new Error(`error occured during fetch with code ${result.status}`)
  }

  return result.json()
}
