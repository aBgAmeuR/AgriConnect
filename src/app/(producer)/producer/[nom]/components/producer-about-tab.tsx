import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProducerData } from '@/types/producer';
import { Banknote, CreditCard, Landmark, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';

import React from 'react';

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
          <div className="flex flex-wrap justify-start items-start gap-2.5">
            <div className="flex flex-auto min-w-0 max-w-xs sm:max-w-sm md:w-44 h-[244px] bg-white rounded-lg shadow border border-zinc-200 flex-col justify-start items-center p-4">
              <div className="flex flex-col items-center gap-2">
                <Image src={''} alt={''} />
                <p className="text-sm text-gray-500">Produit 1</p>
              </div>
            </div>
            <div className="flex flex-auto min-w-0 max-w-xs sm:max-w-sm md:w-44 h-[244px] bg-white rounded-lg shadow border border-zinc-200 flex-col justify-start items-center p-4"></div>
            <div className="flex flex-auto min-w-0 max-w-xs sm:max-w-sm md:w-44 h-[244px] bg-white rounded-lg shadow border border-zinc-200 flex-col justify-start items-center p-4"></div>
            <div className="flex flex-auto min-w-0 max-w-xs sm:max-w-sm md:w-44 h-[244px] bg-white rounded-lg shadow border border-zinc-200 flex-col justify-start items-center p-4"></div>
            <div className="flex flex-auto min-w-0 max-w-xs sm:max-w-sm md:w-44 h-[244px] bg-white rounded-lg shadow border border-zinc-200 flex-col justify-start items-center p-4"></div>
          </div>
          <Button className="max-w-[200px] mx-auto ">Parcourir la boutique</Button>
        </div>

        <h2 className="text-lg font-semibold mt-4">Contact</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 bg-white shadow rounded-lg p-4">
            <p className="text-base font-semibold mb-2">{data.name}</p>
            <div className="flex flex-row gap-1 items-center mb-2">
              <MapPin size={16} />
              <p className="text-sm">{data.adress}</p>
            </div>
            <div className="flex flex-row gap-1 items-center mb-2">
              <Phone size={16} />
              <p className="text-sm">{data.phoneNumber}</p>
            </div>
            <Button className="mt-24 bg-white text-green-500 hover:text-white">Envoyer un message</Button>
          </div>
          <div className="flex-1">
            <iframe
              width="100%"
              height="250"
              style={{ border: 0 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2671.01693532427!2d0.23172727596657253!3d47.974731162484794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e28e9168064bf9%3A0x5fe449cebb942c60!2s123%20Rue%20de%20Lille%2C%2072100%20Le%20Mans!5e0!3m2!1sfr!2sfr!4v1700735855715!5m2!1sfr!2sfr"
              allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};
