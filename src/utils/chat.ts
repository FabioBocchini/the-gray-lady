import { Conversation, Role } from '@/types/conversation'

export function removeSystemMessages(conversation: Conversation): Conversation{
  return conversation.filter(message => message.role !== 'system')
}
export function changeChatRole(role: Role): string {
  switch (role){
    case 'assistant': return 'The Gray Lady'
    case 'user': return 'You'

    default: return ''
  }
}
