import React from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { data } from '../data'

export const AccountsTable = () => {
  return (
    <DataTable columns={columns} data={data} />
  )
}
