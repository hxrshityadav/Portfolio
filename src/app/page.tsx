import Container from '@/components/common/Container';

import Blog from '@/components/landing/Blog';
import Github from '@/components/landing/Github';
import Hero from '@/components/landing/Hero';
import Skills from '@/components/landing/Skills';
import Work from '@/components/landing/Projects';
import Setup from '@/components/landing/Setup';
import React from 'react';

export default function page() {
  return (
    <Container className="min-h-screen pt-24 pb-16">
      <Hero />
      <Work />

      <Github />
      <Skills />
      <Blog />
      <Setup />
    </Container>
  );
}
