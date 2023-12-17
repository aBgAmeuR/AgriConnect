'use client';

import { EditShopForm } from '@/components/forms/edit-shop-forms';
import { env } from '@/lib/env';
import { getCurrentUser } from '@/lib/session';
import { ProducerData } from '@/types/producer';
import { useQuery } from '@tanstack/react-query';

const getupdateProducer = async () => {
  const user = await getCurrentUser();
  const data = await fetch(env.NEXT_PUBLIC_API_URL + '/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user?.accessToken}`,
    },
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((err) => console.log(err));
  console.log('probleme', data);
  return data;
};

function useProducer() {
  return useQuery<ProducerData>({
    queryKey: ['producer'],
    queryFn: async () => await getupdateProducer(),
  });
}
type Props = {
  id: string;
};

export const EditProducer = ({ id }: Props) => {
  const { data, isLoading, isError } = useProducer();
  if (isError) return <div>Error</div>;
  if (isLoading || data === undefined) return <div>Loading...</div>;

  return (
    <>
      <h2 className="text-lg font-medium">Mon compte</h2>
      <p className="text-muted-foreground text-sm font-normal">C'est ainsi que les autres utilisateurs vous verront sur le site.</p>
      <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700" />
      <EditShopForm data={data} />
    </>
  );
};
