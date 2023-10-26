"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { signOut } from 'next-auth/react'

type Props = {
  data: {
    name: string
    surname: string
    email: string
    phoneNumber: string,
  }
}

const formSchema = z.object({
  name: z.string().regex(/^[a-zA-Z\s]+$/, {
    message: 'Veuillez entrer un prénom valide.',
  }).optional(),
  surname: z.string().regex(/^[a-zA-Z\s]+$/, {
    message: 'Veuillez entrer un nom valide.',
  }).optional(),
  email: z.string().email({
    message: 'Veuillez entrer une adresse e-mail valide.',
  }).optional(),
  phone: z.string().regex(/^[0-9\s]{10}$/, {
    message: 'Veuillez entrer un numéro de téléphone valide.',
  }).optional(),
  password: z.string().min(8, {
    message: 'Le mot de passe doit avoir au moins 8 caractères.',
  }).optional(),
});

export const AccountParamsForm = ({ data }: Props) => {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
      surname: data.surname,
      email: data.email,
      phone: data.phoneNumber,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        // TODO: send request
      } catch (err) {
        // TODO: handle error
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Votre nom"
                  {...field}
                />
              </FormControl>
              {form.formState.errors.name?.message ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  Il s'agit de votre nom d'affichage public.
                </FormDescription>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="surname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Votre prénom"
                  {...field}
                />
              </FormControl>
              {form.formState.errors.surname?.message ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  Il s'agit de votre prénom d'affichage public.
                </FormDescription>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              {form.formState.errors.password?.message ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  Il s'agit de votre mots de passe.
                </FormDescription>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Votre adresse mail"
                  {...field}
                />
              </FormControl>
              {form.formState.errors.email?.message ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  Il s'agit de votre adresse mail d'affichage privée.
                </FormDescription>
              )}
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
                <Input
                  type="text"
                  placeholder="Votre numéro de téléphone"
                  {...field}
                />
              </FormControl>
              {form.formState.errors.phone?.message ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  Il s'agit de votre numéro de téléphone d'affichage privée.
                </FormDescription>
              )}
            </FormItem>
          )}
        />
        <div className='flex flex-row gap-2'>
          <Button onClick={e => form.reset()} variant="outlineGreen" disabled={isPending}>
            Annuler les changements
            <span className="sr-only">Annuler les changements</span>
          </Button>
          <Button type="submit" disabled={isPending}>
            Sauvegarder
            <span className="sr-only">Sauvegarder</span>
          </Button>
        </div>
        <div className='flex flex-row gap-2 pb-4'>
          <Button variant="outlineDestructive">
            Supprimer le compte
            <span className="sr-only">Supprimer le compte</span>
          </Button>
          <Button variant="destructive" onClick={e => signOut({
            callbackUrl: '/login',
          })} disabled={isPending}>
            Se déconnecter
            <span className="sr-only">Se déconnecter</span>
          </Button>
        </div>
      </form>
    </Form>
  )
}
