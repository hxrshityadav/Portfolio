import { navbarConfig } from '@/config/Navbar';
import { Link } from 'next-view-transitions';
import React from 'react';

import { CommandMenu } from './CommandMenu';
import Container from './Container';
import { ThemeToggleButton } from './ThemeSwitch';

export default function Navbar() {
  return (
    <Container className="sticky top-0 z-20 py-4 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        {/* Left: Nav Links only */}
        <nav className="flex items-center gap-6">
          {navbarConfig.navItems.map((item) => (
            <Link
              className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
              key={item.label}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: Command Search + Theme Toggle */}
        <div className="flex items-center gap-3">
          <CommandMenu />
          <ThemeToggleButton variant="circle" start="top-right" blur />
        </div>
      </div>
    </Container>
  );
}
