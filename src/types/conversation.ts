export enum Role {
  SYSTEM = 'system',
  USER = 'user',
  ASSISTANT = 'assistant'
}

export type Message = {
  role: Role
  content: string
}

export type Conversation = Message[]
