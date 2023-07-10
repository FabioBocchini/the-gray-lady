export type Role = 'system' | 'user' | 'assistant'

export type Message = {
  role: Role
  content: string
}

export type Conversation = Message[]
