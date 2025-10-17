
import {
    HomeIcon,
    NewspaperIcon,
    PresentationIcon,
    UserIcon
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Logo from "../../logo"
import ThemeToggle from "../../theme-toggle"
import UserMenu from "../../user-menu"
import Link from "next/link"
import LargeDeviceNavigation from "./LargeDeviceNavigation"
import SmallDeviceNavigation from "./SmallDeviceNavigation"
// Navigation links with icons for desktop icon-only navigation
export const navigationLinks = [
    { href: "/", label: "Home", icon: HomeIcon, active: true },
    { href: "/about", label: "About", icon: UserIcon },
    { href: "/blog", label: "Blog", icon: NewspaperIcon },
    { href: "/project", label: "Project", icon: PresentationIcon }
]

const Navbar = async () => {
    
    // const [hideNavbar, setHideNavbar] = useState(false);
    // const [scrollValue, setScrollValue] = useState(0);
    // const currentPage = usePathname();

    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (scrollValue < window.scrollY) {
    //             setHideNavbar(true);
    //         } else {
    //             setHideNavbar(false);
    //         }
    //         setScrollValue(window.scrollY);
    //     };

    //     window.addEventListener("scroll", handleScroll);

    //     return () => {
    //         window.removeEventListener("scroll", handleScroll);
    //     };
    // }, [scrollValue]);

    return (
        <div >
            <div className="relative">
                <header className=" bg-white/20 backdrop-blur-md md:px-6 absolute top-0 w-full">
                    <div className="flex bg-transparent h-16 items-center justify-between gap-4">
                        {/* Left side */}
                        <div className="flex items-center gap-2">
                            {/* Mobile menu trigger */}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        className="group size-8 md:hidden"
                                        variant="ghost"
                                        size="icon"
                                    >
                                        <svg
                                            className="pointer-events-none"
                                            width={16}
                                            height={16}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4 12L20 12"
                                                className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                                            />
                                            <path
                                                d="M4 12H20"
                                                className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                                            />
                                            <path
                                                d="M4 12H20"
                                                className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                                            />
                                        </svg>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent align="start" className="w-36 p-1 md:hidden">
                                    <NavigationMenu className="max-w-none *:w-full">
                                        <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                                            <SmallDeviceNavigation />
                                        </NavigationMenuList>
                                    </NavigationMenu>
                                </PopoverContent>
                            </Popover>
                            <div className="flex items-center gap-6">
                                {/* Logo */}
                                <Link href='/'>
                                    <Logo />
                                </Link>
                                {/* Desktop navigation - icon only */}

                            </div>
                        </div>
                        <div className=" px-5 py-2 rounded-full">
                            <NavigationMenu className="hidden md:flex">
                                <NavigationMenuList className="gap-2">
                                    <LargeDeviceNavigation />
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                        {/* Right side */}
                        <div className="flex items-center gap-2">
                            {/* Theme toggle */}
                            <ThemeToggle />
                            <UserMenu />
                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
};

export default Navbar;