import Image from 'next/image';
import { getCurrentUser } from '@/lib/session';
import { ProducerData } from '@/types/producer';
import MainNavBar from '@/components/main-navbar';
import { ProducerCard } from './components/producer-card';
import { ProducerTabs } from './components/producer-tabs';
import { Button } from '@/components/ui/button';

const getData = async () => {
  const producerData = {
    name: 'Les fruits de marie',
    desc: 'Producteur de fruits',
    payement: 'Carte',
    adress: '123 rue de Lille',
    phoneNumber: '567891234',
    category: 'Fruits',
  };
  return producerData;
};

export default async function ProducerPage({ params }: { params: { nom: string } }) {
  const user = await getCurrentUser();
  const data: ProducerData = await getData();

  return (
    <>
      <MainNavBar role={user?.role || 'visitor'} />
      <div className="absolute -z-10 w-full h-[100px]">
        <Image src="/producer-page-bg.png" alt="background image" fill style={{ objectFit: 'cover' }} />
      </div>

      <main className="flex flex-row gap-4 justify-center mx-16 mt-20">
        <aside className="min-w-[200px] max-w-[250px] w-full">
          <ProducerCard data={data} />
        </aside>
        <ProducerTabs data={data} />
      </main>
    </>
  );
}
