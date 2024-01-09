import MainNavBar from "@/components/main-navbar"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"


export default async function Explore() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login?redirect=/checkout')
  }

  return (
    <>
      <MainNavBar role={user?.role || "visitor"} />
      <main>
        <h1>Checkout</h1>
      </main>
    </>
  )
}