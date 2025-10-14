export const getBlogs = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`, {
        method: "GET",
        credentials: "include",
        cache: "no-store", // 👈 important for fresh data
    });
    const data = await res.json();
    return data.data;
};