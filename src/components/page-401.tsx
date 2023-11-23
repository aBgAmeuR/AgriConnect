import MainNavBar from "@/components/main-navbar"
import { getCurrentUser } from "@/lib/session"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { redirect } from 'next/navigation';

export default async function Page401() {
  const user = await getCurrentUser()

  if (!user) redirect("/login")

  return (
    <>
      <MainNavBar role={user?.role || "visitor"} />
      <main className="flex items-center justify-center flex-col h-[calc(100vh-64px)] text-lg">
        <h2>OOPS! VOUS N'ÊTES PAS AUTORISÉ</h2>
        <h1 className="text-[100px] font-black leading-tight">401</h1>
        <h2>NOUS SOMMES DÉSOLÉS, MAIS VOUS NE POURREZ PAS VOIR LE CONTENU DE CETTE PAGE</h2>
        {(user?.role === "visitor" || !user?.role) ? (
          <Link href="/login">
            <Button className="mt-4">Se connecter</Button>
          </Link>
        ) : null}
      </main>
    </>
  )
}
