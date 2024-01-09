import React from 'react'
import { Messages, Conversation, Message } from '../messages'
import { MessageComponents } from './message'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

type Props = {
  conversation: Conversation | null
  sendMessage: (message: string, idReceiver: string) => void
}

export const MessageView = ({ conversation, sendMessage }: Props) => {
  const getMessageOrientation = (message: Message) => {
    if (message.sender === conversation?.receiver) {
      return 'left'
    } else {
      return 'right'
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const message = formData.get('message') as string
    sendMessage(message, conversation?.receiver as string)
  }

  return (
    <div className='flex flex-col justify-between gap-2 w-full h-full'>
      <div className='w-full flex flex-col gap-4 p-4 overflow-y-scroll'>
        {conversation?.messages.map((message) => (
          <MessageComponents key={message.id} message={message} orientation={getMessageOrientation(message)} />
        ))}
      </div>
      <div className='w-full justify-center items-center px-8 py-4'>
        <form className='flex w-full h-full gap-2' onSubmit={onSubmit}>
          <Input type="text" className='w-full h-full' name='message' placeholder='Message' />
          <Button size={'sm'} type="submit">Envoyer</Button>
        </form>
      </div>
    </div>
  )
}

const VisitorAccountComponent = ({ user }: { user: any }) => {
  return (
    <div className='flex items-center gap-2 cursor-pointer hover:bg-secondary p-2 rounded-md'>
      <Avatar>
        <AvatarFallback>
          {user.id}
        </AvatarFallback>
      </Avatar>
      <div className='flex flex-col'>
        <p className='font-bold'>{user.id}</p>
        <p className='line-clamp-1'>{user.email}</p>
      </div>
    </div>
  )
}

