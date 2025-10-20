import AllBlogs from '@/components/Dashboard/Admin/Blogs/AllBlogs';
import React from 'react';

const Blog = () => {
    return (
        <div>
            <h1 className="text-xl md:text-3xl lg:text-3xl mb-5 font-bold text-center py-4 bg-muted-foreground/10 rounded-md">
                Welcome to Blogs Page.
            </h1>
            <div>
                <AllBlogs />
            </div>
        </div>
    );
};

export default Blog;