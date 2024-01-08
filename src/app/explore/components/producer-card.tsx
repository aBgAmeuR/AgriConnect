import React from 'react'
import Image from 'next/image'
import { Producer } from './producers-list-map'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { env } from '@/lib/env'

type Props = {
  producer: Producer
  selected: Producer | null;
  setSelected: React.Dispatch<React.SetStateAction<Producer | null>>;
}

export const ProducerCard = ({ producer, selected, setSelected }: Props) => {
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    // s'il clique sur le bouton en savoir plus on ne fait rien
    if (event.target instanceof HTMLButtonElement) return
    // s'il clique sur la carte on centre la carte sur le producteur
    setSelected(producer)

  }

  return (
    <Card onClick={handleClick} className={cn("flex flex-row justify-between w-full p-6 cursor-pointer", selected === producer ? 'bg-gray-100' : '')}>
      <div className="flex flex-col gap-[10px]">
        <div className='gap-[2px]'>
          <h2 className="text-base">{producer.name}</h2>
          <p className="text-sm text-muted-foreground">{producer.address}</p>
          <Badge variant='secondary' className="text-sm text-primary">{producer.category}</Badge>
        </div>
        <Link href={`/producer/${producer.name}`}>
          <Button variant='default'>En savoir plus</Button>
        </Link>
      </div>
      <div className='h-[108px] w-[108px] flex justify-center items-center  relative'>
        <div className='absolute w-full h-full overflow-hidden rounded-[8px]'>
          <Image src={producer.image} fill style={{ objectFit: 'cover' }} alt='Image de la boutique' loading="lazy" />
        </div>
      </div>
    </Card>
  )
}
