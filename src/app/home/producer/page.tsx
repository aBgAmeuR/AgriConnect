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
import CategoriesShowcase from '../components/home-catego';
import SearchBar from '../components/search-bar';
import Join from '../components/producer-join';
import InfoSectionProducer from '../components/home-whyJoin';
import OtherNumber from '../components/home-state';

export default async function HomePageProducer() {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col items-stretch">
      <MainNavBar role={user?.role || 'visitor'} />
      <main className=" w-full min-h-screen ">
        <div className=" flex items-center justify-center realtive w-full h-[470px] ">
          <div className="-z-10 w-full h-[470px] absolute">
            <Image src="/home-picture.jpg" alt="Background" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col sm:flex-row">
            <Join />
          </div>
        </div>

        <InfoSectionProducer />

        <div className="bg-green-800 h-[300px] w-full flex flex-row">
          <OtherNumber />
        </div>
      </main>
    </div>
  );
}
