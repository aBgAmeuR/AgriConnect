import MainNavBar from "@/components/main-navbar"
import { getCurrentUser } from "@/lib/session"
import { Messagerie } from "./components/messagerie"
import { env } from "@/lib/env"
import { MessagesSchema, Messages, Conversations, Message, Conversation } from "./messages"
import Page401 from "@/components/page-401"

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

export default async function MessagePage() {
  const user = await getCurrentUser()

  if (!user) {
    return <Page401 />
  }

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

  return (
    <>
      <MainNavBar role={user?.role || "visitor"} />
      <main>
        <Messagerie conversations={conversations} user={user} />
      </main>
    </>
  )
}