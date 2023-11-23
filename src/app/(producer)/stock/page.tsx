import MainNavBar from "@/components/main-navbar"
import { getCurrentUser } from "@/lib/session"
import { permissions } from "@/config/permissions"
import Page401 from "@/components/page-401"

export default async function StockPage() {
  const user = await getCurrentUser()

  if (!permissions["/stock"].includes(user?.role || "visitor")) return <Page401 />

  return (
    <>
      <MainNavBar role={user?.role || "visitor"} />
      <main>StockPage</main>
    </>
  )
}
