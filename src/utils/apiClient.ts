import { Conversation } from '@/types/conversation'

export async function sendQuestionToAI(
  question: string,
  conversation: Conversation
): Promise<string> {
  const trimmedConversation = conversation.slice(-12)
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
