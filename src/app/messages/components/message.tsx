import React from 'react'
import { Message } from '../messages'
import { cn } from '@/lib/utils'

type Props = {
  message: Message,
  orientation: 'left' | 'right'
}

export const MessageComponents = ({ message, orientation }: Props) => {
  return (
    <div className={cn('flex flex-col gap-1', orientation === 'left' ? 'items-start' : 'items-end')}>
      <div className={cn('flex flex-col gap-1 p-2 rounded-md', orientation === 'left' ? 'bg-secondary' : 'bg-primary text-white')}>
        <p className='text-sm'>{message.content}</p>
      </div>
    </div>
  )
}
