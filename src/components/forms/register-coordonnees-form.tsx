"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '../ui/use-toast';
import { env } from '@/lib/env';
import { step2Schema } from '@/app/(producer)/producer/register/registerForm';
import { useTransition } from 'react';
import router from 'next/router';

export function RegisterCoordonneesForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof step2Schema>>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      adresse: '',
      numTel: ''
    },
  }) as UseFormReturn<{ adresse: string; numTel: string; }, any, undefined>;

  function onSubmit(values: z.infer<typeof step2Schema>) {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append('adresse', values.adresse);
        formData.append('numTel', values.numTel);
        const formDataText = `Adresse: ${values.adresse}\nNuméro de téléphone: ${values.numTel}`;
        const res = await fetch(env.NEXT_PUBLIC_API_URL+'/register', {
          method: 'POST',
          body: formData,
        });
        router.push('/explore');
      } catch (err) {
        toast({
          title: 'Erreur',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-red-600 p-4">
              <code className="text-white">{JSON.stringify(err, null, 2)}</code>
            </pre>
          ),
        });
      }
    });
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