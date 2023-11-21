import React from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { config } from '@/config/config'
import { getCurrentUser } from '@/lib/session'

const getUser = async () => {
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

export const AccountsTable = async () => {
  const data = await getUser();

  return (
    <DataTable columns={columns} data={data} />
  )
}
