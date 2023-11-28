import OtherNumber from '@/app/home/components/home-state';
import InfoSectionProducer from '@/app/home/components/home-whyJoin';
import Join from '@/app/home/components/producer-join';
import MainNavBar from '@/components/main-navbar';
import { getCurrentUser } from '@/lib/session';
import Image from 'next/image';

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
              <Join />
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
