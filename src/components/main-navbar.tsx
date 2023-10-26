import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { navBarBtns, navBarLinks } from '@/config/navBar';
import { NavBtnItem, NavLinkItem } from '@/types';
import Link from 'next/link';
import { Button } from './ui/button';
import { NavBarBtnsVisitor, NavBarLinks } from './main-navbar-client';

type NavBarProps = {
  role: string;
};

export default function MainNavBar({ role }: NavBarProps) {
  return (
    <header className="w-full h-16 px-4 border-b border-zinc-200 justify-between items-center inline-flex">
      <div className="justify-start items-center gap-4 flex">
        <div className="rounded-md justify-start items-center gap-2 flex text-sm">
          <Image src="/logo.png" alt="logo" height={24} width={24} />
          <div className="text-zinc-950 font-semibold">AgriConnect</div>
        </div>
        <div className="justify-start items-center gap-6 flex">
          <NavBarLinks role={role} />
        </div>
      </div>
      <div className="justify-start items-center gap-2 flex">{role === 'visitor' ? <NavBarBtnsVisitor /> : <NavBarBtnsOtherRoles role={role} />}</div>
    </header>
  );
}

const NavBarBtnsOtherRoles = ({ role }: { role: string }) => {
  const navBarBtnsList: NavBtnItem[] = navBarBtns[role as keyof typeof navBarBtns] as NavBtnItem[];

  return navBarBtnsList.map((item: NavBtnItem) => (
    <Link href={item.href}>
      <Button key={item.href} variant={item.variant}>
        {item.title}
      </Button>
    </Link>
  ));
};
