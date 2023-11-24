import React from 'react';
import { Button } from '@/components/ui/button';

// TODO: Fusionner avec ProducerJoin et HomeLocal

export function SellProductsCard() {
  return (
    <div className=" w-full h-[369px] px-4 pt-[30px] pb-[77px] bg-white bg-opacity-75 flex flex-col justify-center items-center">
      <div className="w-[485px] h-[226px] text-center mb-4">
        <span className="block text-black text-2xl font-bold leading-tight">Je veux vendre mes produits en ligne</span>
        <span className="block text-black text-xl font-normal leading-tight mt-2">
          Groupama met à votre disposition un outil simple et des offres adaptées pour vendre vos produits en circuit court et en ligne.
        </span>
      </div>
      <div className="flex justify-center items-center">
        <Button className="items-center">
          <div className="text-neutral-50 text-sm font-medium leading-tight">Créer un compte producteur</div>
        </Button>
      </div>
    </div>
  );
}
