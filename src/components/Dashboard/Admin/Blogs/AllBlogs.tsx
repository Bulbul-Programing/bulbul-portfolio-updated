import { TBlog } from '@/types/TBlogs';
import Image from 'next/image';
import React from 'react';
import { FaEdit, FaRegEye, FaRegEyeSlash, FaRegTrashAlt } from 'react-icons/fa';
import BlogActionSection from './BlogActionSection';

const AllBlogs = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`, {
        method: "GET",
        credentials: "include",
    })

    const result = await response.json();

    return (
        <div>
            <table className="min-w-full table-auto border-collapse shadow-md rounded-lg overflow-hidden">
                <thead className="bg-destructive text-secondary">
                    <tr>
                        <th className="px-2 py-3 text-left text-sm font-medium">Image</th>
                        <th className="py-3 text-left text-sm font-medium">Blog Title</th>
                        <th className="py-3 text-left text-sm font-medium">Status</th>
                        <th className="py-3 text-left text-sm font-medium">
                            Publish Date
                        </th>
                        <th className="py-3 text-left text-sm font-medium">Category</th>
                        <th className="py-3 text-center text-sm font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {result?.data?.map((blog: TBlog) => (
                        <tr
                            key={blog.id}
                            className="border-b last:border-none hover:bg-gray-50 transition"
                        >
                            <td className="p-2">
                                <Image
                                    alt={blog.title}
                                    className="w-10 h-10 object-cover rounded-full shadow-md"
                                    height={50}
                                    src={blog.coverImage}
                                    width={50}
                                />
                            </td>
                            <td className="min-w-44 py-2 font-semibold">
                                {blog.title}
                            </td>
                            <td
                                className={`${blog.published ? "text-blue-500" : "text-orange-500"} font-bold`}
                            >
                                {blog.published ? "Published" : "Block"}
                            </td>
                            <td className="min-w-32 py-2 font-semibold">
                                {new Date(blog.createdAt).toLocaleDateString()}
                            </td>
                            <td className="min-w-32 py-2 font-semibold">{blog.id}</td>
                            <td className=" flex items-center justify-center">
                                <BlogActionSection blogInfo={blog} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllBlogs;