import MainNavBar from "@/components/main-navbar"
import { getCurrentUser } from "@/lib/session"
import { Messagerie } from "./components/messagerie"
import { env } from "@/lib/env"
import { MessagesSchema, Messages, Conversations, Message, Conversation } from "./messages"

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
  const res = await fetch(env.NEXT_PUBLIC_API_URL + '/messages', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user?.accessToken}`
    }
  })
  const json = await res.json()
  // const messages: Messages = MessagesSchema.parse(json.data)

  const messages: Messages = [
    {
      id: 'm1',
      sender: 'u1',
      receiver: 'u2',
      content: "Hello World",
      date: new Date().toISOString(),
    },
    {
      id: 'm2',
      sender: 'u1',
      receiver: 'u2',
      content: "Hello World",
      date: new Date().toISOString(),
    },
    {
      id: 'm3',
      sender: 'u2',
      receiver: 'u1',
      content: "Hello World",
      date: new Date().toISOString(),
    },
    {
      id: 'm4',
      sender: 'u1',
      receiver: 'u3',
      content: "Hello World",
      date: new Date().toISOString(),
    },
    {
      id: 'm5',
      sender: 'u1',
      receiver: 'u2',
      content: "Hello World",
      date: new Date().toISOString(),
    },
  ]

  const conversations = formatConversation(messages, "u1")
  console.log(conversations)

  return (
    <>
      <MainNavBar role={user?.role || "visitor"} />
      <main>
        <Messagerie conversations={conversations} />
      </main>
    </>
  )
}