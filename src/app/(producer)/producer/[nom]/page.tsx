import Image from 'next/image';
import { getCurrentUser } from '@/lib/session';
import { ProducerData } from '@/types/producer';
import MainNavBar from '@/components/main-navbar';
import { ProducerCard } from './components/producer-card';
import { ProducerTabs } from './components/producer-tabs';
import { Button } from '@/components/ui/button';
import { env } from '@/lib/env';

const getData = async (nom: string) => {
  const producerData = await fetch(env.API_URL + '/producer?name=' + nom, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => res.data[0])
    .catch((err) => console.log(err));

  return producerData;
};

export default async function ProducerPage({ params }: { params: { nom: string } }) {
  const user = await getCurrentUser();
  const data: ProducerData = await getData(params.nom);
  if (!data) {
    return 404;
  }

  return (
    <>
      <MainNavBar role={user?.role || 'visitor'} />

      <div className="absolute -z-10 w-full h-[100px]">
        <Image src="/producer-page-bg.png" alt="background image" fill style={{ objectFit: 'cover' }} />
      </div>
      <main className="flex flex-row gap-4 justify-center mx-16 mt-20">
        <aside className="min-w-[200px] max-w-[250px] w-full">
          <ProducerCard {...data} />
        </aside>
        <ProducerTabs data={data} />
      </main>
    </>
  );
}
