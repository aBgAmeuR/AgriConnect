'use client';

import React from 'react';

import { getCurrentUser } from '@/lib/session';
import { useQuery } from '@tanstack/react-query';
import { Product } from '../data/schema';
import { env } from '@/lib/env';
import { ProductItem } from './products-Items';

const getProducts = async () => {
  const user = await getCurrentUser();
  const data = await fetch(env.NEXT_PUBLIC_API_URL + '/products/p1', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user?.accessToken}`,
    },
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return data;
};

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const products = await getProducts();
      if (Array.isArray(products)) return products;
      throw new Error('Error occurred while fetching products');
    },
  });
}

export const ProductsList = () => {
  const { data, isLoading, isError } = useProducts();

  return (
    <div className="flex flex-row">
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error occurred while fetching products</div>
      ) : (
        <div className="flex flex-row gap-3">{data?.map((product) => <ProductItem key={product.id} product={product} />)}</div>
      )}
    </div>
  );
};
