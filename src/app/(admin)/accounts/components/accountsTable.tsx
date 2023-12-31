'use client'

import React from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { getCurrentUser } from '@/lib/session'
import { useQuery } from '@tanstack/react-query'
import { Account } from '../data/schema'
import { env } from '@/lib/env'
import { AccountSchema } from '../data/schema'

const AccountsSchema = AccountSchema.array()

const getUsers = async () => {
  const user = await getCurrentUser()
  const data = await fetch(env.NEXT_PUBLIC_API_URL + '/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user?.accessToken}`
    }
  }).then(res => res.json())
    .then(res => res.data)
    .catch(err => console.log(err))

  return AccountsSchema.parse(data)
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
