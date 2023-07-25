import { Conversation, Role } from '@/types/conversation'

export function removeSystemMessages(conversation: Conversation): Conversation {
  return conversation.filter(message => message.role !== 'system')
}
export function changeChatRole(role: Role): string {
  switch (role) {
    case Role.ASSISTANT:
      return 'La Dama Grigia'
    case Role.USER:
      return 'Tu'

    default:
      return '[Error]'
  }
}
