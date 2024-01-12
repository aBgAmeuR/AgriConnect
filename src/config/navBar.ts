import { NavBtnBar, NavLinkBar } from '@/types';

export const navBarLinks: NavLinkBar = {
  visitor: [
    {
      title: 'Accueil',
      href: '/',
    },
    {
      title: 'Explorer',
      href: '/explore',
    },
  ],
  client: [
    {
      title: 'Accueil',
      href: '/',
    },
    {
      title: 'Explorer',
      href: '/explore',
    },
    {
      title: 'Messagerie',
      href: '/messages',
    },
  ],
  producer: [
    {
      title: 'Accueil',
      href: '/',
    },
    {
      title: 'Commandes',
      href: '/commands',
    },
    {
      title: 'Stock',
      href: '/stock',
    },
    {
      title: 'Messagerie',
      href: '/messages',
    },
  ],
  admin: [
    {
      title: 'Comptes',
      href: '/accounts',
    },
    {
      title: 'Messagerie',
      href: '/messages',
    },
  ],
};

export const navBarBtns: NavBtnBar = {
  visitor: [
    [
      {
        title: 'Espace Producteur',
        href: '/producer',
        variant: 'outline',
      },
      {
        title: 'Espace Client',
        href: '/',
        variant: 'outline',
      },
    ],
    {
      title: 'Connexion',
      href: '/login',
      variant: 'default',
    },
  ],
  client: [
    // {
    //   title: 'Mon panier',
    //   href: '/cart',
    //   variant: 'outline',
    // },
    {
      title: 'Mon compte',
      href: '/account',
      variant: 'default',
    },
  ],
  producer: [
    {
      title: 'Ma boutique',
      href: '/myshop',
      variant: 'outline',
    },
    {
      title: 'Mon compte',
      href: '/account',
      variant: 'default',
    },
  ],
  admin: [
    {
      title: 'Mon compte',
      href: '/account',
      variant: 'default',
    },
  ],
};
