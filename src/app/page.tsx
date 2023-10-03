import { Step, Steps } from "@/components/ui/steps"
import { getCurrentUser } from "@/lib/session"

export default async function Home() {
  const user = await getCurrentUser()

  if (!user) {
    return (
      <>
        <h1>AgriConnect</h1>
        <h2>Pas connecter</h2>
      </>
    )
  }

  return (
    <>
      <h1>AgriConnect</h1>
      <h2>Connecter</h2>
      <p>Role : {user.role}</p>
    </>
  )
}
