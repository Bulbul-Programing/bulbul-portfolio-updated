"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createNewBlog = async (data : any) => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log('result', result);
    if (result?.id) {
        revalidateTag("BLOGS");
        revalidatePath("/blogs");
        redirect("/");
    }
    return result;
};
