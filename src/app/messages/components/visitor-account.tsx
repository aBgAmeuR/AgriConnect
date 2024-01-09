import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { env } from '@/lib/env'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'

type Props = {
  user: any
}

type User = {
  id: string
  name: string
  surname: string
  email: string
  phoneNumber: string
  role: string
  createdAt: string
}

const getUsers = async ({ user }: { user: any }) => {
  const data = await fetch(env.NEXT_PUBLIC_API_URL + '/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user?.accessToken}`
    }
  })
  const json = await data.json();
  let users: User[] = json.data

  users = users.filter((user: User) => user.role === 'visitor')

  return users
}

export const VisitorAccount = ({ user }: Props) => {
  const { data: users, isError, isLoading } = useQuery({
    queryKey: ['users', user],
    queryFn: async () => await getUsers({ user }),
  })
  const queryClient = useQueryClient()

  if (isLoading || isError || !users) {
    return <div>Chargement...</div>
  }

  const acceptUser = async (id: string) => {
    const formData = new FormData()
    formData.append('id', id)
    await fetch(env.NEXT_PUBLIC_API_URL + '/user/accept', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.accessToken}`
      },
      body: formData
    })
    await queryClient.invalidateQueries({ queryKey: ['users', user] })
  }

  const refuseUser = async (id: string) => {
    const formData = new FormData()
    formData.append('id', id)
    await fetch(env.NEXT_PUBLIC_API_URL + '/user/refuse', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.accessToken}`
      },
      body: formData
    })
    await queryClient.invalidateQueries({ queryKey: ['users', user] })
  }

  return (
    <div className='flex flex-col gap-2'>
      {users.map((user: any) => (
        <VisitorAccountComponent key={user.id} user={user} acceptUser={acceptUser} refuseUser={refuseUser} />
      ))}
    </div>
  )
}
type VisitorAccountProps = {
  user: User
  acceptUser: (id: string) => void
  refuseUser: (id: string) => void
}

const VisitorAccountComponent = ({ user, acceptUser, refuseUser }: VisitorAccountProps) => {
  return (
    <div className='flex items-center gap-2 cursor-pointer hover:bg-secondary p-2 rounded-md'>
      <Avatar>
        <AvatarFallback>
          {user.name.charAt(0)}{user.surname.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className='flex flex-col gap-1'>
        <p className='font-bold'>{user.name} {user.surname}</p>
        <div className='flex gap-2'>
          <Button size={'sm'} onClick={() => acceptUser(user.id)}>Accepter</Button>
          <Button size={'sm'} variant={'destructive'} onClick={() => refuseUser(user.id)}>Refuser</Button>
        </div>
      </div>
    </div>
  )
}