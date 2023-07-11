import { Conversation, Role } from '@/types/conversation'

export function removeSystemMessages(conversation: Conversation): Conversation {
  return conversation.filter(message => message.role !== 'system')
}
export function changeChatRole(role: Role): string {
  switch (role){
    case Role.ASSISTANT: return 'The Gray Lady'
    case Role.USER: return 'You'

    default: return '[Error]'
  }
}
