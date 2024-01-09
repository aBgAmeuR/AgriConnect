'use client';

import React from 'react'
import { Messages, Message, Conversation, Conversations } from '../messages';
import { MessageView } from './message-view';
import { LateralBar } from './lateral-bar';

type Props = {
  conversations: Conversations
}

export const Messagerie = ({ conversations }: Props) => {
  const [selectedConversation, setSelectedConversation] = React.useState<Conversation | null>(null)

  return (
    <div className='flex divide-x h-[calc(100vh-64px)]'>
      <LateralBar conversations={conversations} setSelectedConversation={setSelectedConversation} selectedConversation={selectedConversation} />
      <MessageView conversation={selectedConversation} />
    </div>
  )
}
