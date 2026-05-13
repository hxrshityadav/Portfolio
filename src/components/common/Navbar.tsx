'use client';

import { heroConfig } from '@/config/Hero';
import { navbarConfig } from '@/config/Navbar';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { CommandMenu } from './CommandMenu';
import { ThemeToggleButton } from './ThemeSwitch';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = navbarConfig.navItems.filter((i) => i.href !== '/');

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center">
      <nav
        className="pointer-events-auto mx-auto flex items-center"
        style={{
          width: '100%',
          maxWidth: scrolled ? '500px' : '768px', // 768px matches max-w-3xl of the content Container
          borderRadius: scrolled ? '9999px' : '0px',
          padding: scrolled ? '6px 12px' : '14px 16px', // Removed horizontal padding when expanded to perfectly align with content
          marginTop: scrolled ? '14px' : '0px',
          backgroundColor: scrolled ? 'hsl(var(--background) / 0.9)' : 'transparent',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.25), inset 0 0 0 1px hsl(var(--border))' : 'none',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          justifyContent: 'space-between',
          gap: scrolled ? '8px' : '0',
          transition: [
            'max-width 700ms cubic-bezier(0.4,0,0.2,1)',
            'border-radius 700ms cubic-bezier(0.4,0,0.2,1)',
            'padding 700ms cubic-bezier(0.4,0,0.2,1)',
            'margin-top 700ms cubic-bezier(0.4,0,0.2,1)',
            'background-color 700ms cubic-bezier(0.4,0,0.2,1)',
            'box-shadow 700ms cubic-bezier(0.4,0,0.2,1)',
            'gap 700ms cubic-bezier(0.4,0,0.2,1)',
          ].join(', '),
        }}
      >
        {/* Left group — avatar + nav links */}
        <div
          className="flex items-center"
          style={{
            gap: scrolled ? '4px' : '24px',
            transition: 'gap 700ms cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {/* Avatar — home button */}
          <Link href="/" className="shrink-0">
            <Image
              src={heroConfig.avatar}
              alt="Home"
              width={40}
              height={40}
              style={{
                width: scrolled ? '28px' : '40px',
                height: scrolled ? '28px' : '40px',
                boxShadow: scrolled
                  ? '0 0 0 2px hsl(var(--border))'
                  : '0 0 0 2px hsl(var(--border)), 0 0 0 4px hsl(var(--background))',
                transition: [
                  'width 700ms cubic-bezier(0.4,0,0.2,1)',
                  'height 700ms cubic-bezier(0.4,0,0.2,1)',
                  'box-shadow 700ms cubic-bezier(0.4,0,0.2,1)',
                ].join(', '),
              }}
              className="rounded-full object-cover hover:opacity-80 transition-opacity duration-200"
            />
          </Link>

          {/* Nav links */}
          {links.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                fontSize: scrolled ? '12px' : '14px',
                padding: scrolled ? '3px 8px' : '0',
                transition: [
                  'font-size 700ms cubic-bezier(0.4,0,0.2,1)',
                  'padding 700ms cubic-bezier(0.4,0,0.2,1)',
                ].join(', '),
              }}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right group — search + theme */}
        <div
          className="flex items-center"
          style={{
            gap: scrolled ? '4px' : '12px',
            transition: 'gap 700ms cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {/* Divider only shows in pill state now, or we can just remove it. Let's remove it for a cleaner look matching the new grouping. */}
          <CommandMenu />
          <ThemeToggleButton variant="circle" start="top-right" blur />
        </div>
      </nav>
    </header>
  );
}
