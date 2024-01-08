'use client';

import React from 'react';
import { getCurrentUser } from '@/lib/session';
import { useQuery } from '@tanstack/react-query';
import { Product } from '../data/schema';
import { env } from '@/lib/env';
import { ProductItem } from './products-Items';
import { ShopCart } from './shop-cart';

function useProducts(id: string) {
  return useQuery<Product[]>({
    queryKey: ['products', id],
    queryFn: async () => {
      const user = await getCurrentUser();
      const products = await fetch(env.NEXT_PUBLIC_API_URL + '/producer/' + id + '/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((res) => res.data)
        .catch((err) => console.log(err));

      return products;
    },
  });
}

const formatData = (data: Product[]) => {
  return data.reduce((acc, item) => {
    const { type } = item;
    if (!acc[type]) acc[type] = [];
    acc[type].push(item);
    return acc;
  }, {} as Record<string, Product[]>);
}

type CartItem = {
  product: Product;
  quantity: number;
}

export const ProductsList = ({ id }: { id: string }) => {
  const { data, isLoading, isError } = useProducts(id);
  const [cart, setCart] = React.useState<CartItem[]>([]);

  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p>Une erreur est survenue</p>;
  const groupedData = formatData(data || []);

  const isAdded = (product: Product) => {
    return cart.some((item) => item.product.id === product.id);
  }

  const addToCart = (product: Product) => {
    setCart([...cart, { product, quantity: 1 }]);
  }

  const removeFromCart = (product: Product) => {
    const newCart = cart.filter((item) => item.product.id !== product.id);
    setCart(newCart);
  }

  return (
    <div className='flex gap-4 justify-between'>
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold mt-4">Boutique</h1>
        {Object.entries(groupedData || {}).map(([key, value]) => (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold mt-2">{key}</h2>
            <div className="flex flex-row flex-wrap justify-start items-start gap-2.5">
              {value.map((product) => (
                <ProductItem product={product} isAdded={isAdded(product)} addToCart={() => addToCart(product)} removeFromCart={() => removeFromCart(product)} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <ShopCart cartItems={cart} setCart={setCart} />
    </div>
  );
};
