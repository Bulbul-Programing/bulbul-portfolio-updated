'use client'
import React from 'react';
import { navigationLinks } from './Navbar';
import { NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { TooltipTrigger, Tooltip } from '@/components/ui/tooltip';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const LargeDeviceNavigation = () => {
    const pathName = usePathname()
    return (
        <>
            {navigationLinks.map((link) => (
                <NavigationMenuItem key={link.label}>
                    <NavigationMenuLink
                        asChild
                        className={`${pathName === link.href && 'bg-sidebar-accent'} flex items-center justify-center p-1.5`}
                    >
                        <Link href={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            ))}
        </>
    );
};

export default LargeDeviceNavigation;