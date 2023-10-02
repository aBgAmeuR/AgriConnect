'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '../ui/use-toast';

const formSchema = z.object({
  surname: z.string().regex(/^[a-zA-Z]+$/, {
    message: 'Veuillez entrer un nom valide.',
  }),
  name: z.string().regex(/^[a-zA-Z]+$/, {
    message: 'Veuillez entrer un prénom valide.',
  }),
  email: z.string().email({
    message: 'Veuillez entrer une adresse e-mail valide.',
  }),
  phone: z.string().regex(/^[0-9]{10}$/, {
    message: 'Veuillez entrer un numéro de téléphone valide.',
  }),
  password: z.string().min(8, {
    message: 'Le mot de passe doit avoir au moins 8 caractères.',
  }),
});

export function RegisterClientForm() {
  const [isPending, startTransition] = React.useTransition();

  // react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      surname: '',
      name: '',
      email: '',
      phone: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        toast({
          title: 'Vous avez envoyé les valeurs suivantes :',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-green-600 p-4">
              <code className="text-white">{JSON.stringify(values, null, 2)}</code>
            </pre>
          ),
        });
      } catch (err) {
        console.log(err);
      }
    });
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
        <FormField
          control={form.control}
          name="surname"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Nom</FormLabel> */}
              <FormControl>
                <Input type="text" placeholder="Nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Prénom</FormLabel> */}
              <FormControl>
                <Input type="text" placeholder="Prénom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Email</FormLabel> */}
              <FormControl>
                <Input type="email" placeholder="damiencren35@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Téléphone</FormLabel> */}
              <FormControl>
                <Input type="text" placeholder="Téléphone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Password</FormLabel> */}
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {/* {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )} */}
          Créer un compte
          <span className="sr-only">Créer un compte</span>
        </Button>
      </form>
    </Form>
  );
}
