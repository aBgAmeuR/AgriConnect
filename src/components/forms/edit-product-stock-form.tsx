'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EditStockSchema } from '@/app/(producer)/stock/components/modal/edit-stock';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

type Props = {
  onSubmit: (values: z.infer<typeof EditStockSchema>) => void;
  defaultValues: z.infer<typeof EditStockSchema>;
};

export function EditProductStockForm({ onSubmit, defaultValues }: Props) {
  // react-hook-form
  const form = useForm<z.infer<typeof EditStockSchema>>({
    resolver: zodResolver(EditStockSchema),
    defaultValues: {
      name: defaultValues.name,
      category: defaultValues.category,
      quantity: defaultValues.quantity,
      price: defaultValues.price,
      unit: defaultValues.unit,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={e => onSubmit(form.getValues())} className="grid gap-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du produit</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Nom du produit" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className='flex flex-row gap-4 w-full'>
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className='w-1/2'>
                <FormLabel>Catégorie du produit</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Catégorie du produit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Catégorie de produits </SelectLabel>
                        <SelectItem value="Confitures">Confitures</SelectItem>
                        <SelectItem value="Fromages">Fromages</SelectItem>
                        <SelectItem value="Fruits">Fruits</SelectItem>
                        <SelectItem value="Laits">Laits</SelectItem>
                        <SelectItem value="Légumes">Légumes</SelectItem>
                        <SelectItem value="Miels">Miels</SelectItem>
                        <SelectItem value="Produits laitiers">Produits laitiers</SelectItem>
                        <SelectItem value="Viandes">Viandes</SelectItem>
                        <SelectItem value="Vins">Vins</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem className='w-1/2'>
                <FormLabel>Unité du produit</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Unité du produit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Unité de mesure </SelectLabel>
                        <SelectItem value="Kg">Kilogramme</SelectItem>
                        <SelectItem value="Litre">Litre</SelectItem>
                        <SelectItem value="Unité">Unité</SelectItem>
                        <SelectItem value="Pièce">Pièce</SelectItem>
                        <SelectItem value="Paquet">Paquet</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>

              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-row gap-4 w-full'>
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prix du produit</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Prix du produit" {...field} />
                </FormControl>

              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantité du produit</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Quantité du produit" {...field} />
                </FormControl>

              </FormItem>
            )}
          />
        </div>
        {/* <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description du produit</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Description du produit" {...field} />
              </FormControl>
            </FormItem>
          )}
        /> */}
        <Button type="submit" >
          Ajouter
          <span className="sr-only">Ajouter</span>
        </Button>
      </form>
    </Form>
  );
}