import { spawn } from 'child_process'
import path from 'path'
import { transferChildProcessOutput } from '@/utils/shell'
import { NextResponse } from 'next/server'
import { Request } from 'next/dist/compiled/@edge-runtime/primitives'
import { HttpResponse } from '@/types/http'

export async function POST(request: Request): Promise<NextResponse> {
  const { question, conversation } = await request.json()

  if (typeof question !== 'string') {
    return NextResponse.json(
      { error: 'Content must be string' },
      { status: 400 }
    )
  }

  if (question.length <= 0) {
    return NextResponse.json(
      { error: 'Content length must be greater than 0' },
      { status: 400 }
    )
  }

  const cmd = spawn(
    'python3',
    [
      path.join(process.cwd(), 'scripts/gray_lady_chat.py'),
      conversation,
      question
    ],
    {
      cwd: process.cwd()
    }
  )

  const response: HttpResponse = await transferChildProcessOutput(cmd)

  return NextResponse.json(response.body, {
    status: response.status,
    headers: response.headers
  })
}
