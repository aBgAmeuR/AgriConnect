import { buttonVariants } from '@/components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RegisterClientForm } from '@/components/forms/register-client-form';
import { RegisterProducerForm } from '@/components/forms/register-producer-form';

export const metadata: Metadata = {
  // metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: 'Register',
  description: 'Register to your account',
};

export default async function RegisterPage() {
  return (
    <div className="relative flex items-center justify-center p-8">
      <Link className={buttonVariants({ variant: 'ghost' }) + ' absolute top-8 right-8'} href="login">
        Se connecter
      </Link>
      <div className="flex flex-col gap-6 w-[350px]">
        <Tabs defaultValue="client" className="w-[350px]">
          <h1 className="text-xl text-center mb-3">Créer un compte</h1>
          <TabsList className="w-full">
            <TabsTrigger value="client" className="w-full">
              Client
            </TabsTrigger>
            <TabsTrigger value="producteur" className="w-full">
              Producteur
            </TabsTrigger>
          </TabsList>
          <TabsContent value="client" className="mt-6">
            <RegisterClientForm />
          </TabsContent>
          <TabsContent value="producteur" className="mt-6">
            <RegisterProducerForm />
          </TabsContent>
        </Tabs>
        <p className="text-sm text-muted-foreground text-center">En cliquant sur Créer, vous acceptez nos Conditions d&apos;utilisation et politique de confidentialité.</p>
      </div>
    </div>
  );
}
