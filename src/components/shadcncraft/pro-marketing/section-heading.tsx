import React from 'react';

interface SectionHeadingProps {
  alignment?: 'left' | 'center' | 'right';
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({
  alignment = 'left',
  children,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col gap-3 ${
        alignment === 'center'
          ? 'text-center items-center'
          : alignment === 'right'
            ? 'text-right items-end'
            : 'text-left items-start'
      } ${className || ''}`}
    >
      {children}
    </div>
  );
}

export function SectionHeadingTagline({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`text-xs font-semibold uppercase tracking-wider text-muted-foreground ${
        className || ''
      }`}
    >
      {children}
    </span>
  );
}

export function SectionHeadingTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-3xl font-bold tracking-tight text-foreground sm:text-4xl ${
        className || ''
      }`}
    >
      {children}
    </h2>
  );
}

export function SectionHeadingBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-base text-muted-foreground ${
        className || ''
      }`}
    >
      {children}
    </p>
  );
}
