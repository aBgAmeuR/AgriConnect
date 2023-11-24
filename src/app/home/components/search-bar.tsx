import { SelectCateg } from '@/components/select-categ';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SearchBar() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-2.5 px-4 md:px-8 lg:w-[1147px] lg:px-[184px]">
      {/* // TODO: Variant Input components */}
      <input
        type="search"
        className="flex-1 h-9 min-w-[150px] text-zinc-500 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors 
            file:border-0 font-normal leading-tight file:font-medium placeholder:text-muted-foreground focus-visible:outline-none
            focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 bg-white"
        placeholder="Que chercher vous ?"
      />

      {/* // TODO: Pas besoin de ce composant */}
      <SelectCateg />

      {/* // TODO: Variant Input components */}
      <Input
        className="flex-1 h-9 min-w-[150px] text-zinc-500 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors 
            file:border-0 font-normal leading-tight file:font-medium placeholder:text-muted-foreground focus-visible:outline-none
            focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 bg-white"
        placeholder="Localisation "
      />
      {/* // TODO: Pourquoi dans une div ? */}
      <div className="flex justify-center items-center gap-2">
        <Button>
          {/* // TODO: Pas besoin de mettre un p dans un bouton */}
          <p className="text-l text-center leading-tight">Rechercher</p>
        </Button>
      </div>
    </div>
  );
}
