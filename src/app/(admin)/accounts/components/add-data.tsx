'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AddTransactionForm } from '@/components/forms/add-transaction-form';
import z from 'zod';
import { toast } from '../use-toast';
import { useRouter } from 'next/navigation';

export const formSchema = z.object({
  name: z.string({ required_error: 'Please enter a name' }),
  date: z.date({ required_error: 'Please select a date' }),
  amount: z.string({ required_error: 'Please enter a amount' }).regex(/^-?\d+(\.\d{1,2})?$/, { message: 'Please enter a valid amount' }),
  category: z.string({ required_error: 'Please select a category' }),
  description: z.string().max(160, { message: 'Please enter a description with less than 160 characters' }).optional(),
});

const AddData = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    const response = await fetch(`/api/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        date: values.date,
        amount: values.amount,
        category: values.category,
        description: values.description,
      }),
    })

    if (!response?.ok) {
      toast({
        title: 'Error',
        description: (
          <div>
            <p>Something went wrong. Please try again.</p>
          </div>
        ),
      });
    } else {
      setOpen(false);
      router.refresh();
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="ml-auto hidden h-8 lg:flex just">
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#ffffff] dark:bg-[#111315]">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>Add a transaction to your list here. Click add when you&rsquo;re done.</DialogDescription>
        </DialogHeader>
        <AddTransactionForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddData;
