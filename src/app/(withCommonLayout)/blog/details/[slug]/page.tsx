import { getSingleBlogs } from '@/actions/blogAction';
import BlogDetails from '@/components/Blogs/BlogDetails';
import React from 'react';

const BlogDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params
    const blog = await getSingleBlogs(slug)
    if (!blog) {
        return <p>not found</p>
    }
    return (
        <div>
            < BlogDetails blog={blog} />
        </div>
    );
};

export default BlogDetailsPage;