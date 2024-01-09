'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '../ui/use-toast';
import { env } from '@/lib/env';

import { step3Schema} from '@/app/(producer)/producer/register/registerForm';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';

export default function RegisterActivitesForm() {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof step3Schema>>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      categorie: '',
      description: ''
    },
  });

  function addValuesToFile(values: { categorie: string; description: string; }) {
    // Ajoutez le code pour ajouter les valeurs à votre fichier ici
    console.log('Valeurs du formulaire ajoutées au fichier:', values);
  }

  function onSubmit(values: z.infer<typeof step3Schema>) {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append('categorie', values.categorie);
        formData.append('description', values.description);

        addValuesToFile(values);

        const res = await fetch(env.NEXT_PUBLIC_API_URL+'/register', {
          method: 'POST',
          body: formData,
        });
        router.push('/explore')
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
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
        <FormField
          control={form.control}
          name="categorie"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Prénom</FormLabel> */}
              <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="unassigned">Tous</SelectItem>
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
              <FormMessage />
                <FormDescription>
                  Il s'agit des catégories de votre page, visible par tous les clients.
                </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Nom</FormLabel> */}
              <FormControl>
                <Input type="textArea" placeholder="Description de votre activité" {...field} />
              </FormControl>
              <FormMessage />
                <FormDescription>
                  Il s'agit de votre description qui sera visible en haut de votre page.
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
