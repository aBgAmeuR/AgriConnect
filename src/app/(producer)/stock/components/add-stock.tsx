'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import z from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { AddProductStockForm } from '@/components/forms/add-product-stock-form';
import { env } from '@/lib/env';
import { getCurrentUser } from '@/lib/session';

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const AddStockSchema = z.object({
  name: z.string().nonempty({ message: 'Veuillez entrer un nom.' }),
  description: z.string().nonempty({ message: 'Veuillez entrer une description.' }),
  category: z.string().nonempty({ message: 'Veuillez entrer une catégorie.' }),
  quantity: z.string().nonempty({ message: 'Veuillez entrer une quantité.' }),
  price: z.string().nonempty({ message: 'Veuillez entrer un prix.' }),
  unit: z.string().nonempty({ message: 'Veuillez entrer une unité.' }),
  image: z.any(),
  // image: z
  //   .any()
  //   .refine((file) => file?.size <= MAX_FILE_SIZE, `L'image doit être inférieure à 5 Mo.`)
  //   .refine(
    //     (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
  //     "L'image doit être au format JPEG, JPG ou PNG."
  //   )
});

const AddStock = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  
  async function onSubmit(values: z.infer<typeof AddStockSchema>) {
    const user = await getCurrentUser();
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('type', values.category);
    formData.append('price', values.price);
    formData.append('unit', values.unit);
    formData.append('stock', values.quantity);
    formData.append('image', values.image);
    
    const response = await fetch(env.NEXT_PUBLIC_API_URL + '/product', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      body: formData,
    });
    
    const data = await response.json();

    console.log(data);

    // if (!response?.ok) {
    //   toast({
    //     title: 'Error',
    //     description: (
    //       <div>
    //         <p>Something went wrong. Please try again.</p>
    //       </div>
    //     ),
    //   });
    // } else {
    //   setOpen(false);
    //   router.refresh();
    // }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="ml-auto hidden h-8 lg:flex">
          Ajouter un produit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-[#ffffff] dark:bg-[#111315]">
        <DialogHeader>
          <DialogTitle>Ajouter un produit</DialogTitle>
          <DialogDescription>Ajouter un produit à votre liste ici. Cliquez sur ajouter lorsque vous avez terminé.</DialogDescription>
        </DialogHeader>
        <AddProductStockForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddStock;