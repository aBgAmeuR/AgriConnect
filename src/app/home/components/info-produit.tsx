import React from 'react';
import InfoCard from './home-infCard';

export default function InfoSection() {
  return (
    <div className="w-full h-auto px-4 py-8 flex flex-col items-center gap-8 sm:flex-col sm:gap-12 sm:justify-center">
      {/* // TODO: Utilise un h1 */}
      <div className="mb-6 w-full sm:w-auto text-center text-black text-2xl font-normal leading-tight">Pourquoi commander sur agriconnect ?</div>
      <div className="flex flex-wrap justify-center gap-12">
        <InfoCard title="Des terroirs et du goût" description="Nos terroirs ont beaucoup à offrir ! Faites votre choix parmi de nombreux produits de votre région." />
        <InfoCard title="Des producteurs dans toute la France" description="Soyez en contact direct avec ceux qui élèvent, plantent, cueillent, sèment, fabriquent ou font grandir." />
        <InfoCard title="Un geste engagé" description="Consommer local, c'est penser à ses papilles, aux producteurs et à la planète !" />
        <InfoCard title="Vos achats en quelques clics" description="Emballé, c'est pesé. Vous choisissez, vous cliquez, vous achetez. Rien de plus simple." />
      </div>
    </div>
  );
}
