'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { Select } from '@radix-ui/react-select';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';

type Props = {
  data: {
    name: string;
    address: string;
    category: string;
    phoneNumber: string;
    description: string;
    image: string;
    payement: string;
  };
};

const formSchema = z.object({
  shopName: z.string().regex(/^[a-zA-Z\s]+$/, {
    message: 'Veuillez entrer un nom de boutique valide.',
  }),
  address: z.string().min(1, { message: "L'adresse ne peut pas être vide." }),
  category: z.string().min(1, { message: 'Veuillez choisir une catégorie.' }),
  phone: z
    .string()
    .regex(/^[0-9]+$/, {
      message: 'Veuillez entrer un numéro de téléphone valide.',
    })
    .optional(),
  description: z.string().min(1, { message: 'La description ne peut pas être vide.' }),
  image: z.string().url({ message: 'Veuillez entrer une URL valide pour l’image.' }).optional(),
  payement: z.string().min(1, { message: 'Veuillez sélectionner un moyen de paiement.' }),
});

export const EditShopForm = ({ data }: Props) => {
  const [isPending, startTransition] = React.useTransition();
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shopName: data.name,
      address: data.address,
      category: data.category,
      phone: data.phoneNumber,
      description: data.description,
      image: data.image,
      payement: data.payement,
    },
  });
  console.log(data);
  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const user = session?.user;
        console.log(user);
      } catch (err) {
        // TODO: handle error
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <FormField
          control={form.control}
          name="shopName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de la Boutique</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Le nom de votre Boutique" {...field} />
              </FormControl>
              {form.formState.errors.shopName?.message ? <FormMessage /> : <FormDescription>Il s'agit de votre nom d'affichage public.</FormDescription>}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Votre  adresse" {...field} />
              </FormControl>
              {form.formState.errors.address?.message ? <FormMessage /> : <FormDescription>Il s'agit de votre adresse d'affichage public.</FormDescription>}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro de téléphone</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Votre numéro de téléphone" {...field} />
              </FormControl>
              {form.formState.errors.phone?.message ? <FormMessage /> : <FormDescription>Il s'agit de votre numéro de téléphone d'affichage public.</FormDescription>}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="auto">
                    <SelectValue placeholder="Select a timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Catégorie de produits </SelectLabel>
                      <SelectItem value="Fruits">Fruits</SelectItem>
                      <SelectItem value="Légumes">Légumes</SelectItem>
                      <SelectItem value="Viande">Viande</SelectItem>
                      <SelectItem value="Charcuterie">Charcuterie</SelectItem>
                      <SelectItem value="laitiers">Produits laitiers</SelectItem>
                      <SelectItem value="Vins">Vins</SelectItem>
                      <SelectItem value="Bières">Bières</SelectItem>
                      <SelectItem value="Alcools">Alcools</SelectItem>
                      <SelectItem value="Boissons">Boissons</SelectItem>
                      <SelectItem value="Herbes">Herbes aromatiques</SelectItem>
                      <SelectItem value="Epicerie">Epicerie</SelectItem>
                      <SelectItem value="Boison">Café, Thé et Tisanes</SelectItem>
                      <SelectItem value="Poissons">Poissons & Crustacés</SelectItem>
                      <SelectItem value="Pain">Pain & Biscuits</SelectItem>
                      <SelectItem value="Confiseries">Confiseries</SelectItem>
                      <SelectItem value="Céréales">Céréales</SelectItem>
                      <SelectItem value="Fruits-secs">Fruits secs</SelectItem>
                      <SelectItem value="Légumineuses">Légumineuses</SelectItem>
                      <SelectItem value="Panier">Panier Fruits et Légumes</SelectItem>
                      <SelectItem value="Œufs">Œufs et produits de la ferme</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              {form.formState.errors.category?.message ? <FormMessage /> : <FormDescription>Il s'agit des catégories de votre page, visible par tout les clients.</FormDescription>}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Une courte description" {...field} />
              </FormControl>
              {form.formState.errors.phone?.message ? <FormMessage /> : <FormDescription>Il s'agit de votre description qui sera visible en haut de votre page.</FormDescription>}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Choisir une image" {...field} />
              </FormControl>
              {form.formState.errors.phone?.message ? <FormMessage /> : <FormDescription>Il s'agit de votre image visible tout en haut de votre page.</FormDescription>}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="payement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Moyen de payement</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="cash" />
                    </FormControl>
                    <FormLabel>Espèce</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="card" />
                    </FormControl>
                    <FormLabel>Carte Bancaire</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="crypto" />
                    </FormControl>
                    <FormLabel>Crypto-monnaie</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              {form.formState.errors.phone?.message ? <FormMessage /> : <FormDescription>Il s'agit de vos moyen de payement autorisé.</FormDescription>}
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-2">
          <Button onClick={(e) => form.reset()} variant="outlineGreen" disabled={isPending}>
            Annuler les changements
            <span className="sr-only">Annuler les changements</span>
          </Button>
          <Button type="submit" disabled={isPending}>
            Sauvegarder
            <span className="sr-only">Sauvegarder</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};
