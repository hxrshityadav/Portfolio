'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { type Project } from '@/types/project';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React, { useState } from 'react';

import ArrowRight from '../svgs/ArrowRight';
import Github from '../svgs/Github';
import PlayCircle from '../svgs/PlayCircle';
import Website from '../svgs/Website';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background transition-colors hover:border-border/80 hover:bg-muted/20">
      {/* Image with video overlay */}
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          src={project.image}
          alt={project.title}
          width={1920}
          height={1080}
        />
        {project.video && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button className="flex size-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/30">
                  <PlayCircle />
                </button>
              </div>
            </DialogTrigger>
            <DialogContent className="w-full max-w-4xl border-0 p-0">
              <div className="aspect-video w-full">
                <video
                  className="h-full w-full rounded-lg object-cover"
                  src={project.video}
                  autoPlay
                  loop
                  controls
                />
              </div>
              <DialogTitle className="sr-only">{project.title}</DialogTitle>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Title row */}
        <div className="flex items-start justify-between gap-3">
          <Link href={project.projectDetailsPageSlug ?? project.link} className="group/title">
            <h3 className="text-base font-semibold leading-snug group-hover/title:text-muted-foreground transition-colors">
              {project.title}
            </h3>
          </Link>

          {/* Icon links */}
          <div className="flex shrink-0 items-center gap-2">
            {project.link && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={project.link}
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Website className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent><p>Live site</p></TooltipContent>
              </Tooltip>
            )}

            {project.github && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={project.github}
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent><p>GitHub repo</p></TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Tech icons */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, i) => (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <div className="size-5 transition-transform hover:scale-110 cursor-pointer">
                  {tech.icon}
                </div>
              </TooltipTrigger>
              <TooltipContent><p>{tech.name}</p></TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Footer row */}
        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          {/* Status */}
          <span
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-medium ${
              project.isWorking
                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
                : 'bg-red-500/15 text-red-700 dark:text-red-400'
            }`}
          >
            <span
              className={`size-1.5 rounded-full ${
                project.isWorking ? 'bg-emerald-500' : 'bg-red-500'
              }`}
            />
            {project.isWorking ? 'Live' : 'In progress'}
          </span>

          {/* View details */}
          {project.details && (
            <Link
              href={project.projectDetailsPageSlug ?? project.link}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              View details <ArrowRight className="size-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
