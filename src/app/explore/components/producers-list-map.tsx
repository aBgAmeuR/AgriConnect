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
  const data = await fetch(env.NEXT_PUBLIC_API_URL + '/producer/search?text=&location=&type=&distance=', {
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
    queryKey: ['users'],
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
  // const { data, isLoading, isError } = useProducers(params)

  const azerty = {
    id: "p7",
    name: "MielsMich",
    description: "Producteur de miel",
    paymentMethod: "Espèces",
    address: "404 rue de Nantes",
    phone: 567891239,
    latitude: 47.218371,
    longitude: -1.553621,
    category: "Miels",
    createdAt: "2023-01-21"
  }

  return (
    <>
      <div className="m-4">
        <ProducersFilters params={params} setParams={setParams} />
        <ProducerCard {...azerty} />
      </div>
      <ProducersMap />
    </>
  )
}
