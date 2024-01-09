import React, { HTMLAttributes } from 'react'
import { Conversations, Conversation, Message, Messages } from '../messages'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { env } from '@/lib/env'
import { Separator } from '@/components/ui/separator'
import { User } from 'next-auth'
import { VisitorAccount } from './visitor-account'

type Props = {
  conversations: Conversations
  selectedConversation: Conversation | null
  setSelectedConversation: (conversation: Conversation) => void
  user: User
}

export const LateralBar = ({ conversations, selectedConversation, setSelectedConversation, user }: Props) => {
  return (
    <nav className='flex flex-col w-1/5 min-w-[300px] p-2 gap-1 overflow-y-scroll overflow-x-hidden'>
      {user.role === 'admin' ? (<><VisitorAccount user={user} /><Separator /></>) : null}
      {conversations.map(
        (conversation: Conversation) => (
          <ConversationComponent key={conversation.receiver} conversation={conversation} onClick={() => setSelectedConversation(conversation)} />
        )
      )}
    </nav>
  )
}

type ConversationProps = {
  conversation: Conversation
  onClick: () => void
}

const ConversationComponent = ({ conversation, onClick }: ConversationProps) => {
  return (
    <div key={conversation.receiver} className='flex items-center gap-2 cursor-pointer hover:bg-secondary p-2 rounded-md' onClick={onClick}>
      <Avatar>
        <AvatarFallback>
          {conversation.receiver}
        </AvatarFallback>
      </Avatar>
      <div className='flex flex-col'>
        <p className='font-bold'>{conversation.receiver}</p>
        <p className='line-clamp-1'>{conversation.messages[conversation.messages.length - 1].content}</p>
      </div>
    </div>
  )
}

