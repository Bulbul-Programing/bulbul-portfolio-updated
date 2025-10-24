"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { revalidateTag } from "next/cache";

// ADMIN Action

// Get all Blogs
export const getBlogs = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`, {
      method: "GET",
      cache: "no-store",
      next: { tags: ["BLOGS"] }
    });

    if (!res.ok) {
      console.error("❌ Failed to fetch blogs:", res.status);
      return [];
    }

    const text = await res.text();
    try {
      const data = JSON.parse(text);
      return data?.data || [];
    } catch {
      console.error("❌ Invalid JSON from blog API:", text);
      return [];
    }
  } catch (error) {
    console.error("❌ Error in getBlogs():", error);
    return [];
  }
};

// Admin: Get single blog by slug
export const getSingleBlogs = async (slug: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${slug}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) return null;

    const text = await res.text();
    return JSON.parse(text)?.data || null;
  } catch {
    return null;
  }
};

// Create Blog
export const createNewBlog = async (data: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result?.success) revalidateTag("BLOGS");
    return result;
  } catch (error) {
    console.log(error);
    return { success: false, message: "Server error while creating blog" };
  }
};

// Delete Blog
export const deleteBlog = async (id: number) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    if (result?.success) revalidateTag("BLOGS");
    return result;
  } catch {
    return { success: false, message: "Failed to delete blog" };
  }
};

// Update Blog
export const updateBlog = async (id: number, data: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result?.success) revalidateTag("BLOGS");
    return result;
  } catch {
    return { success: false, message: "Failed to update blog" };
  }
};

// Public: Get Blogs (Static Cached)
export const getAllBlogsUser = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`, {
      method: "GET",
      next: { revalidate: 30 },
      cache: "force-cache",
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data?.data || [];
  } catch {
    return [];
  }
};