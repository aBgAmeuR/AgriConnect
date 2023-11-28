import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProducerData } from '@/types/producer';
import { MapPin, Phone } from 'lucide-react';
import React from 'react';

type Props = {
  name: string;
  address: string;
  phoneNumber: string;
};

export const ProducerCard = (data: Props) => {
  console.log('fbfdbd', data.name);
  return (
    <Card className="flex flex-col divide-y gap-4 w-full">
      <div className="px-6 pt-6 flex flex-col gap-3 items-center justify-center h-fit">
        <Avatar>
          <AvatarImage src="https://github.com/abgameur.png" />
          {/* <AvatarFallback>{data.name.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '')}</AvatarFallback> */}
        </Avatar>
        <p className="text-base text-center">{data.name}</p>
      </div>
      <div className="px-6 pb-6 pt-4 flex flex-col gap-3 h-fit">
        <div className="flex flex-row gap-1 items-center">
          <MapPin size={16} />
          <p className="text-sm text-muted-foreground">{data.address}</p>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <Phone size={16} />
          <p className="text-sm text-muted-foreground">{data.phoneNumber}</p>
        </div>
        <Button className="w-full">Contacter</Button>
      </div>
    </Card>
  );
};
