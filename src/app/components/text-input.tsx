import React, { SetStateAction, useCallback, useRef } from 'react'
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

  const handleChangePrompt = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setPrompt(e.target.value)

      if (promptRef.current) {
        promptRef.current.style.height = 'auto'
        promptRef.current.style.height = `${promptRef.current.scrollHeight}px`
      }
    },
    [setPrompt]
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


  return (
    <div className='flex flex-row justify-end w-full bg-better-gray border-2 border-better-gray'>
    <textarea
      ref={promptRef}
      className={clsx(
        'w-full bg-transparent text-better-white p-3 focus:outline-none font-extralight',
        'resize-none max-h-40 overflow-y-auto'
      )}
      placeholder='write a message'
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