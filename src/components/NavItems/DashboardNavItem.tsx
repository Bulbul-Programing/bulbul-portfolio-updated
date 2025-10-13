import { GoProjectTemplate } from "react-icons/go";
import { MdOutlineDashboard } from "react-icons/md";
import { RiBloggerLine } from "react-icons/ri";

export const adminDashboardNabItem = [
    {
        path: "/admin/dashboard",
        element: "Dashboard",
        icon: <MdOutlineDashboard />,
    },
    {
        path: "/admin/project",
        element: "Project",
        icon: <GoProjectTemplate />,
    },
    {
        path: "/admin/blog",
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