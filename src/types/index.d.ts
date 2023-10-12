export type NavLinkItem = {
  title: string;
  href: string;
};

export type NavLinkBar = {
  visitor: NavLinkItem[];
  client: NavLinkItem[];
  producer: NavLinkItem[];
  admin: NavLinkItem[];
};

export type NavBtnItem = {
  title: string;
  href: string;
  variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  disabled?: boolean;
};

export type NavBtnBar = {
  visitor: [NavBtnItem[], NavBtnItem];
  client: NavBtnItem[];
  producer: NavBtnItem[];
  admin: NavBtnItem[];
};

export type SiteConfig = {
  name: string;
  description: string;
};