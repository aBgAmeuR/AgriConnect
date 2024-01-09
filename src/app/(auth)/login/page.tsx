import { type Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
// import { env } from "@/env.mjs"
import { getCurrentUser } from "@/lib/session"

import { Button, buttonVariants } from "@/components/ui/button"
import { LoginForm } from "@/components/forms/login-form"

export const metadata: Metadata = {
  // metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Login",
  description: "Login to your account",
}

export default async function LoginPage() {
  const user = await getCurrentUser()
  if (user) redirect("/");

  return (
    <div className="relative flex items-center justify-center p-8">
      <Link className={buttonVariants({ variant: "ghost" }) + " absolute top-8 left-8"} href="explore">Accueil</Link>
      <Link className={buttonVariants({ variant: "ghost" }) + " absolute top-8 right-8"} href="register">Créer un compte</Link>
      <div className="flex flex-col gap-3 w-[350px]">
        <h1 className="text-xl text-center">Se connecter</h1>
        <LoginForm />
        <p className="text-sm text-muted-foreground text-center">En cliquant sur Se connecter, vous acceptez nos Conditions d&apos;utilisation et politique de confidentialité.</p>
      </div>
    </div>
  )
}