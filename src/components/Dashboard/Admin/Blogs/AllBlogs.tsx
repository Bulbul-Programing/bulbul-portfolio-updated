
import { TBlog } from '@/types/TBlogs';
import Image from 'next/image';
import React, { } from 'react';
import BlogActionSection from './BlogActionSection';
import { getBlogs } from '@/utils/Blogs/getAllBlogs';
import CreateBlog from './CreateBlog';

const AllBlogs = async () => {
    const blogs = await getBlogs();
    console.log(blogs, 'in all blogs');
    // const [loading, setLoading] = useState(false);

    // // Fetch all blogs
    // const fetchBlogs = async () => {
    //     try {
    //         setLoading(true);
    //         const data = await getBlogs();
    //         setBlogs(data);
    //     } catch (err) {
    //         toast.error("Failed to fetch blogs");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchBlogs();
    // }, []);

    // // Callback after blog created
    // const handleBlogCreated = () => {
    //     fetchBlogs(); // 👈 auto-refresh after POST
    // };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <CreateBlog /> {/* 👈 Pass callback */}
            </div>


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
                            <td>{blog.title}</td>
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
    );
};

export default AllBlogs;