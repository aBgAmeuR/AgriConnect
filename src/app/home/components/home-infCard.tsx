import React from 'react';

type InfoCardProps = {
  title: string;
  description: string;
};

export default function InfoCard({ title, description }: InfoCardProps) {
  return (
    <div className="w-[250px] h-[103px] text-center">
      {/* // TODO: Utilise un h2 */}
      <span className="block text-black text-base font-bold leading-tight">
        {title}
        {/* // TODO: Evite les <br /> dans le code, utilise plutôt du CSS */}
        <br />
      </span>
      {/* // TODO: Utilise un p */}
      <span className="block text-black text-sm font-normal leading-tight">{description}</span>
    </div>
  );
}
