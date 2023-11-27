'use client';

import React from 'react';

import { config } from '@/config/config';
import { getCurrentUser } from '@/lib/session';
import { useQuery } from '@tanstack/react-query';
import { Product } from '../data/schema';

const getProducts = async () => {
  const user = await getCurrentUser();
  const data = await fetch(`${process.env.API_URL}/products/p1`, {
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

function useProducts() {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const products = await getProducts();
      if (Array.isArray(products)) return products;
      throw new Error('Error occurred while fetching products');
    },
  });
}

export const ProductsTable = () => {
  const { data, isLoading, isError } = useProducts();

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error occurred while fetching products</div>
      ) : (
        <ul>
          {data?.map((product) => (
            <li key={product.id}>
              {product.name} - {product.price} {product.unit} - {product.image}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
