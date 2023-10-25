'use client'

import React from 'react'
import { ProducerNav } from './producer-nav'
import { ProducerData } from "@/types/producer"
import { ProducerAboutTab } from './producer-about-tab'

type Props = {
  data: ProducerData
}

export const ProducerTabs = ({ data }: Props) => {
  const [nav, setNav] = React.useState('a-propos')

  return (
    <div className="w-full">
      <ProducerNav current={nav} setNav={setNav} />
      {nav == 'a-propos' ? <ProducerAboutTab /> : null}
      {nav == 'boutique' ? <div className="p-6">Boutique</div> : null}
      {nav == 'contact' ? <div className="p-6">Contact</div> : null}
    </div>
  )
}
