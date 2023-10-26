import LocalProductsCard from '@/app/home/components/home-local';
import { SellProductsCard } from '@/app/home/components/home-online';
import InfoSection from '@/app/home/components/info-produit';
import MainNavBar from '@/components/main-navbar';
import { SelectCateg } from '@/components/select-categ';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectGroup } from '@/components/ui/select';
import { getCurrentUser } from '@/lib/session';
import Image from 'next/image';
import CategoriesShowcase from './components/home-catego';

export default async function HomePage() {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col items-stretch">
      <MainNavBar role={user?.role || 'visitor'} />
      <main className=" w-full h-screen">
        <div className=" flex items-center justify-center realtive w-full h-[263px] text-center">
          <div className="-z-10 w-full h-[263px] absolute">
            <Image src="/bienfaits-fruits-legumes.jpg" alt="Background" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="banner-hero-title flex flex-col gap-2 mx-16  items-center">
            <h1 className="text-3xl text-slate-50">Bienvenue sur agriconnect !</h1>
            <p className="text-sm text-slate-50">Retrouvez les produits du terroir et les producteurs en circuit court.</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="w-[1147px] h-[93px] px-[184px] justify-center items-center gap-2.5 inline-flex">
            <input
              type="search"
              className="flex h-9 w-[227px] text-zinc-500 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm  transition-colors 
              file:border-0 font-normal  leading-tight file:font-medium placeholder:text-muted-foreground focus-visible:outline-none
              focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 bg-white ml-1"
              placeholder="Que chercher vous ?"
            />

            <SelectCateg />

            <Input
              className="flex h-9 w-[227px] text-zinc-500 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm  transition-colors 
              file:border-0 font-normal  leading-tight file:font-medium placeholder:text-muted-foreground focus-visible:outline-none
              focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 bg-white ml-1 "
              placeholder="Localisation "
            />

            <div className="justify-center items-center gap-2 inline-flex">
              <Button>
                <p className="text-l text-center leading-tight">Rechercher</p>
              </Button>
            </div>
          </div>
        </div>

        <CategoriesShowcase />

        <InfoSection />

        <div className="-z-10 w-full h-[545px] absolute">
          <Image src="/home-picture.jpg" alt="Background" fill style={{ objectFit: 'cover' }} />

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-36">
            <LocalProductsCard />
            <SellProductsCard />
          </div>
        </div>
      </main>
    </div>
  );
}
