'use client'

import React from 'react'
import dynamic from 'next/dynamic';

const ProducersMap = dynamic(() => import("./producers-map"), { ssr: false });

export const ProducersListMap = () => {
  return (
    <>
      <div>ProducersListMap</div>
      <ProducersMap />
    </>
  )
}
