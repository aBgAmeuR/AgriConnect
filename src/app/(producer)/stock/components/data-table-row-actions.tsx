"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { StockSchema } from "../data/schema"
import { getAccessToken } from "@/lib/get-access-token"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { DataTableCommandeInfoDialog } from "../../commands/components/modal/data-table-dialog"
import EditStock from "./modal/edit-stock"
import { useState } from "react"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

const roles = [
  { value: 'Visiteur', label: 'Visiteur' },
  { value: 'Client', label: 'Client' },
  { value: 'Producteur', label: 'Producteur' },
  { value: 'Admin', label: 'Administrateur' },
]

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = StockSchema.parse(row.original)
  const queryClient = useQueryClient();
  const [isOpenModal, setIsOpenModal] = useState(false); // Ajout d'un nouvel état pour contrôler l'ouverture de DataTableCommandeInfoDialog
  const [isEditStockOpen, setIsEditStockOpen] = useState(false); // Ajout d'un nouvel état pour contrôler l'ouverture de EditStock

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
          <DropdownMenuItem onSelect={() => setIsEditStockOpen(true)}>
            Edit Stock
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DataTableCommandeInfoDialog isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} orderId={task.id} />
      {isEditStockOpen && <EditStock />}
    </>
  )
}