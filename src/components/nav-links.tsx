'use client';
import { usePathname } from 'next/navigation';
import { Search, Home, FolderClosed, Layers, Users, Grid, Clock, Palette, BriefcaseBusiness } from 'lucide-react'

import clsx from 'clsx';
import { Link } from '@/components/ui/link';


// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const hubLinks = [
  { name: 'Creatives', href: '/dashboard/creative', icon: Palette },
  { name: 'Brand Kits', href: '/dashboard/brand-kit', icon: BriefcaseBusiness },
  { name: 'Audiences', href: '/dashboard/audience', icon: Users },
  { name: 'Products', href: '/dashboard/product', icon: Grid },
];

const MainLinks = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Projects', href: '/dashboard/projects', icon: FolderClosed },
];


export function HubNavLinks() {
  const pathname = usePathname();
  return (
    <>
      {hubLinks.map((link) => {
        const LinkIcon = link.icon;
        return (
            <Link variant="ghost" key={link.name} href={link.href} className="w-full justify-start gap-2">
                <LinkIcon className="h-4 w-4" />
                <p className="hidden md:block">{link.name}</p>
            </Link>
        );
      })}
    </>
  );
}

export function MainNavLinks() {
  const pathname = usePathname();
  return (
    <>
      {MainLinks.map((link) => {
        const LinkIcon = link.icon;
        return (
            <Link variant="ghost" key={link.name} href={link.href} className="w-full justify-start gap-2 mb-2">
                <LinkIcon className="h-4 w-4" />
                <p className="hidden md:block">{link.name}</p>
            </Link>
        );
      })}
    </>
  );
}
