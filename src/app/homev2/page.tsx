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
        <main className=" w-full min-h-screen flex flex-col">
          <section className='relative h-[650px] w-full'>
            <div className='absolute w-full h-full -z-10 overflow-hidden'>
              <Image src="/p/svg/bg1.svg" alt="Background" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className='max-w-lg flex flex-col gap-6 mt-28 ml-[15vw]'>
              <h1 className='text-4xl font-extrabold'>L'achat en direct auprès des producteurs : une solution gagnante pour tous.</h1>
              <div className='gap-2 flex'>
                <Button variant="default">Commencer</Button>
                <Button variant="outlineGreen">Je suis un producteur</Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
