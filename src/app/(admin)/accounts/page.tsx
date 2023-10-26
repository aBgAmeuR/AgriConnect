import MainNavBar from "@/components/main-navbar"
import { getCurrentUser } from "@/lib/session"

export default async function AccountsPage() {
  const user = await getCurrentUser()

  return (
    <>
      <MainNavBar role={user?.role || "visitor"} />
      <main>Accounts</main>
    </>
  )
}