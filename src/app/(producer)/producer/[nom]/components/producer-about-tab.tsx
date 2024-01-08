import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProducerData } from '@/types/producer';
import { Banknote, CreditCard, Landmark, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';

import React from 'react';
import { ProductsList } from './products-list';
import ProducerContact from './producer-contact';
type ProducerAboutTabProps = {
  data: ProducerData;
  goToBoutique: () => void;
};

export const ProducerAboutTab = ({ data, goToBoutique }: ProducerAboutTabProps) => {
  const { name, description, paymentMethod } = data;
  const renderPaymentIcon = (paymentMethod: string) => {
    switch (paymentMethod) {
      case 'Carte':
        return <CreditCard width={50} height={50} />;
      case 'Espèces':
        return <Banknote width={50} height={50} />;
      case 'Chèque':
        return <Landmark width={50} height={50} />;
      default:
        return null;
    }
  };
  return (
    <div>
      <Badge className="mb-4">Producteur</Badge>

      <div className="flex flex-col">
        <h1 className="text-xl font-semibold"> {name}</h1>
        <p className="text-sm text-gray-500">{description}</p>

        <div>
          <h2 className="text-lg font-semibold mt-4">Moyens de paiement</h2>
          <div className="flex flex-col items-start">
            <div className="flex flex-col items-center gap-2">
              {renderPaymentIcon(paymentMethod)}
              <p className="text-sm text-gray-500">{paymentMethod}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 ">
          <h2 className="text-lg font-semibold mt-4">Boutique</h2>
          <div className="flex flex-row justify-start items-start gap-2.5">
            <div className="flex flex-row items-center gap-2">
              {/* <ProductsList {...data} /> */}
            </div>
          </div>
          <Button className="max-w-[200px] mx-auto " onClick={goToBoutique}>
            Parcourir la boutique
          </Button>
        </div>

        <h2 className="text-lg font-semibold mt-4">Contact</h2>
        <ProducerContact data={data} />
      </div>
    </div>
  );
};
