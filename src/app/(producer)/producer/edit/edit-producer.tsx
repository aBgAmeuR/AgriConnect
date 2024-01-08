'use client';

import { EditShopForm } from '@/components/forms/edit-shop-forms';
import { env } from '@/lib/env';
import { getCurrentUser } from '@/lib/session';
import { ProducerData } from '@/types/producer';

import { useQuery } from '@tanstack/react-query';

function useProducer(id: string) {
  return useQuery<ProducerData>({
    queryKey: [id],
    queryFn: async () => {
      const user = await getCurrentUser();
      const data = await fetch(env.NEXT_PUBLIC_API_URL + '/producer/user/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((res) => res.data[0])
        .catch((err) => {
          console.log(err);
          throw err;
        });

      return data;
    },
  });
}
type Props = {
  id: string;
};

export const EditProducer = ({ id }: Props) => {
  const { data, isLoading, isError } = useProducer(id);
  if (isError) return <div>Error</div>;
  if (isLoading) return <div>Loading...</div>;
  console.log(data, 'test');

  return (
    <>
      <h2 className="text-lg font-medium">Ma Boutique</h2>
      <p className="text-muted-foreground text-sm font-normal">C'est ainsi que les autres utilisateurs vous verront sur le site.</p>
      <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700" />

      <EditShopForm data={data} />
    </>
  );
};
