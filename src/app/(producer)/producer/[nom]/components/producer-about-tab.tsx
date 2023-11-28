import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProducerData } from '@/types/producer';
import { Banknote, CreditCard, Landmark, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';

import React from 'react';
import { ProductsList, useProducts } from './products-list';
import ProducerContact from './producer-contact';

export const ProducerAboutTab = ({ data }: { data: ProducerData }) => {
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
  const { data: products, isLoading, isError } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while fetching products</div>;

  return (
    <div>
      <Badge className="mb-4">Producteur</Badge>

      <div className="flex flex-col">
        <h1 className="text-xl font-semibold"> {data.name}</h1>
        <p className="text-sm text-gray-500">{data.desc}</p>

        <div>
          <h2 className="text-lg font-semibold mt-4">Moyens de paiement</h2>
          <div className="flex flex-col items-start">
            <div className="flex flex-col items-center gap-2">
              {renderPaymentIcon(data.payement)}
              <p className="text-sm text-gray-500">{data.payement}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 ">
          <h2 className="text-lg font-semibold mt-4">Boutique</h2>
          <div className="flex flex-row justify-start items-start gap-2.5">
            <div className="flex flex-row items-center gap-2">{/* <ProductsList /> */}</div>
          </div>
          <Button className="max-w-[200px] mx-auto ">Parcourir la boutique</Button>
        </div>

        <h2 className="text-lg font-semibold mt-4">Contact</h2>
        <ProducerContact data={data} />
      </div>
    </div>
  );
};
