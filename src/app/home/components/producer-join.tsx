import { Button } from '@/components/ui/button';

export default function Join() {
  return (
    <div className="w-full h-[300px]  px-4 pt-[30px] pb-[77px] bg-white bg-opacity-75 flex flex-col justify-center items-center">
      <div className="w-[753px] h-[240px] text-center mb-10 flex flex-col items-center justify-between">
        <span className="text-center text-zinc-950 text-3xl font-semibold  leading-tight">Vendez vos produits de la ferme en ligne et en direct</span>
        <span className="text-center text-zinc-950 text-base font-normal leading-tight mt-2">
          Vous souhaitez découvrir les producteurs en circuit court proches de vous, connaître d’autres spécialités régionales et faire le plein de produits du terroir ? Inscrivez-vous et achetez vos
          produits directement auprès de vos producteurs.
        </span>
      </div>
      <div className="flex justify-center items-center">
        <Button className="items-center">
          <div className="text-neutral-50 text-sm font-medium leading-tight">Je m'inscris</div>
        </Button>
      </div>
    </div>
  );
}
