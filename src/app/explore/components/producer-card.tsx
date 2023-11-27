import React from 'react'
import { Producer } from './producers-list-map'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const ProducerCard = (producer: Producer) => {

  return (
    <Card className="flex flex-row justify-between w-full p-6">
      <div className="flex flex-col gap-[14px]">
        <div className='gap-[2px]'>
          <h2 className="text-base">{producer.name}</h2>
          <p className="text-sm">{producer.address}</p>
          <Badge variant='secondary' className="text-sm">{producer.category}</Badge>
        </div>
      </div>
      <div className="px-6 pb-6 pt-4 flex flex-col gap-3 h-fit">

      </div>
    </Card>
  )
}
