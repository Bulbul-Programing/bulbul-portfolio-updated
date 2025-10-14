'use client'
import { TBlog } from '@/types/TBlogs';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaRegEye, FaRegEyeSlash, FaRegTrashAlt } from 'react-icons/fa';
import BlogActionSection from './BlogActionSection';
import { toast } from 'sonner';
import { getBlogs } from '@/utils/Blogs/getAllBlogs';
import CreateBlog from './CreateBlog';

const AllBlogs =  () => {
    const [blogs, setBlogs] = useState<TBlog[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch all blogs
    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const data = await getBlogs();
            setBlogs(data);
        } catch (err) {
            toast.error("Failed to fetch blogs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    // Callback after blog created
    const handleBlogCreated = () => {
        fetchBlogs(); // 👈 auto-refresh after POST
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <CreateBlog onBlogCreated={handleBlogCreated} /> {/* 👈 Pass callback */}
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="min-w-full table-auto border-collapse shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-destructive text-secondary">
                        <tr>
                            <th className="px-2 py-3 text-left text-sm font-medium">Image</th>
                            <th className="py-3 text-left text-sm font-medium">Title</th>
                            <th className="py-3 text-left text-sm font-medium">Status</th>
                            <th className="py-3 text-left text-sm font-medium">Date</th>
                            <th className="py-3 text-left text-sm font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs?.map((blog) => (
                            <tr key={blog.id} className="border-b hover:bg-gray-50">
                                <td className="p-2">
                                    <Image
                                        alt={blog.title}
                                        src={blog.coverImage}
                                        width={50}
                                        height={50}
                                        className="rounded-md object-cover"
                                    />
                                </td>
                                <td>{blog.title}</td>
                                <td className={blog.published ? 'text-blue-500' : 'text-orange-500'}>
                                    {blog.published ? 'Published' : 'Blocked'}
                                </td>
                                <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <BlogActionSection blogInfo={blog} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllBlogs;