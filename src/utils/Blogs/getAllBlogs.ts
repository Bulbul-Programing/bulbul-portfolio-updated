export const getBlogs = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`, {
        method: "GET",
        next : {
            tags : ["BLOGS"]
        }
    });
    const data = await res.json();
    return data.data;
};