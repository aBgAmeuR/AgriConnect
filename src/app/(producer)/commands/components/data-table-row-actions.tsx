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

import { OrderSchema } from "../data/schema"
import { getAccessToken } from "@/lib/get-access-token"
import { useQueryClient, useMutation } from "@tanstack/react-query"

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

  // const { mutate: deleteUserMutation } = useMutation({
  //   mutationFn: async (userId: string) => {
  //     await fetch(`${config.API_URL}/user/${userId}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': 'Bearer ' + await getAccessToken()
  //       },
  //     })
  //   },
  //   onError: (error: any) => {
  //     console.log(error)
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({ queryKey: ['users'] });
  //   },
  // });

  return (
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
        {/* {task.role === 'producer' ?
          <DropdownMenuItem>
            Voir le profile
          </DropdownMenuItem> : null}
        <DropdownMenuItem>
          Contacter
        </DropdownMenuItem> */}
        {/* <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Rôle</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.name}>
              {roles.map((role) => (
                <DropdownMenuRadioItem key={role.value} value={role.value}>
                  {role.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub> */}
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem onClick={e => deleteUserMutation(task.id)}>
          Supprimer
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
