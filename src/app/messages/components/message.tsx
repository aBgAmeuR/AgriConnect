import React from 'react'
import { Message } from '../messages'
import { cn } from '@/lib/utils'

type Props = {
  message: Message,
  orientation: 'left' | 'right'
}
// jour mois année, heure minute
const formatDate = (date: string) => {
  const dateObject = new Date(date)
  const day = dateObject.getDate()
  const month = dateObject.getMonth() + 1
  const year = dateObject.getFullYear()
  const hours = dateObject.getHours()
  const minutes = dateObject.getMinutes()
  return `${day}/${month}/${year} ${hours}:${minutes}`
}

export const MessageComponents = ({ message, orientation }: Props) => {
  return (
    <div className={cn('flex flex-col gap-1', orientation === 'left' ? 'items-start' : 'items-end')}>
      <div className={cn('flex flex-col gap-1 p-2 rounded-md', orientation === 'left' ? 'bg-secondary' : 'bg-primary text-white')}>
        <p className='text-sm'>{message.content}</p>
      </div>
      <p className='text-xs text-gray-500'>{formatDate(message.date)}</p>
    </div>
  )
}
