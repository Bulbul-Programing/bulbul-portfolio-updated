import { GoProjectTemplate } from "react-icons/go";
import { MdOutlineDashboard } from "react-icons/md";
import { RiBloggerLine } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";

export const OwnerDashboardNabItem = [
    {
        path: "/dashboard",
        element: "Dashboard",
        icon: <MdOutlineDashboard />,
    },
    {
        path: "/dashboard/project",
        element: "Project",
        icon: <GoProjectTemplate />,
    },
    {
        path: "/dashboard/blog",
        element: "Blog",
        icon: <RiBloggerLine />,
    },
    {
        path: "/",
        element: "Home",
        icon: <IoHomeOutline />,
    }
]