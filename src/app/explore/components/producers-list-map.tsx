'use client'

import React from 'react'
import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import { FormValues, ProducersFilters } from './producers-filters';
import { ProducerCard } from './producer-card';
import { env } from '@/lib/env';

const ProducersMap = dynamic(() => import("./producers-map"), { ssr: false });

export type Producer = {
  id: string
  name: string
  description: string
  address: string
  category: string
  paymentMethod: string
  latitude: number
  longitude: number
  phone: number
  createdAt: string
}

const getProducers = async ({ text, location, type, distance }: FormValues) => {
  const data = await fetch(env.NEXT_PUBLIC_API_URL + `/producer/search?text=${text}&location=${location}&type=${type}&distance=${distance}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => res.json())
    .then(res => res.data)
    .catch(err => console.log(err))

  return data
}

function useProducers({ text, location, type, distance }: FormValues) {
  return useQuery<Producer[]>({
    queryKey: ['SearchProducers'],
    queryFn: async () => {
      const producers = await getProducers({ text, location, type, distance });
      if (Array.isArray(producers)) return producers;
      throw new Error('error occured');
    },
  });
}

export const ProducersListMap = () => {
  const [params, setParams] = React.useState<FormValues>({
    text: '',
    location: '',
    type: '',
    distance: '',
  })
  const { data, isLoading, isError } = useProducers(params)

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>Error occured</div>

  return (
    <>
      <div className="m-4">
        <ProducersFilters params={params} setParams={setParams} />
        <div className='mt-4 flex flex-col gap-4'>
          {data?.map((producer) => (
            <ProducerCard key={producer.id} {...producer} />
          ))}
        </div>
      </div>
      <ProducersMap />
    </>
  )
}
