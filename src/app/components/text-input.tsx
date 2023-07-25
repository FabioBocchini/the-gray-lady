import React, { SetStateAction, useCallback, useEffect, useRef } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Send from '../../../public/asset/icons/send.svg'

type Props = {
  prompt: string
  setPrompt: React.Dispatch<SetStateAction<string>>
  handleSubmit: () => void
}

const TextInput: React.FC<Props> = ({ prompt, setPrompt, handleSubmit }) => {
  const promptRef = useRef<HTMLTextAreaElement>(null)

  const scrollPrompt = useCallback(() => {
    if (promptRef.current) {
      promptRef.current.style.height = 'auto'
      promptRef.current.style.height = `${promptRef.current.scrollHeight}px`
    }
  }, [])

  const handleChangePrompt = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setPrompt(e.target.value)
      scrollPrompt()
    },
    [setPrompt, scrollPrompt]
  )

  const handleOnPromptKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        return handleSubmit()
      }
    },
    [handleSubmit]
  )

  useEffect(() => {
    scrollPrompt()
  }, [prompt, scrollPrompt])

  return (
    <div className='flex flex-row justify-end w-full bg-better-gray border-2 border-better-gray z-50'>
    <textarea
      ref={promptRef}
      className={clsx(
        'w-full bg-transparent text-better-white p-3 focus:outline-none font-extralight',
        'resize-none max-h-40 overflow-y-auto'
      )}
      placeholder='scrivi un messaggio'
      rows={1}
      value={prompt}
      onChange={handleChangePrompt}
      onKeyDown={handleOnPromptKeyDown}
    />
      <button
        className='flex items-end justify-center w-12 p-2'
        onClick={handleSubmit}
      >
        <Image src={Send} alt='send' width={30} />
      </button>
    </div>
  )
}

export default TextInput
