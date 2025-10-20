import { GoProjectTemplate } from "react-icons/go";
import { MdOutlineDashboard } from "react-icons/md";
import { RiBloggerLine } from "react-icons/ri";

export const adminDashboardNabItem = [
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
    }
]

export const OwnerDashboardNabItem = [
    {
        path: "/owner/dashboard",
        element: "Dashboard",
        icon: <MdOutlineDashboard />,
    }
]