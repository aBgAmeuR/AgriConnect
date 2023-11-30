import React from 'react'
import Image from 'next/image'
import { Producer } from './producers-list-map'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const ProducerCard = (producer: Producer) => {
  return (
    <Card className="flex flex-row justify-between w-full p-6 cursor-pointer">
      <div className="flex flex-col gap-[10px]">
        <div className='gap-[2px]'>
          <h2 className="text-base">{producer.name}</h2>
          <p className="text-sm text-muted-foreground">{producer.address}</p>
          <Badge variant='secondary' className="text-sm text-primary">{producer.category}</Badge>
        </div>
        <div><Button variant='default'>En savoir plus</Button></div>
      </div>
      <div className='h-[108px] w-[108px] flex justify-center items-center  relative'>
        <div className='absolute w-full h-full overflow-hidden rounded-[8px]'>
          <Image src={producer.image} fill style={{ objectFit: 'cover' }} alt='Image de la boutique' loading="lazy" />
        </div>
      </div>
    </Card>
  )
}
