'use producteur';

import React from 'react';
// import { DataTable } from './data-table';
//import { columns } from './product-columns'; // Assurez-vous que les colonnes correspondent à celles des produits
import { config } from '@/config/config';
import { getCurrentUser } from '@/lib/session';
import { useQuery } from '@tanstack/react-query';
import { Product } from '../data/schema'; // Remplacez par votre type de produit

const getProducts = async () => {
  const user = await getCurrentUser();
  const data = await fetch(`${config.API_URL}/products/p1`, {
    // Modifiez l'URL pour pointer vers l'API des produits
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
    queryKey: ['products'], // Changez la clé de requête en 'products'
    queryFn: async () => {
      const products = await getProducts();
      if (Array.isArray(products)) return products;
      throw new Error('Error occurred while fetching products');
    },
  });
}

export const ProductsTable = () => {
  const { data, isLoading, isError } = useProducts(); // Utilisez le hook useProducts

  if (isError) return <div>Error fetching products</div>;
  if (isLoading) return <div>Loading products...</div>;

  // return <DataTable columns={columns} data={data ?? []} />;
};
