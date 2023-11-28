import MainNavBar from '@/components/main-navbar';
import { getCurrentUser } from '@/lib/session';
import Image from 'next/image';
import SearchBar from './home/components/search-bar';
import CategoriesShowcase from './home/components/home-catego';
import InfoSection from './home/components/info-produit';
import HomePageCard from '@/app/home/components/home-page-card';

const cardExplore = {
  title: 'Je veux acheter des produits locaux !',
  description: 'Vous souhaitez découvrir les producteurs en circuit court proches de vous, connaître d’autres spécialités régionales et faire le plein de produits du terroir ? Inscrivez-vous et achetez vos produits directement auprès de vos producteurs.',
  href: '/explore',
  buttonLabel: 'Commencer',
};

const cardSell = {
  title: 'Je veux vendre mes produits en ligne',
  description: 'Vous souhaitez découvrir les producteurs en circuit court proches de vous, connaître d’autres spécialités régionales et faire le plein de produits du terroir ? Inscrivez-vous et achetez vos produits directement auprès de vos producteurs.',
  href: '/register',
  buttonLabel: "Créer un compte producteur",
};

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <>
      <div className="flex flex-col items-stretch">
        <MainNavBar role={user?.role || 'visitor'} />
        <main className=" w-full min-h-screen flex flex-col">
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

          <div className="w-full min-h-full h-[517px] relative">
            <Image src="/home-picture.jpg" alt="Background" fill style={{ objectFit: 'cover' }} />

            <div className="relative mx-16 gap-12 flex flex-row items-center justify-between space-y-8 h-96">
              <HomePageCard {...cardExplore} />
              <HomePageCard {...cardSell} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
