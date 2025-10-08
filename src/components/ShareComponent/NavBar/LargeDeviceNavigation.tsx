'use client'
import React from 'react';
import { navigationLinks } from './Navbar';
import { NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { TooltipTrigger, Tooltip } from '@/components/ui/tooltip';
import { usePathname } from 'next/navigation';

const LargeDeviceNavigation = () => {
    const pathName = usePathname()
    return (
        <>
            {navigationLinks.map((link) => (
                <NavigationMenuItem key={link.label}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <NavigationMenuLink
                                href={link.href}
                                className={`${pathName === link.href && 'bg-sidebar-accent'} flex items-center justify-center p-1.5`}
                            >
                                <p className="font-semibold">{link.label}</p>
                                <span className="sr-only">{link.label}</span>
                            </NavigationMenuLink>
                        </TooltipTrigger>
                    </Tooltip>
                </NavigationMenuItem>
            ))}
        </>
    );
};

export default LargeDeviceNavigation;