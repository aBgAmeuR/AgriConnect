'use client'

import Image from "next/image"
import { usePathname } from "next/navigation"
import { navBarBtns, navBarLinks } from "@/config/navBar"
import { NavBtnItem, NavLinkItem } from "@/types"
import Link from "next/link"
import { Button } from "./ui/button"

type NavBarProps = {
  role: string
}

export default function MainNavBar({ role }: NavBarProps) {
  const pathname = usePathname()
  const navBarLinksList: NavLinkItem[] = navBarLinks[role as keyof typeof navBarLinks]

  return (
    <header className="w-full h-16 px-4 border-b border-zinc-200 justify-between items-center inline-flex">
      <div className="justify-start items-center gap-4 flex">
        <div className="rounded-md justify-start items-center gap-2 flex text-sm">
          <Image src="/logo.png" alt="logo" height={24} width={24} />
          <div className="text-zinc-950 font-semibold">AgriConnect</div>
        </div>
        <div className="justify-start items-center gap-6 flex">
          {navBarLinksList.map((item) => (
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
          ))}
        </div>
      </div>
      <div className="justify-start items-center gap-2 flex">
        {role === "visitor" ?
          <NavBarBtnsVisitor pathname={pathname} /> :
          <NavBarBtnsOtherRoles role={role} />
        }
      </div>
    </header>
  )
}

const NavBarBtnsOtherRoles = ({ role }: { role: string }) => {
  const navBarBtnsList: NavBtnItem[] = navBarBtns[role as keyof typeof navBarBtns] as NavBtnItem[]

  return navBarBtnsList.map((item: NavBtnItem) => (
    <Link href={item.href}>
      <Button key={item.href} variant={item.variant}>
        {item.title}
      </Button>
    </Link>
  ))
}

const NavBarBtnsVisitor = ({ pathname }: { pathname: string }) => {
  const navBarBtnsList: [NavBtnItem[], NavBtnItem] = navBarBtns['visitor']
  const outlinBtn: NavBtnItem = navBarBtnsList[0].find((item) => item.href !== pathname) as NavBtnItem

  return (
    <>
      <Link href={outlinBtn.href}>
        <Button variant={outlinBtn.variant}>
          {outlinBtn.title}
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