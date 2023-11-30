import * as React from 'react';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

export function SelectCateg() {
  return (
    <Select>
      <SelectTrigger
        className="flex h-9 w-[227px] text-zinc-500 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 font-normal 
                leading-tight file:font-medium  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50
                bg-white ml-1 ">
        <SelectValue placeholder="Sélectionner une categorie" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Catégorie de produits </SelectLabel>
          <SelectItem value="Fruits">Fruits</SelectItem>
          <SelectItem value="Légumes">Légumes</SelectItem>
          <SelectItem value="Viande">Viande</SelectItem>
          <SelectItem value="Charcuterie">Charcuterie</SelectItem>
          <SelectItem value="laitiers">Produits laitiers</SelectItem>
          <SelectItem value="Vins">Vins</SelectItem>
          <SelectItem value="Bières">Bières</SelectItem>
          <SelectItem value="Alcools">Alcools</SelectItem>
          <SelectItem value="Boissons">Boissons</SelectItem>
          <SelectItem value="Herbes">Herbes aromatiques</SelectItem>
          <SelectItem value="Epicerie">Epicerie</SelectItem>
          <SelectItem value="Boison">Café, Thé et Tisanes</SelectItem>
          <SelectItem value="Poissons">Poissons & Crustacés</SelectItem>
          <SelectItem value="Pain">Pain & Biscuits</SelectItem>
          <SelectItem value="Confiseries">Confiseries</SelectItem>
          <SelectItem value="Céréales">Céréales</SelectItem>
          <SelectItem value="Fruits-secs">Fruits secs</SelectItem>
          <SelectItem value="Légumineuses">Légumineuses</SelectItem>
          <SelectItem value="Panier">Panier Fruits et Légumes</SelectItem>
          <SelectItem value="Œufs">Œufs et produits de la ferme</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
