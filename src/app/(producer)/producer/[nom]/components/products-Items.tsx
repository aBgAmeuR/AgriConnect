import React from 'react';
import { Product } from '../data/schema';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { env } from '@/lib/env';
import { Card } from '@/components/ui/card';

export const ProductItem = ({ product }: { product: Product }) => {
  const imageUrl = product.image.includes('http') ? product.image : `${env.NEXT_PUBLIC_API_URL}/ressource/image/${product.image}`;
  return (
    <Card className="h-[244px] w-[176px]">
      <div className="h-[150px] w-full flex justify-center items-center  relative">
        <div className="w-full h-2/3 overflow-hidden rounded-t-lg">
          <Image src={imageUrl} alt={product.name} fill style={{ objectFit: 'cover' }} />
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-6">
        <h3 className="text-left w-full text-base ml-3">{product.name}</h3>
        <div className="mx-3 mt-auto flex items-center justify-between   text-gray-500">
          <p>
            {product.price} €/{product.unit}
          </p>
          <Button size={'sm'}>
            <ShoppingCart size={16} />
          </Button>
        </div>
      </div>
    </Card>
  );
};
