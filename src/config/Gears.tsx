import Keyboard from '@/components/svgs/devices/Keyboard';
import Laptop from '@/components/svgs/devices/Laptop';
import Monitor from '@/components/svgs/devices/Monitor';
import Mouse from '@/components/svgs/devices/Mouse';
import { Lightbulb } from 'lucide-react';

export const devices = [
  {
    name: 'Asus Vivobook S15',
    href: 'https://amzn.to/4nUfxRo',
    icon: <Laptop className="size-4" />,
  },
  {
    name: 'BenQ GW2490 Monitor',
    href: 'https://amzn.to/43CY1b6',
    icon: <Monitor className="size-4" />,
  },
  {
    name: 'Aula F75 Keyboard',
    href: 'https://amzn.to/49wdld4',
    icon: <Keyboard className="size-4" />,
  },
  {
    name: 'Amkette XS Flow Mouse',
    href: 'https://amzn.to/43GVegY',
    icon: <Mouse className="size-4" />,
  },
  {
    name: 'Quntis Monitor Light Bar',
    href: 'https://amzn.to/4331RKs',
    icon: <Lightbulb className="size-4" />,
  },
];

export const webExtensions = [
  { name: 'Unhook', href: 'https://unhook.app/' },
  { name: 'uBlock Origin', href: 'https://ublockorigin.com/' },
  {
    name: 'React Developer Tools',
    href: 'https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en',
  },
  { name: 'daily.dev', href: 'https://daily.dev/' },
  { name: 'Grammarly', href: 'https://www.grammarly.com/' },
  { name: 'Wappalyzer', href: 'https://www.wappalyzer.com/' },
  {
    name: 'ColorZilla',
    href: 'https://chromewebstore.google.com/detail/colorzilla/bhlhnicpbhignbdhedgjhgdocnmhomnp?hl=en',
  },
];

export const software = [
  { name: 'Dia', href: 'https://www.diabrowser.com/' },
  { name: 'Notion', href: 'https://www.notion.so/desktop' },
  { name: 'TickTick', href: 'https://ticktick.com/download' },
  { name: 'OBS Studio', href: 'https://obsproject.com/' },
  { name: 'VLC', href: 'https://www.videolan.org/vlc/' },
  { name: 'Ghostty', href: 'https://ghostty.org/' },
];
