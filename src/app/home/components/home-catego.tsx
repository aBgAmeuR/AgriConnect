import React from 'react';
import { Button } from '@/components/ui/button';

export default function CategoriesShowcase() {
  const categories = [
    { src: './fruits.jpg', alt: 'Category Image 1', link: '/categorie-1', text: 'Fruits' },
    { src: './letus.jpg', alt: 'Category Image 2', link: '/categorie-2', text: 'Salades' },
    { src: './viande.jpg', alt: 'Category Image 3', link: '/categorie-3', text: 'Viandes' },
    { src: './charcuterie.jpg', alt: 'Category Image 4', link: '/categorie-4', text: 'Charcuterie' },
    { src: './frommage.jpg', alt: 'Category Image 5', link: '/categorie-5', text: 'Frommages' },
  ];

  return (
    <div className="w-full h-[382px] px-[23px] pt-4 pb-8 bg-stone-50 flex flex-col justify-center items-center gap-6">
      <div className="w-[1224px] h-[270px] flex justify-center items-center gap-16">
        {categories.map((category, index) => (
          <div key={index} className="relative">
            <img className="grow shrink basis-0 h-[270px]" src={category.src} alt={`Catégorie ${index + 1}`} />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-2">{category.text}</div>
          </div>
        ))}
      </div>
      <Button>
        <p className="text-neutral-50 text-sm font-medium leading-tight">Afficher toutes les catégories</p>
      </Button>
    </div>
  );
}
