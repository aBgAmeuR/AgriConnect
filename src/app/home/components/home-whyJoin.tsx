import InfoCard from '@/app/home/components/home-infCard';

export default function InfoSectionProducer() {
  return (
    <div className="w-full h-auto px-4 py-8 flex flex-col items-center gap-8 sm:flex-col sm:gap-12 sm:justify-center ">
      {/* // TODO: Utilise un h1 */}
      <div className="mb-6 w-full sm:w-auto text-center text-black text-2xl font-normal leading-tight">Pourquoi rejoindre agriconnect ?</div>
      <div className="flex flex-wrap justify-center gap-12">
        <InfoCard
          title="Fidélisez votre clientèle en optimisant la prise de commande"
          description="Nos terroirs ont beaucoup à offrir ! Faites votre choix parmi de nombreux produits de votre région."
        />
        <InfoCard
          title="Economisez du temps grâce à l’outil de gestion intégré"
          description="Soyez en contact direct avec ceux qui élèvent, plantent, cueillent, sèment, fabriquent ou font grandir."
        />
        <InfoCard title="Trouvez de nouveaux clients en renforçant votre présence en ligne" description="Consommer local, c'est penser à ses papilles, aux producteurs et à la planète !" />
      </div>
    </div>
  );
}
