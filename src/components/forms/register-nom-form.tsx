"use client"
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { step1Schema } from '@/app/(producer)/producer/register/registerForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { env } from '@/lib/env';
import { getCurrentUser } from '@/lib/session';

export function RegisterNomForm() {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof step1Schema>>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      name: '',
    },
  });

  const storedFormData = Cookies.get('formData') || '';
  const formDataAccumulator = React.useRef<string>(storedFormData);

  async function onSubmit(values: z.infer<typeof step1Schema>) {
    try {
      const userSession = await getCurrentUser();
      const formData = new URLSearchParams();
  
      formData.append('nom', values.name || "");

      const response = await fetch(env.NEXT_PUBLIC_API_URL + '/user/' + userSession?.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${userSession?.accessToken}`,
        },
        body: formData.toString(),
      });
      if (!response.ok) {
        throw new Error(`Failed to update user: ${response.statusText}`);
      }
      const responseData = await response.json();
      console.log('User updated:', responseData.data);
      
      form.reset({
        name: responseData.data.name
      });
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
  );}
