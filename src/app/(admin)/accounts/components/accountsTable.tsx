'use client'

import React from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { config } from '@/config/config'
import { getCurrentUser } from '@/lib/session'
import { useQuery } from '@tanstack/react-query'
import { Account } from '../data/schema'

const getUsers = async () => {
  const user = await getCurrentUser()
  const data = await fetch(config.API_URL + '/users', {
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

function useUsers() {
  return useQuery<Account[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const users = await getUsers();
      if (Array.isArray(users)) return users;
      throw new Error('error occured');
    },
  });
}

export const AccountsTable = () => {
  const { data, isLoading, isError } = useUsers()
  
  if (isError) return <div>Error</div>
  if (isLoading) return <div>Loading...</div>
  
  return (
    <DataTable columns={columns} data={data ?? []} />
  )
}
