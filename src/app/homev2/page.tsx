import MainNavBar from '@/components/main-navbar';
import { getCurrentUser } from '@/lib/session';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <>
      <div className="flex flex-col items-stretch">
        <MainNavBar role={user?.role || 'visitor'} />
        <main className=" w-full flex flex-col gap-4">
          <section className='relative w-full h-[650px] xl:h-[750px] 2xl:h-[850px]'>
            <div className='absolute w-full h-full -z-10 overflow-hidden'>
              <Image src="/p/svg/bg1.svg" alt="Background" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className='max-w-lg flex flex-col gap-6 mt-24 ml-[10vw] xl:mt-32 xl:ml-[15vw] 2xl:mt-44 2xl:ml-[17vw]'>
              <h1 className='text-4xl font-extrabold leading-10'>L'achat en direct auprès des producteurs : une solution gagnante pour tous.</h1>
              <div className='gap-2 flex'>
                <Button variant="default">Commencer</Button>
                <Button variant="outlineGreen">Je suis un producteur</Button>
              </div>
            </div>
          </section>
          <section className='relative w-full flex flex-col gap-12'>
            <div className='w-full flex justify-center'>
              <h2 className='text-3xl font-semibold max-w-2xl text-center leading-9'>Découvrez comment AgriConnect connecte les producteurs locaux avec les clients</h2>
            </div>
            <div className='mx-4 flex flex-row justify-around'>
              <div className='flex flex-col gap-3 max-w-xs justify-center items-center'>
                <Image src="/p/svg/home1.svg" alt="Illutration 1" width={165} height={175} />
                <h3 className='text-2xl font-semibold text-center'>Explorez une large gamme de produits d'origine locale sur AgriConnect</h3>
              </div>
              <div className='flex flex-col gap-3 max-w-xs justify-center items-center'>
                <Image src="/p/svg/home2.svg" alt="Illutration 2" width={233} height={175} />
                <h3 className='text-2xl font-semibold text-center'>Soutenez les producteurs locaux et profitez de produits frais et de qualité</h3>
              </div>
              <div className='flex flex-col gap-3 max-w-xs justify-center items-center'>
                <Image src="/p/svg/home3.svg" alt="Illutration 3" width={175} height={175} />
                <h3 className='text-2xl font-semibold text-center'>Découvrez les avantages d'acheter localement sur AgriConnect</h3>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
