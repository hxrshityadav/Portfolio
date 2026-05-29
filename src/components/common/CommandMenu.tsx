'use client';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';

import {
  FileText,
  Home,
  FolderOpen,
  Mail,
  Sun,
  Moon,
  Search,
  Settings,
  Wrench,
  BookOpen,
  Terminal,
  Video,
  ArrowUp,
  Share2,
  Code,
  Music,
  Image as ImageIcon,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import * as React from 'react';

const navigationItems = [
  { title: 'Go to Home', desc: 'Navigate to the homepage', href: '/', icon: Home, shortcut: 'H' },
  { title: 'Go to Blog', desc: 'Browse all blog posts', href: '/blog', icon: BookOpen, shortcut: 'B' },
  { title: 'Go to Resume', desc: 'View and download resume', href: '/resume', icon: FileText, shortcut: 'R' },
  { title: 'Go to Gears', desc: 'View hardware and equipment setup', href: '/gears', icon: Wrench, shortcut: 'G' },
  { title: 'Go to Books', desc: 'View recommended books and reading list', href: '/books', icon: BookOpen, shortcut: 'K' },
  { title: 'Go to Movies', desc: 'View favorite movies and shows', href: '/movies', icon: Video, shortcut: 'M' },
  { title: 'Go to Setup', desc: 'View development setup and tools', href: '/setup', icon: Settings, shortcut: 'S' },
  { title: 'Go to Terminal', desc: 'Terminal setup guide', href: '/terminal', icon: Terminal, shortcut: 'T' },
  { title: 'Go to Projects', desc: 'View all my projects', href: '/projects', icon: FolderOpen, shortcut: 'P' },
];

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === '/') {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
          return;
        }
        e.preventDefault();
        setOpen((open) => !open);
        return;
      }
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (!e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey) {
        switch (e.key.toLowerCase()) {
          case 'h': router.push('/'); break;
          case 'w': router.push('/work-experience'); break;
          case 'b': router.push('/blog'); break;
          case 'r': router.push('/resume'); break;
          case 'g': router.push('/gears'); break;
          case 'k': router.push('/books'); break;
          case 'm': router.push('/movies'); break;
          case 's': router.push('/setup'); break;
          case 't': setTheme(theme === 'dark' ? 'light' : 'dark'); break;
          case 'j': router.push('/journey'); break;
          case 'p': router.push('/projects'); break;
        }
      }
      if (e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey) {
        switch (e.key) {
          case 'ArrowUp':
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            break;
          case 'E':
            e.preventDefault();
            navigator.clipboard.writeText('hello@harshityadav.dev');
            break;
          case 'S':
            e.preventDefault();
            navigator.clipboard.writeText(window.location.href);
            break;
          case 'G':
            e.preventDefault();
            window.open('https://github.com/HxrshitYadav', '_blank');
            break;
        }
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [router, setTheme, theme]);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  const featureItems = [
    { title: 'Toggle Theme', desc: 'Switch between light and dark mode', icon: theme === 'dark' ? Sun : Moon, shortcut: 'T', action: () => setTheme(theme === 'dark' ? 'light' : 'dark') },
    { title: 'Command Palette', desc: 'Open the command palette', icon: Search, shortcut: '/', action: () => setOpen(true) },
    { title: 'Scroll to Top', desc: 'Scroll to the top of the page', icon: ArrowUp, shortcut: 'Shift+↑', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
  ];

  const actionItems = [
    { title: 'Copy Email', desc: 'Copy email address to clipboard', icon: Mail, shortcut: 'Shift+E', action: () => navigator.clipboard.writeText('hello@harshityadav.dev') },
    { title: 'Share Page', desc: 'Share the current page', icon: Share2, shortcut: 'Shift+S', action: () => navigator.clipboard.writeText(window.location.href) },
    { title: 'View GitHub Profile', desc: 'Open GitHub profile in a new tab', icon: Code, shortcut: 'Shift+G', action: () => window.open('https://github.com/HxrshitYadav', '_blank') },
    { title: 'Open Spotify Song', desc: 'Open the currently playing Spotify song', icon: Music, shortcut: 'Shift+M', action: () => console.log('Spotify coming soon') },
    { title: 'Toggle Oneko Sleep', desc: 'Put the neko to sleep or wake it up', icon: Moon, shortcut: 'Ctrl+Z', action: () => console.log('Oneko sleep') },
    { title: 'Change Oneko Avatar', desc: 'Cycle to the next neko variant', icon: ImageIcon, shortcut: 'Ctrl+X', action: () => console.log('Oneko avatar') },
  ];

  const ItemShortcut = ({ shortcut }: { shortcut?: string }) => {
    if (!shortcut) return null;
    return (
      <CommandShortcut className="opacity-70">
        <kbd className="bg-neutral-800 text-neutral-400 flex min-w-5 items-center justify-center rounded border border-neutral-700/60 px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase">
          {shortcut}
        </kbd>
      </CommandShortcut>
    );
  };

  const renderItem = (item: { title: string; desc?: string; icon: React.ElementType; shortcut?: string; action: () => void }) => (
    <CommandItem
      key={item.title}
      value={item.title}
      onSelect={() => runCommand(item.action)}
      className="py-3 px-3 mx-1 my-0.5 rounded-lg cursor-pointer flex items-center gap-3 data-[selected=true]:bg-neutral-800/60 data-[selected=true]:text-white text-neutral-300"
    >
      <item.icon className="size-4 shrink-0 text-neutral-500" />
      <div className="flex flex-col gap-0.5 w-full">
        <span className="font-semibold text-[14px] leading-tight">{item.title}</span>
        {item.desc && <span className="text-[11px] text-neutral-500 font-medium leading-none">{item.desc}</span>}
      </div>
      <ItemShortcut shortcut={item.shortcut} />
    </CommandItem>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex h-10 items-center gap-2.5 rounded-full border border-border/50 bg-transparent px-3 text-sm text-muted-foreground transition-all duration-300 hover:bg-accent/50 hover:text-accent-foreground active:scale-95 cursor-pointer"
        aria-label="Search"
      >
        <Search className="size-4" />
        <div className="flex items-center gap-1">
          <kbd className="pointer-events-none inline-flex h-6 min-w-6 items-center justify-center rounded bg-muted/80 px-2 font-sans text-[12px] font-medium text-muted-foreground">
            /
          </kbd>
        </div>
      </button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Command Menu"
        description="Search for pages, actions, and more..."
        showCloseButton={false}
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="py-2">
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigation">
            {navigationItems.map((item) => renderItem({ ...item, action: () => router.push(item.href) }))}
          </CommandGroup>
          
          <CommandSeparator className="my-1.5 bg-neutral-800/80" />
          
          <CommandGroup heading="Features">
            {featureItems.map(renderItem)}
          </CommandGroup>

          <CommandSeparator className="my-1.5 bg-neutral-800/80" />

          <CommandGroup heading="Actions">
            {actionItems.map(renderItem)}
          </CommandGroup>
        </CommandList>

        {/* Custom Footer */}
        <div className="flex items-center justify-between border-t border-neutral-800/80 px-4 py-2.5 bg-neutral-900/40 text-[11px] text-neutral-500 font-medium select-none">
          <div className="flex items-center gap-1.5">
            <kbd className="flex h-5 min-w-8 items-center justify-center rounded border border-neutral-800 bg-neutral-900 px-1.5 font-mono text-[9px] text-neutral-400">
              Esc
            </kbd>
            <span>Exit</span>
          </div>
          <div className="flex items-center gap-1.5 mr-auto ml-6">
            <kbd className="flex h-5 min-w-5 items-center justify-center rounded border border-neutral-800 bg-neutral-900 px-1.5 font-mono text-[9px] text-neutral-400">
              ↵
            </kbd>
            <span>Go to Page</span>
          </div>
          <div className="flex items-center">
            {/* Custom Resend-style logo icon */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-neutral-600 hover:text-neutral-400 transition-colors"
            >
              <path d="M4 18h16a1 1 0 001-1V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1zM2 7a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7z" fillRule="evenodd" clipRule="evenodd" />
              <path d="M5 9h14v2H5V9zm0 4h10v2H5v-2z" />
            </svg>
          </div>
        </div>
      </CommandDialog>
    </>
  );
}
