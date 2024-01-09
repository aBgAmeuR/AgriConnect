"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { step2Schema } from '@/app/(producer)/producer/register/registerForm';
import { useTransition } from 'react';
import router from 'next/router';
import { DataStore } from '@/app/(producer)/producer/register/shop-register';

type Props = {
  data: DataStore,
  setData: React.Dispatch<React.SetStateAction<DataStore>>
}

export function RegisterCoordonneesForm({ data, setData }: Props) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof step2Schema>>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      adresse: '',
      numTel: ''
    },
  }) as UseFormReturn<{ adresse: string; numTel: string; }, any, undefined>;

  function onSubmit(values: z.infer<typeof step2Schema>) {
    try {
      setData({ ...data, adress: values.adresse, numero: values.numTel });
    } catch (err) {
      console.error(err);
    }
  }

  if (useClient()) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
          <FormItem>
            <FormControl>
              <Input type="text" placeholder="Adresse" {...form.register('adresse')} />
            </FormControl>
            <FormMessage>{form.formState.errors.adresse?.message}</FormMessage>
            <FormDescription>
              Il s'agit de votre adresse d'affichage public.
            </FormDescription>
          </FormItem>
          <FormItem>
            <FormControl>
              <Input type="text" placeholder="Numéro de téléphone" {...form.register('numTel')} />
            </FormControl>
            <FormMessage>{form.formState.errors.numTel?.message}</FormMessage>
            <FormDescription>
              Il s'agit de votre numéro de téléphone d'affichage public.
            </FormDescription>
          </FormItem>
          <Button type="submit" disabled={isPending}>
            Suivant
            <span className="sr-only">Suivant</span>
          </Button>
        </form>
      </Form>
    );
  }

  return null; // Return null for server-side rendering
}

function useClient(): boolean {
  return typeof window !== 'undefined';
}