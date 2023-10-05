export type NavLinkItem = {
  title: string;
  href: string;
};

export type NavLinkBar = {
  visitor: NavItem[];
  client: NavItem[];
  producer: NavItem[];
  admin: NavItem[];
};

export type NavBtnItem = {
  title: string;
  href: string;
  variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  disabled?: boolean;
};

export type NavBtnBar = {
  visitor: NavBtnItem[];
  client: NavBtnItem[];
  producer: NavBtnItem[];
  admin: NavBtnItem[];
};
