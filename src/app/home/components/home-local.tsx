import React from 'react';
import { Button } from '../../../components/ui/button';

// TODO: Fusionner avec ProducerJoin et HomeOnline

export default function LocalProductsCard() {
  return (
    <div className="w-full h-[369px] px-4 pt-[30px] pb-[77px] bg-white bg-opacity-75 flex flex-col justify-center items-center">
      <div className="w-[485px] h-[309px] text-center mb-10">
        <span className="block text-black text-2xl font-bold leading-tight">Je veux acheter des produits locaux !</span>
        <span className="block text-black text-xl font-normal leading-tight mt-2">
          Vous souhaitez découvrir les producteurs en circuit court proches de vous, connaître d’autres spécialités régionales et faire le plein de produits du terroir ? Inscrivez-vous et achetez vos
          produits directement auprès de vos producteurs.
        </span>
      </div>
      <div className="flex justify-center items-center">
        <Button className="items-center">
          <div className="text-neutral-50 text-sm font-medium leading-tight">Commencer</div>
        </Button>
      </div>
    </div>
  );
}
