import { Card, CardHeader } from '@/components/ui/card';
import React from 'react'
import { Product } from '../data/schema';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from "@/components/ui/scroll-area";

type CartItem = {
  product: Product;
  quantity: number;
}

type Props = {
  cartItems: CartItem[];
  setCart: (cart: CartItem[]) => void;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
}

export const ShopCart = ({ cartItems, setCart }: Props) => {
  const modifyQuantity = (product: Product, quantity: number) => {
    if (quantity > parseInt(product.stock)) return;
    if (quantity < 1) {
      const newCart = cartItems.filter((item) => item.product.id !== product.id);
      setCart(newCart);
    } else {
      const newCart = cartItems.map((item) => {
        if (item.product.id === product.id) {
          return {
            ...item,
            quantity,
          }
        }
        return item;
      });
      setCart(newCart);
    }
  }
  return (
    <Card className='my-4 h-min sticky top-12 overflow-hidden min-w-[250px] max-w-[300px] w-full'>
      <div className='bg-primary px-4 py-2'>
        <h2 className='text-lg font-semibold text-secondary'>Mon panier</h2>
      </div>
      <ScrollArea className='px-4 py-4 flex flex-col max-h-[350px]'>
        {cartItems.map((item) => (
          <>
            <div className='py-2'>
              <div className='flex items-center justify-between'>
                <p>{item.product.name}</p>
                <p className='font-semibold'>{formatPrice(item.product.price)}/{item.product.unit}</p>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Button size={'icon'} variant={'outline'} onClick={() => modifyQuantity(item.product, item.quantity - 1)}>
                    <Minus size={16} />
                  </Button>
                  <p>{item.quantity}</p>
                  <Button size={'icon'} variant={'outline'} onClick={() => modifyQuantity(item.product, item.quantity + 1)}>
                    <Plus size={16} />
                  </Button>
                </div>
                <div>
                  <p className='text-right'>{formatPrice(item.product.price * item.quantity)}</p>
                </div>
              </div>
            </div>
            <Separator />
          </>
        ))}

      </ScrollArea>
      <div className='flex flex-col px-4 pb-4 gap-3'>
        <div className='flex items-center justify-between'>
          <p>Prix total (TTC)</p>
          <p className='font-semibold'>{formatPrice(cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0))}</p>
        </div>
        <Button variant='default'>
          Commander
        </Button>
      </div>
    </Card>
  )
}
