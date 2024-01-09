"use client"

import * as React from "react"
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form"
import { signIn } from 'next-auth/react';

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
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast";
import { getCurrentUser } from "@/lib/session";

const formSchema = z.object({
  email: z.string().email({
    message: "Veuillez entrer une adresse e-mail valide."
  }),
  password: z.string().min(8, {
    message: "Le mot de passe doit avoir au moins 8 caractères."
  }),
})

export function LoginForm() {
  const [isPending, startTransition] = React.useTransition()
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const signInResponse = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        })
        
        if (!signInResponse || signInResponse.ok !== true) {
          toast({
            variant: "destructive",
            title: "Identifiants incorrects",
            description: "Veuillez vérifier vos identifiants et réessayer.",
            action: <ToastAction altText="Try again">Réessayer</ToastAction>,
          })
        } else {
          const user = await getCurrentUser();

          switch (user?.role) {
            case 'admin':
              router.push('/accounts')
              break;
            case 'producer':
              router.push('/commands')
              break;
            case 'client':
              router.push('/explore')
              break;
            default:
              router.push('/')
              break;
          }
        }
      } catch (err) {
        console.error(err);
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@example.com"
                  {...field}
                />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Se connecter
          <span className="sr-only">Se connecter</span>
        </Button>
      </form>
    </Form>
  )
}