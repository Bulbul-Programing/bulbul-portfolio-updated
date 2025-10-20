"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { revalidateTag } from "next/cache";

// Get all Project
export const getAllProjects = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project`, {
        method: "GET",
        next: {
            tags: ["PROJECTS"]
        }
    });
    const data = await res.json();
    return data.data;
};


// CREATE project
export const createNewProject = async (data: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result?.success) {
        revalidateTag("BLOGS")
    }

    return result;
};

// DELETE project
export const deleteProject = async (id: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();


    if (result?.success) {
        revalidateTag("BLOGS")
    }

    return result;
};

// UPDATE project
export const updateProject = async (id: number, data: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result?.success) {
        revalidateTag("BLOGS")
    }
    console.log('Result in Update Blog', result);
    return result;
};
