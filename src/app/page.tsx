import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session"
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react"

export default async function Home() {
  const user = await getCurrentUser()
  console.log(user);
  
  if (!user) {
    return (
      <>
        <h1>AgriConnect</h1>
        <h2>Pas connecter</h2>
      </>
    )
  }

  // const handleClick = async () => {
  //   signOut({ redirect: true, callbackUrl: "/signin" })
  // }

  return (
    <>
      <h1>AgriConnect</h1>
      <h2>Connecter</h2>

      {/* <button onClick={handleClick}>se deconnecter</button> */}
    </>
  )
}
