import { getAllBlogsUser, getSingleBlogs } from '@/actions/blogAction';
import BlogDetails from '@/components/Blogs/BlogDetails';
import { TBlog } from '@/types/TBlogs';
import { Metadata } from 'next';
import React from 'react';

export async function generateStaticParams() {
    const blogData = await getAllBlogsUser()

    if (!Array.isArray(blogData.data)) {
        return [];
    }

    return blogData.blogs.map((blog: TBlog) => ({ slug: blog.slug })).slice(0, 10);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const blogData = await getSingleBlogs(slug)

    return {
        title: `${blogData.title}`,
        description: `${blogData.content}.`,
        openGraph: {
            images: [{ url: blogData.coverImage }],
        },
    };
}

export const revalidate = 60;

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