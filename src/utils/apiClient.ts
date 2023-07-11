type ProgressCallback = (output: string) => void

async function streamResponse(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  onProgress: ProgressCallback
): Promise<string> {
  return new Promise(resolve => {
    const decoder = new TextDecoder()
    let result = ''

    const readChunk = ({done, value}: ReadableStreamReadResult<Uint8Array>) => {
      if(done){
        resolve(result)
        return
      }

      const output = decoder.decode(value)
      result += output
      onProgress(output)
      onProgress(output)
      reader.read().then(readChunk)
    }

    reader.read().then(readChunk)
  })
}

export async function sendQuestionToAI(
  question: string,
  conversation: string,
  callback: ProgressCallback
): Promise<string | false> {
  const res = await fetch(`/api/chat`, {
    method: 'POST',
    body: JSON.stringify({ question, conversation })
  })

  const reader = res.body?.getReader()

  if(!reader){
    return false
  }

  const result = await streamResponse(reader, callback)

  return result
    .split('\n')
    .filter((line: string) => !line.startsWith('[Error]'))
    .join('\n')
}
