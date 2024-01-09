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
import { DataStore } from '@/app/(producer)/producer/register/shop-register';

type Props = {
  data: DataStore,
  setData: React.Dispatch<React.SetStateAction<DataStore>>
}

export function RegisterAutreForm({ data, setData }: Props) {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();
  const [fileInputRef, setFileInputRef] = React.useState<HTMLInputElement | null>(null);
  const [textFileData, setTextFileData] = React.useState<string[]>([]);
  const form = useForm<z.infer<typeof step4Schema>>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      moyenDePayement: '',
    },
  });

  React.useEffect(() => {
    if (fileInputRef) {
      fileInputRef.click();
    }
  }, [fileInputRef]);


  function onSubmit(values: z.infer<typeof step4Schema>) {
    try {
      setData({ ...data, payement: values.moyenDePayement });

      console.log(data);
      
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
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
