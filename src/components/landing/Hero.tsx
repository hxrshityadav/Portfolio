'use client';

import { heroConfig, socialLinks } from '@/config/Hero';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useState } from 'react';

import Container from '../common/Container';

export default function Hero() {
  const { name, title, avatar } = heroConfig;
  const [copied, setCopied] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);

  const titles = title.split(' • ');

  useEffect(() => {
    if (titles.length <= 1) return;
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [titles.length]);

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
      {/* ── Mac-style window chrome ── */}
      <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
        {/* Title bar */}
        <div className="flex items-center border-b border-border bg-muted/50 px-4 py-3">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-full bg-[#ff5f57]" />
            <span className="size-3 rounded-full bg-[#febc2e]" />
            <span className="size-3 rounded-full bg-[#28c840]" />
          </div>
        </div>

        {/* Window body — the actual hero content */}
        <div className="p-6 sm:p-8">
          {/* Profile Header */}
          <div className="flex items-start gap-5">
            {/* Avatar */}
            <div className="relative shrink-0">
              <Image
                src={avatar}
                alt={name}
                width={88}
                height={88}
                className="size-[80px] rounded-xl object-cover ring-1 ring-border"
              />
            </div>

            {/* Name + Meta */}
            <div className="flex flex-col gap-1 pt-0.5">
              {/* Name row with verified badge */}
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  {name}
                </h1>
                {/* Verified badge */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="size-5 shrink-0 text-blue-500"
                  aria-label="Verified"
                >
                  <circle cx="12" cy="12" r="12" fill="currentColor" />
                  <path
                    d="M7 12.5l3.5 3.5L17 9"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Title / roles */}
              <div className="flex h-6 items-center text-sm text-muted-foreground font-mono">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={titleIndex}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {titles[titleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Status indicator */}
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <span className="relative flex size-2 shrink-0">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-green-500" />
                </span>
                <span>
                  status:{' '}
                  <span className="font-medium text-foreground">open to work</span>
                </span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Building apps, content, and systems while documenting my journey in
            tech, fitness, and entrepreneurship. Passionate about creating
            impactful digital products, growing a personal brand, and turning
            ideas into scalable businesses.
          </p>

          {/* Social Links — pill-button grid */}
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {socialLinks.filter((l) => l.name !== 'Email').map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-150 hover:border-border hover:bg-muted hover:text-foreground"
              >
                <span className="size-[16px] shrink-0 transition-transform duration-150 group-hover:scale-110">
                  {link.icon}
                </span>
                <span>{link.name}</span>
              </Link>
            ))}

            {/* Email copy button */}
            <button
              onClick={handleCopyEmail}
              className="group flex items-center justify-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-150 hover:border-border hover:bg-muted hover:text-foreground cursor-pointer"
            >
              <span className="size-[16px] shrink-0 transition-transform duration-150 group-hover:scale-110">
                {copied ? (
                  <svg viewBox="0 0 16 16" fill="currentColor" className="size-full text-green-400">
                    <path
                      fillRule="evenodd"
                      d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 16 16" fill="currentColor" className="size-full">
                    <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h5.5A1.5 1.5 0 0 1 14 3.5v7a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 10.5v-7ZM2 5.5A1.5 1.5 0 0 1 3.5 4v.5H10v7H3.5A1.5 1.5 0 0 1 2 10V5.5Z" />
                  </svg>
                )}
              </span>
              <span className={copied ? 'text-green-400' : ''}>
                {copied ? 'Copied!' : 'Email'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
