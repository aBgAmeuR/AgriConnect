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
import SearchBar from './components/search-bar';

export default async function HomePage() {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col items-stretch">
      <MainNavBar role={user?.role || 'visitor'} />
      <main className=" w-full min-h-screen">
        <div className=" flex items-center justify-center realtive w-full h-[263px] text-center">
          <div className="-z-10 w-full h-[263px] absolute">
            <Image src="/bienfaits-fruits-legumes.jpg" alt="Background" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="banner-hero-title flex flex-col gap-2 mx-16  items-center">
            <h1 className="text-3xl text-slate-50">Bienvenue sur agriconnect !</h1>
            <p className="text-sm text-slate-50">Retrouvez les produits du terroir et les producteurs en circuit court.</p>
          </div>
        </div>
        <div className="h-[100px] w-full flex flex-col justify-center items-center">
          <SearchBar />
        </div>

        <CategoriesShowcase />

        <InfoSection />

        <div className="-z-10 w-full h-[545px] absolute">
          <Image src="/home-picture.jpg" alt="Background" fill style={{ objectFit: 'cover' }} />

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-36 flex-col md:flex-row ">
            <LocalProductsCard />
            <SellProductsCard />
          </div>
        </div>
      </main>
    </div>
  );
}
