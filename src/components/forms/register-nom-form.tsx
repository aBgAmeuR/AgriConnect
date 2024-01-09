"use client"
import * as React from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { step1Schema } from '@/app/(producer)/producer/register/registerForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DataStore } from '@/app/(producer)/producer/register/shop-register';

type Props = {
  data: DataStore,
  setData: React.Dispatch<React.SetStateAction<DataStore>>
}

export function RegisterNomForm({ data, setData }: Props) {
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<z.infer<typeof step1Schema>>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof step1Schema>) {
    try {
      setData({ ...data, nom: values.name });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" placeholder="Nom de la boutique" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Il s'agit de votre nom d'affichage public.
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Suivant
          <span className="sr-only">Suivant</span>
        </Button>

      </form>
    </Form>
  );
}
