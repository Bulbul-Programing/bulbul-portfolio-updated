"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { revalidatePath, revalidateTag } from "next/cache";

// Get all Blogs
export const getBlogs = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`, {
    method: "GET",
    next: {
      tags: ["BLOGS"]
    }
  });
  const data = await res.json();
  return data.data;
};

// CREATE BLOG
export const createNewBlog = async (data: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/create`, {
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

// DELETE BLOG
export const deleteBlog = async (id: number) => {
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

// UPDATE BLOG
export const updateBlog = async (id: number, data: any) => {
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
