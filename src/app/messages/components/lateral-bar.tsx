import React, { HTMLAttributes } from 'react'
import { Conversations, Conversation, Message, Messages } from '../messages'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

type Props = {
  conversations: Conversations
  selectedConversation: Conversation | null
  setSelectedConversation: (conversation: Conversation) => void
}

export const LateralBar = ({ conversations, selectedConversation, setSelectedConversation }: Props) => {
  return (
    <nav className='flex flex-col w-1/5 min-w-[200px] p-2 gap-1'>
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
