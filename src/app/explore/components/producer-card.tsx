import React from 'react'
import { Producer } from './producers-list-map'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export const ProducerCard = (producer: Producer) => {
  return (
    <Card className="flex flex-row justify-between w-full p-6">
      <div className="flex flex-col gap-[10px]">
        <div className='gap-[2px]'>
          <h2 className="text-base">{producer.name}</h2>
          <p className="text-sm text-muted-foreground">{producer.address}</p>
          <Badge variant='secondary' className="text-sm text-primary">{producer.category}</Badge>
        </div>
        <Button variant='default'>En savoir plus</Button>
      </div>
      <div className='h-[108px] w-auto flex justify-between items-center relative'>
        {/* <Image src="https://www.onisep.fr/var/onisep/storage/images/_aliases/dso_grid_8_columns/2/9/5/1/17901592-3-fre-FR/4f575cb60caf-directeur-de-grande-surface.jpg.webp"
          fill={true} alt='Image de la boutique' loading="lazy"
          className="rounded-[8px] overflow-hidden" 
        /> */}
      </div>
    </Card>
  )
}
