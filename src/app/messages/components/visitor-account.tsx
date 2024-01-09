import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { env } from '@/lib/env'
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

export const VisitorAccount = async ({ user }: Props) => {
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

  return (
    <div className='flex flex-col gap-2'>
      {users.map((user: any) => (
        <VisitorAccountComponent key={user.id} user={user} />
      ))}
    </div>
  )
}

const VisitorAccountComponent = ({ user }: { user: any }) => {
  return (
    <div className='flex items-center gap-2 cursor-pointer hover:bg-secondary p-2 rounded-md'>
      <Avatar>
        <AvatarFallback>
          {user.id}
        </AvatarFallback>
      </Avatar>
      <div className='flex flex-col'>
        <p className='font-bold'>{user.id}</p>
        <p className='line-clamp-1'>{user.email}</p>
      </div>
    </div>
  )
}