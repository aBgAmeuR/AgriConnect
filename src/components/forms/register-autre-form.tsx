'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { toast } from '../ui/use-toast';
import { env } from '@/lib/env';

import { step4Schema } from '@/app/(producer)/producer/register/registerForm';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';

export function RegisterAutreForm() {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();
  const [fileInputRef, setFileInputRef] = React.useState<HTMLInputElement | null>(null);
  const [textFileData, setTextFileData] = React.useState<string[]>([]); // Added state for textFileData
  const form = useForm<z.infer<typeof step4Schema>>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      image: '',
      moyenDePayement: '',
    },
  });

  React.useEffect(() => {
    if (fileInputRef) {
      fileInputRef.click();
    }
  }, [fileInputRef]);

  function handleFileChange(target: HTMLInputElement | null) {
    const files = target?.files;

    if (files && files.length > 0) {
      const file = files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = (event) => {
          const fileContent = (event.target as FileReader).result;
          processFileContent(fileContent as string);
        };

        reader.readAsText(file);
      }
    }
  }

  function processFileContent(content: string) {
    setTextFileData(content.split('\n'));
  }

  function onSubmit(values: z.infer<typeof step4Schema>) {
    startTransition(async () => {
      try {
        const updatedFileContent = textFileData.concat(
          `image=${values.image}&moyenDePayement=${values.moyenDePayement}`
        );

        for (const line of updatedFileContent) {
          const formData = new FormData();
          formData.append('line', line);

          await fetch(env.NEXT_PUBLIC_API_URL + '/register', {
            method: 'POST',
            body: formData,
          });
        }

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
      <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Nom</FormLabel> */}
              <FormControl>
                <Input type="text" placeholder="Veuillez renseigner l'URL de votre image" {...field} />
              </FormControl>
              <FormMessage />
                <FormDescription>
                  Il s'agit de votre image de boutique qui sera visible en haut de votre page.
                </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="moyenDePayement"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Prénom</FormLabel> */}
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Moyen de payement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="especes">Espèces</SelectItem>
                      <SelectItem value="cheque">Chèque</SelectItem>
                      <SelectItem value="carteBancaire">Carte bancaire</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
              <FormDescription>
                Il s'agit du moyen de payement accepté par votre boutique.
              </FormDescription>
            </FormItem>)}
        />
        <Button type="submit" disabled={isPending}>
                Créer
                <span className="sr-only">Créer</span>
              </Button>
      </form>
    </Form>
  );
}
