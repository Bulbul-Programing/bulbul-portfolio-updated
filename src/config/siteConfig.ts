export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "Bulbul Ahammed Portfolio",
    description:
        "Full-Stack Web Developer Md. Bulbul Ahammed – Expert in MERN stack, TypeScript, Redux, and modern web development with 3+ years of professional experience.",
    navItems: [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "Blog",
            href: "/blog",
        },
        {
            label: "About me",
            href: "/about",
        },
        {
            label: "Project",
            href: "/project",
        },
    ],
    navMenuItems: [
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            label: "Projects",
            href: "/dashboard/projects",
        },
        {
            label: "Blog",
            href: "/dashboard/blog",
        },
    ],
    links: {
        github: "https://github.com/heroui-inc/heroui",
        twitter: "https://twitter.com/hero_ui",
        docs: "https://heroui.com",
        discord: "https://discord.gg/9b6yyZKmH4",
        sponsor: "https://patreon.com/jrgarciadev",
    },
};
