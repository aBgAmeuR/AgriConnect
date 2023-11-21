import MainNavBar from "@/components/main-navbar"
import { getCurrentUser } from "@/lib/session"
import { AccountsTable } from "./components/accountsTable"

export default async function AccountsPage() {
  const user = await getCurrentUser()

  return (
    <>
      <MainNavBar role={user?.role || "visitor"} />
      <main className="mx-16 mt-6">
        <h1 className="text-xl mb-4">Liste des comptes</h1>
        <AccountsTable />
      </main>
    </>
  )
}