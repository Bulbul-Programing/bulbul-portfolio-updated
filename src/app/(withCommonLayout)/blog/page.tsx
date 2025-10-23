import { getAllBlogsUser } from "@/actions/blogAction";
import BlogsSection from "@/components/Blogs/BlogsSection";

const Blog = async () => {
    const blogs = await getAllBlogsUser()
    return (
        <div>
            <BlogsSection blogs={blogs} />
        </div>
    );
};

export default Blog;