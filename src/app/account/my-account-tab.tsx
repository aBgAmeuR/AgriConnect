import { AccountParamsForm } from '@/components/forms/account-params-form'
import React from 'react'

const data = {
  name: 'Doe',
  surname: 'John',
  email: 'johndoe@gmail.com',
  phoneNumber: '0606060606',
}

export const MyAccountTab = () => {
  return (
    <>
      <h2 className='text-lg font-medium'>Mon compte</h2>
      <p className='text-muted-foreground text-sm font-normal'>C'est ainsi que les autres vous verront sur le site.</p>
      <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700" />
      <AccountParamsForm data={data} />
    </>
  )
}
