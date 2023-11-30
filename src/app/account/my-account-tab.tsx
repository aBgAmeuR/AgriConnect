import { AccountParamsForm } from '@/components/forms/account-params-form';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/lib/session';
import { env } from '@/lib/env';
import React from 'react';

interface User {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
}

const getUser = async () => {
  const user = await getCurrentUser();
  const data = await fetch(env.NEXT_PUBLIC_API_URL + '/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user?.accessToken}`,
    },
  })
    .then(res => res.json())
    .then(res => res.data)
    .catch(err => console.log(err));

  return data;
}

export const MyAccountTab = () => {
  const { data, isLoading, isError } = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => await getUser()
  });

  if (isError) return <div>Error</div>;
  if (isLoading || data === undefined) return <div>Loading...</div>;

  return (
    <>
      <h2 className='text-lg font-medium'>Mon compte</h2>
      <p className='text-muted-foreground text-sm font-normal'>
        C'est ainsi que les autres utilisateurs vous verront sur le site.
      </p>
      <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700" />
      <AccountParamsForm data={data} />
    </>
  );
};
