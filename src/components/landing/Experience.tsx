import { type Experience, experiences } from '@/config/Experience';
import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';

import Container from '../common/Container';
import { Button } from '../ui/button';

function ExperienceListItem({ experience }: { experience: Experience }) {
  return (
    <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-start sm:justify-between">
      {/* Left Side */}
      <div className="flex items-start gap-3">
        <Image
          src={experience.image}
          alt={experience.company}
          width={40}
          height={40}
          className={cn(
            'size-10 rounded-md mt-0.5',
            experience.isBlur && 'blur-[4px]',
          )}
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3
              className={cn(
                'font-semibold text-sm',
                experience.isBlur ? 'blur-[4px]' : 'blur-none',
              )}
            >
              {experience.company}
            </h3>
            {experience.isCurrent && (
              <div className="flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400">
                <div className="size-1.5 animate-pulse rounded-full bg-green-500"></div>
                Working
              </div>
            )}
          </div>
          <p className="text-muted-foreground text-sm">{experience.position}</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="text-muted-foreground mt-1 flex flex-col text-right text-xs sm:mt-0">
        <p>
          {experience.startDate} -{' '}
          {experience.isCurrent ? 'Present' : experience.endDate}
        </p>
        <p>{experience.location}</p>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <Container className="mt-16">
      <h2 className="text-lg font-bold tracking-tight">Experience</h2>
      <div className="mt-3 divide-y divide-border">
        {experiences.slice(0, 3).map((experience: Experience) => (
          <ExperienceListItem
            key={experience.company}
            experience={experience}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Button variant="outline" size="sm" className="text-xs">
          <Link href="/work-experience">Show all work experiences</Link>
        </Button>
      </div>
    </Container>
  );
}
