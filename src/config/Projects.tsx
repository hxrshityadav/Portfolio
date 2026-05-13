import JavaScript from '@/components/technologies/JavaScript';
import ReactIcon from '@/components/technologies/ReactIcon';
import TailwindCss from '@/components/technologies/TailwindCss';
import Java from '@/components/technologies/Java';
import SpringBoot from '@/components/technologies/SpringBoot';
import { Database } from 'lucide-react';
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    title: 'AI Resume Builder',
    description:
      'A powerful AI-driven resume builder that helps users craft professional resumes instantly.',
    image: '/placeholder.png',
    link: 'https://resumate-olive.vercel.app/',
    technologies: [
      { name: 'JavaScript', icon: <JavaScript key="javascript" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'Java', icon: <Java key="java" /> },
      { name: 'Spring Boot', icon: <SpringBoot key="springboot" /> },
      { name: 'SupaBase', icon: <Database className="size-4" key="supabase" /> },
    ],
    github: 'https://github.com/hxrshityadav/ResuMate',
    live: 'https://resumate-olive.vercel.app/',
    details: false,
    projectDetailsPageSlug: '/projects/ai-resume-builder',
    isWorking: true,
  },
  {
    title: 'URL Shortner',
    description:
      'A blazing fast URL shortener service built with a robust Spring Boot backend.',
    image: '/placeholder.png',
    technologies: [
      { name: 'JavaScript', icon: <JavaScript key="javascript" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Java', icon: <Java key="java" /> },
      { name: 'Spring Boot', icon: <SpringBoot key="springboot" /> },
    ],
    details: false,
    projectDetailsPageSlug: '/projects/url-shortner',
    isWorking: false,
  },
];
