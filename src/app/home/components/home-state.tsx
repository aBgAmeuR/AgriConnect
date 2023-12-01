import React from 'react';
import InfoCard from './home-infCard';

export default function OtherNumber() {
  return (
    <div className="w-full h-auto px-4 py-8 flex flex-col items-center gap-8 sm:flex-col sm:gap-12 sm:justify-center">
      <div className="flex flex-wrap justify-center gap-12">
        <InfoCard title="77% " description="Des Français privilégient l’approvisionnement auprès de leurs producteurs locaux. Rappelez à vos clients que vous le faites aussi !" />
        <InfoCard title="71%" description="Des Français prennent en compte l’origine du produit au moment de l’achat. Faites-vous connaître sur votre territoire." />
        <InfoCard title="7,4 Milions%" description="Des Français achètent leurs produits alimentaires en ligne. Montrez-leur les vôtres." />
      </div>
    </div>
  );
}
