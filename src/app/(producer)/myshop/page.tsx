import Page401 from '@/components/page-401';
import { env } from '@/lib/env';
import { getCurrentUser } from '@/lib/session';
import { ProducerData } from '@/types/producer';
import { redirect } from 'next/navigation';

export default async function MyShopPage() {
  const user = await getCurrentUser();

  if (user?.role !== 'producer') {
    return <Page401 />;
  }
  const data = await fetch(env.NEXT_PUBLIC_API_URL + '/producer/user/' + user.id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user?.accessToken}`,
    },
  });

  const json = await data.json();
  const userData = json.data[0];

  redirect(`/producer/${userData.name}`);
}
