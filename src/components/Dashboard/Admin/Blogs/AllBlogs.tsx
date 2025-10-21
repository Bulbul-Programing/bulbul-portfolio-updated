import { TBlog } from '@/types/TBlogs';
import Image from 'next/image';
import React, { } from 'react';
import BlogActionSection from './BlogActionSection';
import CreateBlog from './CreateBlog';
import { getBlogs } from '@/actions/blogAction';

const AllBlogs = async () => {
    const blogs = await getBlogs();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <CreateBlog /> {/* 👈 Pass callback */}
            </div>
            <div className='overflow-x-auto'>
                <table className="min-w-full table-auto border-collapse shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-destructive text-secondary">
                        <tr>
                            <th className="px-2 min-w-8 py-3 text-left text-sm font-medium">Image</th>
                            <th className="py-3 min-w-80 ml-5 text-left text-sm font-medium">Title</th>
                            <th className="py-3 min-w-24 text-left text-sm font-medium">Status</th>
                            <th className="py-3 min-w-24 text-left text-sm font-medium">Date</th>
                            <th className="py-3 min-w-24 text-left text-sm font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs?.map((blog: TBlog) => (
                            <tr key={blog.id} className="border-b">
                                <td className="p-2">
                                    <Image
                                        alt={blog.title}
                                        src={blog.coverImage}
                                        width={50}
                                        height={50}
                                        className="rounded-md object-cover"
                                    />
                                </td>
                                <td>{blog.title.length > 45 ? (blog.title.length > 45 ? `${blog.title.slice(0, 45)} ...` : '') : blog.title}</td>
                                <td className={blog.published ? 'text-blue-500' : 'text-orange-500'}>
                                    {blog.published ? 'Published' : 'Blocked'}
                                </td>
                                <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                                <td className='max-w-[50px]'>
                                    <BlogActionSection blogInfo={blog} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AllBlogs;