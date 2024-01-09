'use client'

import React from 'react'
import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import { FormValues, ProducersFilters } from './producers-filters';
import { ProducerCard } from './producer-card';
import { env } from '@/lib/env';
import { Skeleton } from "@/components/ui/skeleton"
import { Libraries, useJsApiLoader } from '@react-google-maps/api';
import { ProduceurSchema, ProduceursSchema } from './schema';
import { z } from 'zod';

const ProducersMap = dynamic(() => import("./producers-map"), { ssr: false });

export type Producer = z.infer<typeof ProduceurSchema>;

const getProducers = async ({ text, location, type, distance }: FormValues = { text: '', location: '', type: '', distance: '' }) => {

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

  const { data, isLoading, isError } = useQuery<Producer[]>({
    queryKey: ['SearchProducers', params],
    queryFn: async ({ queryKey }) => {
      const [_key, params] = queryKey as [string, FormValues];

      const { text, location, type, distance } = params;

      const response = await fetch(env.NEXT_PUBLIC_API_URL + `/producer/search?name=${text}&location=${location}&type=${type}&distance=${distance}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const json = await response.json();
      let produceurs: Producer[] = [];
      try {
        produceurs = ProduceursSchema.parse(json.data)
      } catch (error) {
        console.log(error)
      }
      return produceurs
    }
  });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: libraries as Libraries,
  })
  const [selected, setSelected] = React.useState<Producer | null>(null)

  React.useEffect(() => {
    setSelected(null)
  }, [data])

  return (
    <>
      <div className="m-4 h-[calc(100vh-100px)]">
        <ProducersFilters params={params} setParams={setParams} isLoaded={isLoaded} />
        <div className='mt-4 flex flex-col h-[calc(100%-100px)] gap-4 overflow-y-scroll pr-2' id="customScrollBar1">
          {isLoading && <>
            <Skeleton className="w-full h-[156px] rounded-xl" />
            <Skeleton className="w-full h-[156px] rounded-xl" />
          </>}
          {isError && <div>Une erreur est survenue</div>}
          {data?.length === 0 ? <div>Aucun producteur trouvé</div> : data?.map((producer) => (
            <ProducerCard key={producer.id} producer={producer} selected={selected} setSelected={setSelected} />
          ))}
        </div>
      </div>
      <ProducersMap isLoaded={isLoaded} data={data || []} selected={selected} setSelected={setSelected} />
    </>
  )
}
