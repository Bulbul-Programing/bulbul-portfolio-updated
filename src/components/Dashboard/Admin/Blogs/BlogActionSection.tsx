'use client'

import { TBlog } from "@/types/TBlogs";
import { FaEdit, FaRegEye, FaRegEyeSlash, FaRegTrashAlt } from "react-icons/fa";

const BlogActionSection = ({ blogInfo }: { blogInfo: TBlog }) => {

    const handleDeleteBlog = (id: number) => {

    }

    const handleUpdateBlogInfo = (id: number) => {

    }

    const updateBlogPublishStatus = (id: number, status: boolean) => {

    }
    return (
        <div className="flex">
            {blogInfo.published ? (
                <FaRegEye
                    className="text-[45px] px-3 rounded-md font-medium cursor-pointer hover:text-red-500 transition-all"
                    onClick={() =>
                        updateBlogPublishStatus(blogInfo.id, !blogInfo.published)
                    }
                />
            ) : (
                <FaRegEyeSlash
                    className="text-[45px] px-3 rounded-md font-medium cursor-pointer hover:text-red-500 transition-all"
                    onClick={() =>
                        updateBlogPublishStatus(blogInfo.id, !blogInfo.published)
                    }
                />
            )}
            <FaEdit
                className="text-[45px] px-3 rounded-md font-medium cursor-pointer hover:text-blue-500 transition-all"
                onClick={() => handleUpdateBlogInfo(blogInfo.id)}
            />
            <FaRegTrashAlt
                className="text-[40px] px-3 mt-[3px] rounded-md font-medium cursor-pointer hover:text-red-500 transition-all"
                onClick={() => handleDeleteBlog(blogInfo.id)}
            />
        </div>

    );
};

export default BlogActionSection;