'use client';

import React from 'react'
import { Messages, Message, Conversation, Conversations } from '../messages';
import { MessageView } from './message-view';
import { LateralBar } from './lateral-bar';
import { env } from '@/lib/env';
import { User } from 'next-auth';

type Props = {
  conversations: Conversations
  user: User
}

export const Messagerie = ({ conversations, user }: Props) => {
  const [selectedConversation, setSelectedConversation] = React.useState<Conversation | null>(null)

  const sendMessage = async (message: string, idReceiver: string) => {
    const currentConversationId = selectedConversation?.receiver
    const formData = new FormData()
    formData.append('message', message)
    formData.append('destinataire', idReceiver)
    await fetch(env.NEXT_PUBLIC_API_URL + '/message', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.accessToken}`
      },
      body: formData
    })
  
    if (currentConversationId) {
      const conversation = conversations.find(conversation => conversation.receiver === currentConversationId)
      if (conversation) {
        setSelectedConversation(conversation)
      }
    }

  }

  return (
    <div className='flex divide-x h-[calc(100vh-64px)]'>
      <LateralBar conversations={conversations} setSelectedConversation={setSelectedConversation} selectedConversation={selectedConversation} user={user} />
      <MessageView conversation={selectedConversation} sendMessage={sendMessage} />
    </div>
  )
}
