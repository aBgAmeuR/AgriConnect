import MainNavBar from "@/components/main-navbar"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import { Product } from "../(producer)/producer/[nom]/data/schema"
import { CartCheckout } from "./cart"

type CartItem = {
  product: Product;
  quantity: number;
}

export default async function Explore() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login?redirect=/checkout')
  }


  return (
    <>
      <MainNavBar role={user?.role || "visitor"} />
      <main className="w-full mt-8 flex justify-center">
        <CartCheckout idUser={user?.id || ''} tokenUser={user?.accessToken || ''} />
      </main>
    </>
  )
}