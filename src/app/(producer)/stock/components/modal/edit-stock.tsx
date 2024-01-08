'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import z from 'zod';
import { toast } from '@/components/ui/use-toast';
import { AddProductStockForm } from '@/components/forms/add-product-stock-form';
import { env } from '@/lib/env';
import { getCurrentUser } from '@/lib/session';
import { useQueryClient } from '@tanstack/react-query';
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const AddStockSchema = z.object({
  name: z.string().nonempty({ message: 'Veuillez entrer un nom.' }),
  description: z.string().nonempty({ message: 'Veuillez entrer une description.' }),
  category: z.string().nonempty({ message: 'Veuillez entrer une catégorie.' }),
  quantity: z.string().nonempty({ message: 'Veuillez entrer une quantité.' }),
  price: z.string().nonempty({ message: 'Veuillez entrer un prix.' }),
  unit: z.string().nonempty({ message: 'Veuillez entrer une unité.' }),
  image: z
    .any()
    .refine((val) => typeof window === 'undefined' || val instanceof FileList, {
      message: 'Veuillez ajouter une image.',
    })
    .refine((val) => val?.length > 0, 'Veuillez ajouter une image.')
    .refine((val) => val[0]?.size < MAX_FILE_SIZE, 'La taille de l\'image ne doit pas dépasser 5 Mo.')
    .refine((val) => ACCEPTED_IMAGE_TYPES.includes(val[0]?.type), 'Fichiers acceptés: jpeg, jpg, png.'),
});

const EditStock = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  async function onSubmit(values: z.infer<typeof AddStockSchema>) {
    const user = await getCurrentUser();

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('type', values.category);
    formData.append('price', values.price);
    formData.append('unit', values.unit);
    formData.append('stock', values.quantity);
    formData.append("image", values.image[0]);

    const response = await fetch(env.NEXT_PUBLIC_API_URL + '/product', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      body: formData,
    });

    if (!response?.ok) {
      toast({
        title: 'Error',
        description: (
          <div>
            <p>Something went wrong. Please try again.</p>
          </div>
        ),
      });
    } else {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ['stocks'] });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
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

export default EditStock;