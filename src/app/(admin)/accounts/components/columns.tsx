"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Account } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

const roleOptions = [
  { label: "Administrateur", value: "admin" },
  { label: "Producteur", value: "producer" },
  { label: "Client", value: "client" },
  { label: "Visiteur", value: "visitor" },
]

const getLabelOfRole = (value: string) => {
  const option = roleOptions.find((option) => option.value === value)
  return option?.label ?? value
}

export const columns: ColumnDef<Account>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nom" />
    ),
    cell: ({ row }) => <div className="w-[100px]">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "surname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Prénom" />
    ),
    cell: ({ row }) => <div className="w-[90px]">{row.getValue("surname")}</div>,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rôle" />
    ),
    cell: ({ row }) => <div className="w-[100px]">{getLabelOfRole(row.getValue("role"))}</div>,
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Numéro de téléphone" />
    ),
    cell: ({ row }) => <div className="w-[100px]">{row.getValue("phoneNumber")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div className="w-[250px]">{row.getValue("email")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date de création" />
    ),
    cell: ({ row }) => <div className="w-[100px]">{row.getValue("createdAt")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
