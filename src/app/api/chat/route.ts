import { NextResponse } from 'next/server'
import { HttpStatusCode } from '@/types/http'

export async function POST(request: Request): Promise<NextResponse> {
  const { messages } = await request.json()
  const openAiModel = process.env.OPENAI_API_MODEL || 'gpt-3.5-turbo'
  const openAiKey = process.env.OPENAI_API_KEY

  if (messages.length <= 0) {
    return NextResponse.json(
      { error: 'there must be at least one message in conversation' },
      { status: HttpStatusCode.BAD_REQUEST }
    )
  }

  if (!openAiKey) {
    return NextResponse.json(
      { error: 'openAi api key not specified' },
      { status: HttpStatusCode.FORBIDDEN }
    )
  }

  const result = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    body: JSON.stringify({ messages, model: openAiModel }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${openAiKey}`
    }
  })

  if (!result.ok) {
    return NextResponse.json(
      { error: 'error occurred during openai api call' },
      { status: result.status }
    )
  }

  const aiResponse = await result.json()

  return NextResponse.json(aiResponse.choices[0].message.content, {
    status: HttpStatusCode.OK,
    headers: { 'Cache-Control': 'no-cache' }
  })
}
