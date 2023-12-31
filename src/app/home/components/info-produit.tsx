import React from 'react';
import InfoCard from './home-infCard';

export default function InfoSection() {
  return (
    <div className="h-full bg-white p-6 bg-opacity-75 flex flex-col justify-center items-center">
      <h1 className="mb-6 w-full sm:w-auto text-center text-black text-2xl font-normal leading-tight">Pourquoi commander sur agriconnect ?</h1>
      <div className="flex flex-wrap justify-center gap-12">
        <InfoCard title="Des terroirs et du goût" description="Nos terroirs ont beaucoup à offrir ! Faites votre choix parmi de nombreux produits de votre région." />
        <InfoCard title="Des producteurs dans toute la France" description="Soyez en contact direct avec ceux qui élèvent, plantent, cueillent, sèment, fabriquent ou font grandir." />
        <InfoCard title="Un geste engagé" description="Consommer local, c'est penser à ses papilles, aux producteurs et à la planète !" />
        <InfoCard title="Vos achats en quelques clics" description="Emballé, c'est pesé. Vous choisissez, vous cliquez, vous achetez. Rien de plus simple." />
      </div>
    </div>
  );
}
