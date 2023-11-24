import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Props = {
  current?: string;
  setNav: (nav: string) => void;
};

export const ProducerNav = ({ current, setNav }: Props) => {
  const items = [
    { name: 'A propos', href: 'a-propos' },
    { name: 'Boutique', href: 'boutique' },
    { name: 'Contact', href: 'contact' },
  ];

  return (
    <Card className="flex flex-row gap-6 px-6 py-3">
      {items.map((item, i) => (
        <p key={i} className={cn('text-sm text-muted-foreground hover:text-zinc-950 cursor-pointer', current == item.href ? 'text-zinc-950' : null)} onClick={() => setNav(item.href)}>
          {item.name}
        </p>
      ))}
    </Card>
  );
};
