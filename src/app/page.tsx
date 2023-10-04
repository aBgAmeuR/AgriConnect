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
      <Steps current={2} className="ml-10 max-w-2xl">
        <Step number={1} label="Etape 1" />
        <Step number={2} label="Etape 2" />
        <Step number={3} label="Etape 3" />
      </Steps>
    </>
  )
}
