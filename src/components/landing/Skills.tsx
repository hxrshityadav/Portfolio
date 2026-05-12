import { Link } from 'next-view-transitions';
import React from 'react';

import Container from '../common/Container';

// Import icons
import BootStrap from '../technologies/BootStrap';
import Firebase from '../technologies/Firebase';
import Github from '../technologies/Github';
import Java from '../technologies/Java';
import JavaScript from '../technologies/JavaScript';
import NextJs from '../technologies/NextJs';
import PostgreSQL from '../technologies/PostgreSQL';
import Postman from '../technologies/Postman';
import ReactIcon from '../technologies/ReactIcon';
import SpringBoot from '../technologies/SpringBoot';
import TailwindCss from '../technologies/TailwindCss';
import TypeScript from '../technologies/TypeScript';
import Vercel from '../technologies/Vercel';

// Icon box component
function SkillBox({ children, href, name }: { children: React.ReactNode; href?: string; name: string }) {
  const content = (
    <div
      className="flex size-12 items-center justify-center rounded-xl border border-dashed border-border bg-card shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
      title={name}
    >
      <div className="size-6">{children}</div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} target="_blank">
        {content}
      </Link>
    );
  }

  return content;
}

export default function Skills() {
  return (
    <Container className="mt-16">
      <h2 className="text-2xl font-bold tracking-tight">Skills & Tools</h2>

      <div className="mt-8 flex flex-col gap-8">
        {/* Frontend */}
        <div>
          <h3 className="mb-4 text-base font-medium text-muted-foreground">
            Frontend
          </h3>
          <div className="flex flex-wrap gap-3">
            <SkillBox name="JavaScript" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
              <JavaScript />
            </SkillBox>
            <SkillBox name="TypeScript" href="https://www.typescriptlang.org/">
              <TypeScript />
            </SkillBox>
            <SkillBox name="React" href="https://react.dev/">
              <ReactIcon />
            </SkillBox>
            <SkillBox name="Next.js" href="https://nextjs.org/">
              <NextJs />
            </SkillBox>
            <SkillBox name="Tailwind CSS" href="https://tailwindcss.com/">
              <TailwindCss />
            </SkillBox>
            <SkillBox name="Bootstrap" href="https://getbootstrap.com/">
              <BootStrap />
            </SkillBox>
          </div>
        </div>

        {/* Backend */}
        <div>
          <h3 className="mb-4 text-base font-medium text-muted-foreground">
            Backend
          </h3>
          <div className="flex flex-wrap gap-3">
            <SkillBox name="Java" href="https://www.java.com/">
              <Java />
            </SkillBox>
            <SkillBox name="Spring Boot" href="https://spring.io/projects/spring-boot">
              <SpringBoot />
            </SkillBox>
            <SkillBox name="Firebase" href="https://firebase.google.com/">
              <Firebase />
            </SkillBox>
            <SkillBox name="PostgreSQL" href="https://www.postgresql.org/">
              <PostgreSQL />
            </SkillBox>
          </div>
        </div>

        {/* Tools & Infrastructure */}
        <div>
          <h3 className="mb-4 text-base font-medium text-muted-foreground">
            Tools & Infrastructure
          </h3>
          <div className="flex flex-wrap gap-3">
            <SkillBox name="GitHub" href="https://github.com/">
              <Github />
            </SkillBox>
            <SkillBox name="Postman" href="https://www.postman.com/">
              <Postman />
            </SkillBox>
            <SkillBox name="Vercel" href="https://vercel.com/">
              <Vercel />
            </SkillBox>
          </div>
        </div>
      </div>
    </Container>
  );
}
