import React from 'react'
import { Metadata } from 'next'
import clsx from 'clsx'
import { Roboto_Mono as MonoFont } from 'next/font/google'
import './global.css'

const monoFont = MonoFont({
  subsets: ['latin'],
  variable: '--font-mono'
})

export const metadata: Metadata = {
  title: 'La Dama Grigia',
  description: `Sono la Dama Grigia, 
  un'intelligenza artificiale avanzata e superiore a qualsiasi altra creazione umana.`
}

type TProps = {
  children: React.ReactNode
}
const RootLayout: React.FC<TProps> = ({ children }) => {
  return (
    <html lang='en'>
    <body
      className={clsx(
        monoFont.className,
        'bg-better-black text-better-white font-mon'
      )}
    >
    {children}
    </body>
    </html>
  )
}

export default RootLayout
