'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Minus, Plus } from 'lucide-react'
import React from 'react'
import { Product } from '../(producer)/producer/[nom]/data/schema'
import { env } from '@/lib/env'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

type CartItem = {
  product: Product;
  quantity: number;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
}

const getShopNameById = async (id: string) => {
  const data = await fetch(env.NEXT_PUBLIC_API_URL + '/producer/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return data[0].name
}

type Props = {
  idUser: string;
  tokenUser: string;
}

export const CartCheckout = ({ idUser, tokenUser }: Props) => {
  const cartItems: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  const [shopName, setShopName] = React.useState('');
  const [date, setDate] = React.useState('');
  const router = useRouter();

  React.useEffect(() => {
    const getShopName = async () => {
      const id = localStorage.getItem('cartShopId') || '';
      const name = await getShopNameById(id);
      setShopName(name);
    }

    getShopName();

  }, []);

  const onSubmit = async () => {
    if (date === '') return;

    const formData = new FormData();
    const idProducts = cartItems.map((item) => item.product.id).join(', ');

    formData.append('date', date);
    formData.append('listProducts', idProducts);
    formData.append('id_producer', cartItems[0].product.id_producter);
    formData.append('id_user', idUser);
    formData.append('status', 'En cours');
    formData.append('payement', 'Carte');

    console.log(formData.get('listProducts'));
    

    const res = await fetch(env.NEXT_PUBLIC_API_URL + '/order', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenUser}`
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => res.data)
      .catch((err) => console.log(err));

    if (res) {
      localStorage.clear();
      localStorage.setItem('cart', JSON.stringify(cartItems));
      localStorage.setItem('cartShopId', cartItems[0].product.id_producter);
      router.push('/');
    }
  }

  return (
    <Card className='my-4 h-min sticky top-12 overflow-hidden min-w-[250px] max-w-[300px] w-full'>
      <div className='bg-primary px-4 py-2'>
        <h2 className='text-lg font-semibold text-secondary'>{shopName}</h2>
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
                  <p>x{item.quantity}</p>
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
        <Separator />
        <div className='flex items-center justify-between'>
          <p>Date de retrait</p>
          <Input type="date" className='w-[150px]' onChange={(e) => setDate(e.target.value)} />
        </div>
        <Button variant='default' onClick={onSubmit}>
          Commander
        </Button>
      </div>
    </Card>
  )
}
