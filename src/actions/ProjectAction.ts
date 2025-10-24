"use server";

// ADMIN ACTION

/* eslint-disable @typescript-eslint/no-explicit-any */
import { revalidateTag } from "next/cache";

// Get all Project
export const getAllProjects = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project`, {
            method: "GET",
            cache: "no-store",
            next: { tags: ["PROJECTS"] }
        });

        if (!res.ok) return [];
        return (await res.json())?.data || [];
    } catch {
        return [];
    }
};

// Admin: Get single project
export const getSingleProject = async (slug: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${slug}`);
        if (!res.ok) return null;
        return (await res.json())?.data || null;
    } catch {
        return null;
    }
};

// Create Project
export const createNewProject = async (data: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await res.json();
        if (result?.success) revalidateTag("PROJECTS");
        return result;
    } catch {
        return { success: false, message: "Failed to create project" };
    }
};

// Delete Project
export const deleteProject = async (id: number) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        const result = await res.json();
        if (result?.success) revalidateTag("PROJECTS");
        return result;
    } catch {
        return { success: false, message: "Failed to delete project" };
    }
};

// Update Project
export const updateProject = async (id: number, data: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await res.json();
        if (result?.success) revalidateTag("PROJECTS");
        return result;
    } catch {
        return { success: false, message: "Failed to update project" };
    }
};

// Public: Get Projects
export const getAllProjectsUser = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project`, {
            method: "GET",
            next: { revalidate: 30 },
            cache: "force-cache",
        });

        if (!res.ok) return [];
        return (await res.json())?.data || [];
    } catch {
        return [];
    }
};