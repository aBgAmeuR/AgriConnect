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
import { getCurrentUser } from '@/lib/session';

export const metadata: Metadata = {
  title: 'Create',
  description: 'Create your account',
};

export default async function CreationPage() {
    const user = await getCurrentUser();

    return (
      <div className="relative flex items-center justify-center p-8">
        <Link className={buttonVariants({ variant: 'ghost' }) + ' absolute top-8 right-8'} href="login">
          Se connecter
        </Link>
        <div className="flex flex-col gap-6 w-[350px]">
          <Tabs defaultValue="client" className="w-[350px]">
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
              <RegisterNomForm />
            </TabsContent>
            <TabsContent value="coordonnees" className="mt-6">
              <RegisterCoordonneesForm />
            </TabsContent>
            <TabsContent value="activite" className="mt-6">
              <RegisterActivitesForm />
            </TabsContent>
            <TabsContent value="autre" className="mt-6">
              <RegisterAutreForm />
            </TabsContent>
          </Tabs>
          <p className="text-sm text-muted-foreground text-center">En cliquant sur Créer, vous acceptez nos Conditions d&apos;utilisation et politique de confidentialité.</p>
        </div>
      </div>
    );
  }
