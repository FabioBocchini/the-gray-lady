import { ChildProcessWithoutNullStreams } from 'child_process'
import { HttpResponse, HttpStatusCode } from '@/types/http'

export const transferChildProcessOutput = (
  cmd: ChildProcessWithoutNullStreams
): Promise<HttpResponse> =>
  new Promise(resolve => {
    let output = ''
    let errorOutput = ''

    cmd.stdout.on('data', chunk => {
      output += chunk.toString()
    })

    cmd.stderr.on('data', chunk => {
      errorOutput += chunk
        .toString()
        .split('\n')
        .map((line: string) => '[Error] ' + line)
        .join('\n')
    })

    cmd.on('close', code => {
      if (code === 0) {
        resolve({
          body: { data: output },
          status: HttpStatusCode.OK,
          headers: {
            'Cache-Control': 'no-cache'
          }
        })
      } else {
        console.error('Process finished with code', code)
        console.error('[Error]', errorOutput)
        resolve({
          body: { data: errorOutput },
          status: HttpStatusCode.BAD_REQUEST
        })
      }
    })
  })
