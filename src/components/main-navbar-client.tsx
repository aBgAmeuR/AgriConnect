'use client'

import { navBarBtns, navBarLinks } from "@/config/navBar"
import { NavBtnItem, NavLinkItem } from "@/types"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"

export const NavBarLinks = ({ role }: { role: string }) => {
  const pathname = usePathname()
  const navBarLinksList: NavLinkItem[] = navBarLinks[role as keyof typeof navBarLinks]

  return navBarLinksList.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      className={`${pathname === item.href
        ? "text-zinc-950"
        : "text-zinc-500 hover:text-zinc-950"
        } font-semibold text-sm`}
    >
      {item.title}
    </Link>
  ))
}

export const NavBarBtnsVisitor = () => {
  const pathname = usePathname()
  const navBarBtnsList: [NavBtnItem[], NavBtnItem] = navBarBtns['visitor']
  const leftBtn: NavBtnItem = navBarBtnsList[0].find((item) => item.href !== pathname) as NavBtnItem

  return (
    <>
      <Link href={leftBtn.href}>
        <Button variant={leftBtn.variant}>
          {leftBtn.title}
        </Button>
      </Link>
      <Link href={navBarBtnsList[1].href}>
        <Button variant={navBarBtnsList[1].variant}>
          {navBarBtnsList[1].title}
        </Button>
      </Link>
    </>
  )
}