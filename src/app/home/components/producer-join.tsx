import { Button } from '@/components/ui/button';

// TODO: Fusionner avec HomeOnline et HomeLocal

export default function Join() {
  return (
    <div className="w-full h-[300px]  px-4 pt-[30px] pb-[77px] bg-white bg-opacity-75 flex flex-col justify-center items-center">
      <h1 className="w-[753px] h-[240px] text-center mb-10 flex flex-col items-center justify-between">
        <p className="text-center text-zinc-950 text-3xl font-semibold  leading-tight">Vendez vos produits de la ferme en ligne et en direct</p>
        <p className="text-center text-zinc-950 text-base font-normal leading-tight mt-2">
          Vous souhaitez découvrir les producteurs en circuit court proches de vous, connaître d’autres spécialités régionales et faire le plein de produits du terroir ? Inscrivez-vous et achetez vos
          produits directement auprès de vos producteurs.
        </p>
      </h1>
      <div className="flex justify-center items-center">
        <Button className="items-center text-neutral-50 text-sm font-medium leading-tight">Je m'inscris</Button>
      </div>
    </div>
  );
}
