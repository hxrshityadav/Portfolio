export interface NavItem {
  label: string;
  href: string;
}

export const navbarConfig = {
  logo: {
    src: '/assets/logo.png',
    alt: 'Harshit Yadav',
    width: 100,
    height: 100,
  },
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
    {
      label: 'Blog',
      href: '/blog',
    },
    {
      label: 'Resume',
      href: '/resume',
    },
    {
      label: 'Contact',
      href: '/contact',
    },
  ] as NavItem[],
};
