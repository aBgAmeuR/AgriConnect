import MainNavBar from "@/components/main-navbar"
import { getCurrentUser } from "@/lib/session"
import { Messagerie } from "./components/messagerie"
import { env } from "@/lib/env"
import { MessagesSchema, Messages, Conversations, Message, Conversation } from "./messages"
import Page401 from "@/components/page-401"

export default async function MessagePage() {
  const user = await getCurrentUser()

  if (!user) {
    return <Page401 />
  }

  return (
    <>
      <MainNavBar role={user?.role || "visitor"} />
      <main>
        <Messagerie user={user} />
      </main>
    </>
  )
}