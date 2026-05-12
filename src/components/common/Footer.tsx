import { footerConfig } from '@/config/Footer';
import { Link } from 'next-view-transitions';
import React from 'react';
import Container from './Container';

import Github from '@/components/svgs/Github';
import Instagram from '@/components/svgs/Instagram';
import LinkedIn from '@/components/svgs/LinkedIn';
import Mail from '@/components/svgs/Mail';
import Medium from '@/components/svgs/Medium';
import X from '@/components/svgs/X';
import Youtube from '@/components/svgs/Youtube';
import Pinterest from '@/components/svgs/Pinterest';

const navigateLinks = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '/work-experience' },
  { name: 'Blog', href: '/blog' },
  { name: 'Resume', href: '/resume' },
  { name: 'Projects', href: '/projects' },
  { name: 'Gears', href: '/gears' },
  { name: 'Setup', href: '/setup' },
  { name: 'Terminal', href: '/terminal' },
  { name: 'Books', href: '/books' },
  { name: 'Movies', href: '/movies' },
  { name: 'RSS FEED', href: '/rss' },
];

const connectLinks = [
  { name: 'X', href: 'https://x.com/HxrshitYadav', icon: <X className="size-5" /> },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/HxrshitYadav', icon: <LinkedIn className="size-5" /> },
  { name: 'Github', href: 'https://github.com/HxrshitYadav', icon: <Github className="size-5" /> },
  { name: 'Youtube', href: 'https://youtube.com', icon: <Youtube className="size-5" /> },
  { name: 'Instagram', href: 'https://instagram.com/HxrshitYadav', icon: <Instagram className="size-5" /> },
  { name: 'Pinterest', href: 'https://pinterest.com', icon: <Pinterest className="size-5" /> },
  { name: 'Medium', href: 'https://medium.com/@HxrshitYadav', icon: <Medium className="size-5" /> },
  { name: 'Email', href: 'mailto:hxrshityadav@gmail.com', icon: <Mail className="size-5" /> },
];

export default function Footer() {
  return (
    <Container className="py-16">
      <div className="flex flex-col gap-16 sm:flex-row sm:justify-between">
        {/* Navigate Group */}
        <div className="flex-1 max-w-lg">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            NAVIGATE
          </h4>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            {navigateLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[15px] text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Connect Group */}
        <div className="sm:text-left">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            CONNECT
          </h4>
          <div className="mt-6 grid grid-cols-4 gap-3">
            {connectLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                className="flex size-[42px] items-center justify-center rounded-[10px] border border-border/50 bg-transparent text-muted-foreground transition-all hover:bg-muted/50 hover:text-foreground hover:border-border"
                aria-label={link.name}
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
        <p className="text-[14px] text-muted-foreground">
          &copy; {new Date().getFullYear()} {footerConfig.developer}. {footerConfig.copyright}
        </p>
        <p className="text-[14px] text-muted-foreground">
          You're the <span className="text-foreground font-medium">36,217th</span> visitor
        </p>
      </div>
    </Container>
  );
}
