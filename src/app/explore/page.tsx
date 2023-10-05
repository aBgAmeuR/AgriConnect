import MainNavBar from "@/components/main-navbar"
import { getCurrentUser } from "@/lib/session"

export default async function Explore() {
  const user = await getCurrentUser()

  return (
    <>
      <MainNavBar role={user?.role || "visitor"} />
      <main>Explore</main>
    </>
  )
}