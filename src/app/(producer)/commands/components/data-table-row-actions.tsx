'use client'

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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { OrderSchema } from "../data/schema"
import { getAccessToken } from "@/lib/get-access-token"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { env } from "@/lib/env"
import React, { useState } from "react"

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
  const task = OrderSchema.parse(row.original)
  const queryClient = useQueryClient();
  const [isOpenModal, setIsOpenModal] = useState(false)


  const updateOrder = async (statut: string) => {
    const accessToken = await getAccessToken()
    const data = await fetch(env.NEXT_PUBLIC_API_URL + '/order/' + task.numero, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({

        statut: statut,
      })
    }).then(res => res.json())
      .then(res => res.data)
      .catch(err => console.log(err))
      window.location.reload();
  }

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
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem onClick={() => setIsOpenModal(true)}>
            Voir commande
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              Statut
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={task.statut} onValueChange={updateOrder}>
                <DropdownMenuRadioItem value="Livrée">Livrée</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Prête">Prête</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="En cours">En cours</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Annulé">Annulé</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Facture
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
    </>
  )
}
