import React from 'react';

interface SectionHeadingProps {
  subHeading?: string;
  heading: string;
}

export default function SectionHeading({
  subHeading,
  heading,
}: SectionHeadingProps) {
  return (
    <div>
      {subHeading && (
        <p className="text-muted-foreground text-xs uppercase tracking-wider">
          {subHeading}
        </p>
      )}
      <h2 className="text-lg font-bold tracking-tight">{heading}</h2>
    </div>
  );
}
