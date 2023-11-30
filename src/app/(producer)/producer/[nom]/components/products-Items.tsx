import React from 'react';
import { Product } from '../data/schema';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { env } from '@/lib/env';

export const ProductItem = ({ product }: { product: Product }) => {
  const imageUrl = product.image.includes('http') ? product.image : `${env.NEXT_PUBLIC_API_URL}/ressource/image/${product.image}`;
  return (
    <div className="flex flex-col justify-start items-center p-4 bg-white rounded-lg shadow border border-zinc-200 max-w-xs h-[244px]">
      <div className="h-[108px] w-[108px] flex justify-center items-center  relative">
        <div className="w-full h-2/3 overflow-hidden rounded-t-lg">
          <Image src={imageUrl} alt={product.name} fill style={{ objectFit: 'cover' }} />
        </div>
      </div>
      <h3 className="text-left w-full mt-8">{product.name}</h3>
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
