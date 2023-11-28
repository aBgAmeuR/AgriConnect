import React from 'react';
import { Product } from '../data/schema';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { env } from '@/lib/env';

const imageUrl = env.NEXT_PUBLIC_API_URL + '/tomate.jpg';

export const ProductItem = ({ product }: { product: Product }) => {
  return (
    <div className="flex flex-col justify-start items-center p-4 bg-white rounded-lg shadow border border-zinc-200 max-w-xs h-[244px]">
      <div className="w-full h-2/3 overflow-hidden rounded-t-lg">{/* <image src={imageUrl} alt={product.name} layout="fill" objectFit="cover" /> */}</div>
      <h3 className="text-left w-full">{product.name}</h3> {/* Classe text-left pour aligner à gauche */}
      <div className="mt-auto flex items-center gap-1 text-gray-500">
        <p>
          {product.price} €/{product.unit}
        </p>
        <Button className="max-w-full mx-auto">
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};
