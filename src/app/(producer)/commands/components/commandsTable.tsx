'use client'

import React from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { getCurrentUser } from '@/lib/session'
import { useQuery } from '@tanstack/react-query'
import { Order } from '../data/schema'
import { env } from '@/lib/env'

const getOrders = async () => {
  const user = await getCurrentUser()
  const data = await fetch(env.NEXT_PUBLIC_API_URL + '/orders', {
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

function useOrders() {
  return useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: async () => {
      const Orders = await getOrders();
      if (Array.isArray(Orders)) return Orders;
      throw new Error('error occured');
    },
  });
}

export const OrdersTable = () => {
  const { data, isLoading, isError } = useOrders()
  if (isError) return <div>Error</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <DataTable columns={columns} data={data ?? []} />
  )
}
