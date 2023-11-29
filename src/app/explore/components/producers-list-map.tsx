'use client'

import React from 'react'
import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import { FormValues, ProducersFilters } from './producers-filters';
import { ProducerCard } from './producer-card';
import { env } from '@/lib/env';
import { Libraries, useJsApiLoader } from '@react-google-maps/api';

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
  console.log(text, location, type, distance);

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

type Librarie = "places";
const libraries: Librarie[] = ["places"];

export const ProducersListMap = () => {
  const [params, setParams] = React.useState<FormValues>({
    text: '',
    location: '',
    type: '',
    distance: '',
  })
  const { data, isLoading, isError } = useProducers(params)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: libraries as Libraries,
  })

  return (
    <>
      <div className="m-4">
        <ProducersFilters params={params} setParams={setParams} isLoaded={isLoaded} />
        <div className='mt-4 flex flex-col gap-4'>
          {isLoading && <div>Chargement...</div>}
          {isError && <div>Une erreur est survenue</div>}
          {data?.length === 0 ? <div>Aucun producteur trouvé</div> : data?.map((producer) => (
            <ProducerCard key={producer.id} {...producer} />
          ))}
        </div>
      </div>
      <ProducersMap isLoaded={isLoaded} />
    </>
  )
}
