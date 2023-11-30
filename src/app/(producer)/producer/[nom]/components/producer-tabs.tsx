'use client';

import React from 'react';
import { ProducerNav } from './producer-nav';
import { ProducerData } from '@/types/producer';
import { ProducerAboutTab } from './producer-about-tab';
import ProducerContact from './producer-contact';
import { ProductsList } from './products-list';

type Props = {
  data: ProducerData;
};

export const ProducerTabs = ({ data }: Props) => {
  const [nav, setNav] = React.useState('a-propos');

  const goToBoutique = () => {
    setNav('boutique');
  };
  return (
    <div className="w-full">
      <ProducerNav current={nav} setNav={setNav} />
      {nav == 'a-propos' ? <ProducerAboutTab data={data} goToBoutique={goToBoutique} /> : null}
      {nav == 'boutique' ? (
        <div className="p-6">
          Boutique
          <ProductsList {...data} />
        </div>
      ) : null}
      {nav == 'contact' ? (
        <div className="p-6">
          Contact
          <ProducerContact data={data} />
        </div>
      ) : null}
    </div>
  );
};
