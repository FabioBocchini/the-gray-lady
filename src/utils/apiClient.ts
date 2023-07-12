export async function sendQuestionToAI(
  question: string,
  conversation: string
): Promise<string> {
  const res = await fetch(`/api/chat`, {
    method: 'POST',
    body: JSON.stringify({ question, conversation })
  })

  const { data } = await res.json()

  return data
    .split('\n')
    .filter((line: string) => !line.startsWith('[Error]'))
    .join('\n')
}
