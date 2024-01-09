import { Metadata, } from 'next';
import React from 'react';
import ShopRegister from './shop-register';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Create',
  description: 'Create your account',
};

export default async function CreationPage() {
  return (
    <main className="grid min-h-screen grid-cols-2 overflow-hidden">
      <div className="relative p-10 text-white">
        <div className="relative flex items-center gap-2 z-10">
          <Image src="/logo.png" alt="Logo" width={24} height={24} />
          <p className="text-lg">AgriConnect</p>
        </div>
        <Image src="/auth-background.jpg" alt="Background" fill style={{ objectFit: "cover" }} />
        <div className="absolute bottom-10 flex flex-col gap-2 mr-10">

        </div>
      </div>
      <ShopRegister userId='' />
    </main>
  );
}
