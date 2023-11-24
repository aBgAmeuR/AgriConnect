import MainNavBar from "@/components/main-navbar"
import { getCurrentUser } from "@/lib/session"
import { ProducersListMap } from "./components/producers-list-map"


export default async function Explore() {
  const user = await getCurrentUser()

  return (
    <>
      <MainNavBar role={user?.role || "visitor"} />
      <main className="grid grid-cols-2 h-[calc(100vh-64px)]">
        <ProducersListMap />
      </main>
    </>
  )
}