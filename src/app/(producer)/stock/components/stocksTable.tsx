'use client'

import React from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { getCurrentUser } from '@/lib/session'
import { useQuery } from '@tanstack/react-query'
import { Stock } from '../data/schema'
import { env } from '@/lib/env'

const getProducts = async () => {
  const user = await getCurrentUser()
  const data = await fetch(env.NEXT_PUBLIC_API_URL + '/stocks', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user?.accessToken}`
    }
  }).then(res => res.json())
    .then(res => res.data)
    .catch(err => console.log(err))
  
  return data
}

function useStocks() {
  return useQuery<Stock[]>({
    queryKey: ['stocks'],
    queryFn: async () => {
      const products = await getProducts();
      if (Array.isArray(products)) return products;
      throw new Error('error occured');
    },
  });
}

export const StocksTable = () => {
  const { data, isLoading, isError } = useStocks()

  if (isError) return <div>Error</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <DataTable columns={columns} data={data ?? []} />
  )
}
