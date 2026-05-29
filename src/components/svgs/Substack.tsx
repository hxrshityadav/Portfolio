'use client';
import React from 'react';

export default function Substack({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth="16"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Top bar */}
      <path d="M32 56h192" />
      {/* Middle bar */}
      <path d="M32 112h192" />
      {/* Bottom pointed ribbon shape */}
      <path d="M32 168h192l-96 56-96-56z" />
    </svg>
  );
}
