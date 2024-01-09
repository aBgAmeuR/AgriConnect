'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import z from 'zod';
import { toast } from '@/components/ui/use-toast';
import { EditProductStockForm } from '@/components/forms/edit-product-stock-form';
import { env } from '@/lib/env';
import { getCurrentUser } from '@/lib/session';
import { useQueryClient } from '@tanstack/react-query';

export const EditStockSchema = z.object({
  id: z.string(),
  name: z.string().nonempty({ message: 'Veuillez entrer un nom.' }),
  category: z.string().nonempty({ message: 'Veuillez entrer une catégorie.' }),
  quantity: z.number(),
  price: z.string().nonempty({ message: 'Veuillez entrer un prix.' }),
  unit: z.string().nonempty({ message: 'Veuillez entrer une unité.' }),
});

type Props = {
  isOpenModal: boolean;
  setIsOpenModal: (isOpen: boolean) => void;
  stock: z.infer<typeof EditStockSchema>;
};

const EditStock = ({ isOpenModal, setIsOpenModal, stock }: Props) => {
  const queryClient = useQueryClient();

  async function onSubmit(values: z.infer<typeof EditStockSchema>) {
    try{
    const user = await getCurrentUser();

    const formData = new URLSearchParams();
  
    formData.append('name', values.name);
    formData.append('type', values.category);
    formData.append('price', values.price);
    formData.append('unit', values.unit);
    formData.append('stock', values.quantity.toString());

    const response = await fetch(env.NEXT_PUBLIC_API_URL + '/product/' + stock.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${user?.accessToken}`,
      },
      body: formData.toString(),
    });
      if (!response.ok) {
        throw new Error(`Failed to update product: ${response.statusText}`);
      }
  
      const responseData = await response.json();
      console.log('Product updated:', responseData.data);
  
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-[#ffffff] dark:bg-[#111315]">
        <DialogHeader>
          <DialogTitle>Modifier un produit</DialogTitle>
          <DialogDescription>Modifier un produit à votre liste ici. Cliquez sur modifier lorsque vous avez terminé.</DialogDescription>
        </DialogHeader>
        <EditProductStockForm onSubmit={onSubmit} defaultValues={stock} />
      </DialogContent>
    </Dialog>
  );
};

export default EditStock;