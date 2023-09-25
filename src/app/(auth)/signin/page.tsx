import { type Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
// import { env } from "@/env.mjs"
import { getCurrentUser } from "@/lib/session"

import { Button, buttonVariants } from "@/components/ui/button"
import { SignInForm } from "@/components/forms/signin-form"

export const metadata: Metadata = {
  // metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Sign In",
  description: "Sign in to your account",
}

export default async function SignInPage() {
  const user = await getCurrentUser()
  if (user) redirect("/");

  return (
    <div className="relative flex items-center justify-center p-8">
      <Link className={buttonVariants({ variant: "ghost" }) + " absolute top-8 right-8"} href="signup">Créer un compte</Link>
      <div className="flex flex-col gap-6 w-full max-w-xs">
        <h1 className="text-xl">Se connecter</h1>
        <SignInForm />
        <p className="text-sm text-muted-foreground text-center">En cliquant sur Créer, vous acceptez nos Conditions d&apos;utilisation et politique de confidentialité.</p>
      </div>
    </div>
  )
}