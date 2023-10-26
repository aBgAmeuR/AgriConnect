import MainNavBar from "@/components/main-navbar"
import { getCurrentUser } from "@/lib/session"

export default async function MessagePage() {
  const user = await getCurrentUser()

  return (
    <>
      <MainNavBar role={user?.role || "visitor"} />
      <main>Messagerie</main>
    </>
  )
}