import MainNavBar from "@/components/main-navbar"
import { Step, Steps } from "@/components/ui/steps"
import { getCurrentUser } from "@/lib/session"

export default async function Home() {
  const user = await getCurrentUser()

  return (
    <>
      <MainNavBar role={user?.role || "visitor"} />
      <h1>AgriConnect</h1>
      <p>Role : {user?.role}</p>
    </>
  )
}
