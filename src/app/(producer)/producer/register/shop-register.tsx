'use client'

// File: src/app/(producer)/producer/register/page.tsx
import { buttonVariants } from '@/components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RegisterNomForm } from '@/components/forms/register-nom-form';
import { RegisterCoordonneesForm } from '@/components/forms/register-coordonnees-form';
import RegisterActivitesForm from '@/components/forms/register-activites-form';
import { RegisterAutreForm } from '@/components/forms/register-autre-form';

export type DataStore = {
  nom: string;
  adress: string;
  numero: string;
  category: string;
  desc: string;
  payement: string;
};

export default function ShopRegister({ userId }: { userId: string }) {
  const [data, setData] = React.useState<DataStore>({
    nom: '',
    adress: '',
    numero: '',
    category: '',
    desc: '',
    payement: '',
  });

  return (
    <div className="relative flex items-center justify-center p-8">
      <Link className={buttonVariants({ variant: 'ghost' }) + ' absolute top-8 right-8'} href="login">
        Se connecter
      </Link>
      <div className="flex flex-col gap-6 w-[350px]">
        <Tabs defaultValue="nom" className="w-[350px]">
          <h1 className="text-xl text-center mb-3">Créer la boutique</h1>
          <TabsList className="w-full">
            <TabsTrigger value="nom" className="w-full">
              Nom
            </TabsTrigger>
            <TabsTrigger value="coordonnees" className="w-full">
              Coordonnées
            </TabsTrigger>
            <TabsTrigger value="activite" className="w-full">
              Activité
            </TabsTrigger>
            <TabsTrigger value="autre" className="w-full">
              Autre
            </TabsTrigger>
          </TabsList>
          <TabsContent value="nom" className="mt-6">
            <RegisterNomForm data={data} setData={setData} />
          </TabsContent>
          <TabsContent value="coordonnees" className="mt-6">
            <RegisterCoordonneesForm data={data} setData={setData} />
          </TabsContent>
          <TabsContent value="activite" className="mt-6">
            <RegisterActivitesForm data={data} setData={setData} />
          </TabsContent>
          <TabsContent value="autre" className="mt-6">
            <RegisterAutreForm data={data} setData={setData} />
          </TabsContent>
        </Tabs>
        <p className="text-sm text-muted-foreground text-center">En cliquant sur Créer, vous acceptez nos Conditions d&apos;utilisation et politique de confidentialité.</p>
      </div>
    </div>
  );
}
