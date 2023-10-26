import React from 'react';

export default function InfoSection() {
  return (
    <div className="w-full h-[305px] px-4 py-8 justify-center items-center gap-[71px] flex flex-col">
      <div className="mb-6 w-[944px] h-[82px] text-center text-black text-2xl font-normal leading-tight">Pourquoi commander sur agriconnect ?</div>
      <div className="flex flex-wrap justify-between gap-12">
        <InfoCard title="Des terroirs et du goût" description="Nos terroirs ont beaucoup à offrir ! Faites votre choix parmi de nombreux produits de votre région." />
        <InfoCard title="Des producteurs dans toute la France" description="Soyez en contact direct avec ceux qui élèvent, plantent, cueillent, sèment, fabriquent ou font grandir." />
        <InfoCard title="Un geste engagé" description="Consommer local, c'est penser à ses papilles, aux producteurs et à la planète !" />
        <InfoCard title="Vos achats en quelques clics" description="Emballé, c'est pesé. Vous choisissez, vous cliquez, vous achetez. Rien de plus simple." />
      </div>
    </div>
  );
}

type InfoCardProps = {
  title: string;
  description: string;
};

function InfoCard({ title, description }: InfoCardProps) {
  return (
    <div className="w-[250px] h-[103px] text-center">
      <span className="block text-black text-base font-bold leading-tight">
        {title}
        <br />
      </span>
      <span className="block text-black text-sm font-normal leading-tight">{description}</span>
    </div>
  );
}
