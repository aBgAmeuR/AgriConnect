"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { StockSchema } from "../data/schema"
import { getAccessToken } from "@/lib/get-access-token"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { DataTableCommandeInfoDialog } from "../../commands/components/modal/data-table-dialog"
import EditStock, { EditStockSchema } from "./modal/edit-stock"
import { useState } from "react"
import { z } from "zod"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const stock = StockSchema.parse(row.original)
  const [isOpenModal, setIsOpenModal] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onSelect={() => setIsOpenModal(true)}>
            Modifier
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditStock isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} stock={stock} />
    </>
  )
}