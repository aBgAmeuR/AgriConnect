import OtherNumber from '@/app/home/components/home-state';
import InfoSectionProducer from '@/app/home/components/home-whyJoin';
import MainNavBar from '@/components/main-navbar';
import HomePageCard from '@/app/home/components/home-page-card';
import { getCurrentUser } from '@/lib/session';
import Image from 'next/image';

const card1 = {
  title: 'Vendez vos produits de la ferme en ligne et en direct',
  description: 'Vous souhaitez découvrir les producteurs en circuit court proches de vous, connaître d’autres spécialités régionales et faire le plein de produits du terroir ? Inscrivez-vous et achetez vos produits directement auprès de vos producteurs.',
  href: '/register',
  buttonLabel: "Je m'inscris",
};

export default async function ProducerPage() {
  const user = await getCurrentUser();
  return (
    <>
      <div className="flex flex-col items-stretch">
        <MainNavBar role={user?.role || 'visitor'} />
        <main className=" w-full min-h-screen ">
          <div className=" flex items-center justify-center realtive w-full h-[470px] ">
            <div className="-z-10 w-full h-[470px] absolute">
              <Image src="/home-picture.jpg" alt="Background" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col sm:flex-row">
              <HomePageCard {...card1} />
            </div>
          </div>

          <InfoSectionProducer />

          <div className="bg-green-800 h-[300px] w-full flex flex-row">
            <OtherNumber />
          </div>
        </main>
      </div>
    </>
  );
}
