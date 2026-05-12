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

import { socialLinks } from '@/config/Hero';
import {
  FileText,
  Home,
  Briefcase,
  FolderOpen,
  Mail,
  Sun,
  Moon,
  Search,
  Settings,
  Wrench,
  BookOpen,
  MapPin,
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
  { title: 'Go to Work', desc: 'View work experience', href: '/work-experience', icon: Briefcase, shortcut: 'W' },
  { title: 'Go to Blog', desc: 'Browse all blog posts', href: '/blog', icon: BookOpen, shortcut: 'B' },
  { title: 'Go to Resume', desc: 'View and download resume', href: '/resume', icon: FileText, shortcut: 'R' },
  { title: 'Go to Gears', desc: 'View hardware and equipment setup', href: '/gears', icon: Wrench, shortcut: 'G' },
  { title: 'Go to Books', desc: 'View recommended books and reading list', href: '/books', icon: BookOpen, shortcut: 'K' },
  { title: 'Go to Movies', desc: 'View favorite movies and shows', href: '/movies', icon: Video, shortcut: 'M' },
  { title: 'Go to Setup', desc: 'View development setup and tools', href: '/setup', icon: Settings, shortcut: 'S' },
  { title: 'Go to Terminal', desc: 'Terminal setup guide', href: '/terminal', icon: Terminal, shortcut: 'T' },
  { title: 'Go to Journey', desc: 'Overview of my learning and career journey', href: '/journey', icon: MapPin, shortcut: 'J' },
  { title: 'Go to Projects', desc: 'View all my projects', href: '/projects', icon: FolderOpen, shortcut: 'P' },
];

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const [recent, setRecent] = React.useState<string[]>([]);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    const saved = localStorage.getItem('recentCommands');
    if (saved) {
      try {
        setRecent(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
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
            navigator.clipboard.writeText('hxrshityadav@gmail.com');
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

  const runCommand = React.useCallback((command: () => void, title: string) => {
    setOpen(false);
    command();
    setRecent((prev) => {
      const newRecent = [title, ...prev.filter((t) => t !== title)].slice(0, 3);
      localStorage.setItem('recentCommands', JSON.stringify(newRecent));
      return newRecent;
    });
  }, []);

  const featureItems = [
    { title: 'Toggle Theme', desc: 'Switch between light and dark mode', icon: theme === 'dark' ? Sun : Moon, shortcut: 'T', action: () => setTheme(theme === 'dark' ? 'light' : 'dark') },
    { title: 'Command Palette', desc: 'Open the command palette', icon: Search, shortcut: 'Ctrl+K', action: () => setOpen(true) },
    { title: 'Scroll to Top', desc: 'Scroll to the top of the page', icon: ArrowUp, shortcut: 'Shift+↑', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
  ];

  const actionItems = [
    { title: 'Copy Email', desc: 'Copy email address to clipboard', icon: Mail, shortcut: 'Shift+E', action: () => navigator.clipboard.writeText('hxrshityadav@gmail.com') },
    { title: 'Share Page', desc: 'Share the current page', icon: Share2, shortcut: 'Shift+S', action: () => navigator.clipboard.writeText(window.location.href) },
    { title: 'View GitHub Profile', desc: 'Open GitHub profile in a new tab', icon: Code, shortcut: 'Shift+G', action: () => window.open('https://github.com/HxrshitYadav', '_blank') },
    { title: 'Open Spotify Song', desc: 'Open the currently playing Spotify song', icon: Music, shortcut: 'Shift+M', action: () => console.log('Spotify coming soon') },
    { title: 'Toggle Oneko Sleep', desc: 'Put the neko to sleep or wake it up', icon: Moon, shortcut: 'Ctrl+Z', action: () => console.log('Oneko sleep') },
    { title: 'Change Oneko Avatar', desc: 'Cycle to the next neko variant', icon: ImageIcon, shortcut: 'Ctrl+X', action: () => console.log('Oneko avatar') },
  ];

  const allItems = [
    ...navigationItems.map((item) => ({ ...item, action: () => router.push(item.href) })),
    ...featureItems,
    ...actionItems,
  ];

  const recentItems = recent.map((title) => allItems.find((i) => i.title === title)).filter(Boolean);

  const ItemShortcut = ({ shortcut }: { shortcut?: string }) => {
    if (!shortcut) return null;
    return (
      <CommandShortcut>
        <kbd className="bg-muted text-muted-foreground flex min-w-5 items-center justify-center rounded border border-border px-1.5 font-mono text-[10px] font-medium uppercase">
          {shortcut}
        </kbd>
      </CommandShortcut>
    );
  };

  const renderItem = (item: any) => (
    <CommandItem
      key={item.title}
      value={item.title}
      onSelect={() => runCommand(item.action, item.title)}
      className="py-3"
    >
      <item.icon className="mr-3 size-4 shrink-0" />
      <div className="flex flex-col gap-0.5">
        <span className="font-medium leading-none">{item.title}</span>
        <span className="text-xs text-muted-foreground">{item.desc}</span>
      </div>
      <ItemShortcut shortcut={item.shortcut} />
    </CommandItem>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-muted/50 px-3 text-sm text-muted-foreground shadow-sm transition-all hover:bg-muted hover:text-foreground cursor-pointer"
        aria-label="Search"
      >
        <Search className="size-3.5" />
        <kbd className="pointer-events-none inline-flex items-center gap-0.5 font-mono text-[11px] font-medium text-muted-foreground">
          Ctrl
        </kbd>
        <kbd className="pointer-events-none inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-background px-1 font-mono text-[11px] font-medium text-muted-foreground">
          K
        </kbd>
      </button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Command Menu"
        description="Search for pages, actions, and more..."
        showCloseButton={false}
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          {recentItems.length > 0 && (
            <>
              <CommandGroup heading="Recent">
                {recentItems.map(renderItem)}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}

          <CommandGroup heading="Navigation">
            {navigationItems.map((item) => renderItem({ ...item, action: () => router.push(item.href) }))}
          </CommandGroup>
          
          <CommandSeparator />
          
          <CommandGroup heading="Features">
            {featureItems.map(renderItem)}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Actions">
            {actionItems.map(renderItem)}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
