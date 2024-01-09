import React from 'react'
import { Messages, Conversation, Message } from '../messages'
import { MessageComponents } from './message'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type Props = {
  conversation: Conversation | null
}

export const MessageView = ({ conversation }: Props) => {
  const getMessageOrientation = (message: Message) => {
    if (message.sender === conversation?.receiver) {
      return 'left'
    } else {
      return 'right'
    }
  }

  return (
    <div className='flex flex-col justify-between gap-2 w-full h-full'>
      <div className='w-full flex flex-col gap-4 p-4'>
        {conversation?.messages.map((message) => (
          <MessageComponents key={message.id} message={message} orientation={getMessageOrientation(message)} />
        ))}
      </div>
      <div className='w-full justify-center items-center px-8 py-4'>
        <form className='flex w-full h-full gap-2'>
          <Input type="text" className='w-full h-full' />
          <Button size={'sm'} type="submit">Envoyer</Button>
        </form>
      </div>
    </div>
  )
}

