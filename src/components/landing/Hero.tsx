'use client';

import { heroConfig, socialLinks } from '@/config/Hero';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React, { useState } from 'react';

import Container from '../common/Container';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export default function Hero() {
  const { name, title, avatar } = heroConfig;
  const [copied, setCopied] = useState(false);

  const email = 'hxrshityadav@gmail.com';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <Container className="mx-auto max-w-5xl">
      {/* Profile Header */}
      <div className="flex items-center gap-5">
        {/* Avatar */}
        <Image
          src={avatar}
          alt={name}
          width={100}
          height={100}
          className="size-[72px] shrink-0 rounded-full object-cover ring-2 ring-border"
        />

        {/* Name + Subtitle */}
        <div className="flex flex-col gap-0.5">
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            {name}
          </h1>
          <div className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <span>{title}</span>
            <span className="text-muted-foreground/40">·</span>
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1 transition-colors hover:text-foreground cursor-pointer"
            >
              {email}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-3.5 opacity-50"
              >
                {copied ? (
                  <path
                    fillRule="evenodd"
                    d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                    clipRule="evenodd"
                  />
                ) : (
                  <path
                    d="M5.5 3.5A1.5 1.5 0 0 1 7 2h5.5A1.5 1.5 0 0 1 14 3.5v7a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 10.5v-7ZM2 5.5A1.5 1.5 0 0 1 3.5 4v.5H10v7H3.5A1.5 1.5 0 0 1 2 10V5.5Z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bio */}
      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
        Building apps, content, and systems while documenting my journey in
        tech, fitness, and entrepreneurship. Passionate about creating impactful
        digital products, growing a personal brand, and turning ideas into
        scalable businesses.
      </p>

      {/* Social Links Row */}
      <div className="mt-4 flex items-center gap-3">
        {socialLinks.map((link) => (
          <Tooltip key={link.name} delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href={link.href}
                target="_blank"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="size-[18px] block">{link.icon}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{link.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </Container>
  );
}
