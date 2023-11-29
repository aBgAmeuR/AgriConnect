import MainNavBar from "@/components/main-navbar"
import { getCurrentUser } from "@/lib/session"
import { permissions } from "@/config/permissions"
import Page401 from "@/components/page-401"
import { OrdersTable } from "./components/commandsTable"

export default async function StockPage() {
  const user = await getCurrentUser()

  if (!permissions["/commands"].includes(user?.role || "visitor")) return <Page401 />

  return (
    <>
      <MainNavBar role={user?.role || "producer"} />
      <main className="mx-16 mt-6">
        <h1 className="text-xl mb-4">Gestion des commandes</h1>
        <OrdersTable  />
      </main>
    </>
  )
}
