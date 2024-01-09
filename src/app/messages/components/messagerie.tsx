'use client';

import React from 'react'
import { Messages, Message, Conversation, Conversations, MessagesSchema } from '../messages';
import { MessageView } from './message-view';
import { LateralBar } from './lateral-bar';
import { env } from '@/lib/env';
import { User } from 'next-auth';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const getMessageUserId = (message: Message, currentUserId: string) => {
  if (message.sender === currentUserId) {
    return message.receiver
  } else {
    return message.sender
  }
}

const formatConversation = (messages: Messages, currentUserId: string): Conversations => {
  const MessagesByCorresponding: Record<string, Message[]> = {}
  messages.forEach(message => {
    const userId = getMessageUserId(message, currentUserId)
    if (MessagesByCorresponding[userId]) {
      MessagesByCorresponding[userId].push(message)
    } else {
      MessagesByCorresponding[userId] = [message]
    }
  })

  Object.entries(MessagesByCorresponding).forEach(([userId, messages]) => {
    messages.sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateA.getTime() - dateB.getTime()
    })
  })

  const conversations: Conversations = []
  Object.entries(MessagesByCorresponding).forEach(([userId, messages]) => {
    conversations.push({
      date: messages[messages.length - 1].date,
      receiver: userId,
      messages: messages
    })
  })


  return conversations
}

type Props = {
  user: User
}

const conversationsByUser = async ({ user }: { user: User }) => {
  const res = await fetch(env.NEXT_PUBLIC_API_URL + '/messages', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user?.accessToken}`
    }
  })
  const json = await res.json()
  const messages: Messages = MessagesSchema.parse(json.data)
  const conversations = formatConversation(messages, user?.id || '')
  return conversations
}

export const Messagerie = ({ user }: Props) => {
  const [selectedConversation, setSelectedConversation] = React.useState<Conversation | null>(null)
  const queryClient = useQueryClient()
  const { data: conversations, isError, isLoading } = useQuery({
    queryKey: ['conversations', user],
    queryFn: async () => await conversationsByUser({ user }),
    enabled: !!user
  })

  if (isLoading || isError || !conversations) {
    return <div>Chargement...</div>
  }

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
    await queryClient.invalidateQueries({ queryKey: ['conversations', user] })
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
