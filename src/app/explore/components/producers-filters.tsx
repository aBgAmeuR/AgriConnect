"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import AddressInput from "@/components/ui/address-input"
import { useQueryClient } from "@tanstack/react-query"

const formSchema = z.object({
  text: z.string().optional(),
  location: z.string().optional(),
  type: z.string().optional(),
  distance: z.string().optional(),
})

export type FormValues = z.infer<typeof formSchema>

type ProducersFiltersProps = {
  params: FormValues
  setParams: (params: FormValues) => void
  isLoaded: boolean;
}

type AddressProps = {
  address: string;
  lat: number;
  lng: number;
} | null;

export function ProducersFilters({ params, setParams, isLoaded }: ProducersFiltersProps) {
  const [isPending, startTransition] = React.useTransition()
  const [address, setAddress] = React.useState<AddressProps>(null);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
      location: '',
      type: '',
      distance: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const location = address?.lat ? `${address?.lat},${address?.lng}` : '';
      if (values.type === 'unassigned') values.type = '';
      if (values.distance === 'unassigned') values.distance = '';
      setParams({
        text: values.text ?? '',
        location: location,
        type: values.type ?? '',
        distance: values.distance ?? ''
      })
      queryClient.invalidateQueries({ queryKey: ['SearchProducers', params] });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2 w-full">
        <div className="flex flex-row gap-2">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Search..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <AddressInput onChange={setAddress} isLoaded={isLoaded} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row gap-2">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Catégorie de produits </SelectLabel>
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
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="distance"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Distance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Distance</SelectLabel>
                        <SelectItem value="unassigned">Tous</SelectItem>
                        <SelectItem value="10">10 km</SelectItem>
                        <SelectItem value="25">25 km</SelectItem>
                        <SelectItem value="50">50 km</SelectItem>
                        <SelectItem value="100">100 km</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            Chercher
            <span className="sr-only">Chercher</span>
          </Button>
        </div>
      </form>
    </Form>
  )
}