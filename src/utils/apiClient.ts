import { Conversation } from '@/types/conversation'

const numberOfMessagesInConversation = 12

export async function sendQuestionToAI(
  question: string,
  conversation: Conversation
): Promise<string> {
  const trimmedConversation = conversation.slice(-numberOfMessagesInConversation)
  const res = await fetch(`/api/chat`, {
    method: 'POST',
    body: JSON.stringify({ question, conversation: JSON.stringify(trimmedConversation) })
  })

  const { data } = await res.json()

  return data
    .split('\n')
    .filter((line: string) => !line.startsWith('[Error]'))
    .join('\n')
}
