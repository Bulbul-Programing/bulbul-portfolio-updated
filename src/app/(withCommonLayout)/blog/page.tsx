import { getAllBlogsUser } from "@/actions/blogAction";
import BlogsSection from "@/components/Blogs/BlogsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description: "Read insights and tutorials by Md. Bulbul Ahammed, Full-Stack Web Developer. Explore articles on MERN stack, Next.js, TypeScript, and modern web development."
};

const Blog = async () => {
    const blogs = await getAllBlogsUser()
    return (
        <div>
            <BlogsSection blogs={blogs} />
        </div>
    );
};

export default Blog;