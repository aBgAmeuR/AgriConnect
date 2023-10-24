'use client';

import React, { useState } from 'react'
import { MyAccountTab } from '@/app/account/my-account-tab';
import { AppearanceTab } from '@/app/account/appearance-tab';

export const TabsAccount = () => {
  const [activeTab, setActiveTab] = useState('my-account')

  return (
    <div className='flex flex-row gap-12 w-full'>
      <div className='flex flex-col gap-1 w-full max-w-[250px] min-w-[150px]'>
        <button
          className={`flex flex-row items-center gap-2 text-sm font-medium py-2 px-4 rounded-md ${activeTab === 'my-account' ? 'bg-secondary text-gray-900 dark:bg-gray-700 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'}`}
          onClick={() => setActiveTab('my-account')}
        >
          Mon compte
        </button>
        {/* <button
          className={`flex flex-row items-center gap-2 text-sm font-medium py-2 px-4 rounded-md ${activeTab === 'appearance' ? 'bg-secondary text-gray-900 dark:bg-gray-700 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'}`}
          onClick={() => setActiveTab('appearance')}
        >
          Apparence
        </button> */}
      </div>
      <div className='w-full'>
        {activeTab === 'my-account' ? <MyAccountTab /> : null}
        {activeTab === 'appearance' ? <AppearanceTab /> : null}
      </div>
    </div >
  )
}
