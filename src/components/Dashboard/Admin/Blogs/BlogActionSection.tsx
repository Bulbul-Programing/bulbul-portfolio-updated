'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TBlog } from "@/types/TBlogs";
import { CircleAlertIcon } from "lucide-react";
import React, { useState } from "react";
import { FaEdit, FaRegEye, FaRegEyeSlash, FaRegTrashAlt } from "react-icons/fa";

const BlogActionSection = ({ blogInfo }: { blogInfo: TBlog }) => {
    const [open, setOpen] = useState(false);

    const handleDeleteBlog = (id: number) => {
        setOpen(true)
    }

    const handleUpdateBlogInfo = (id: number) => {

    }

    const updateBlogPublishStatus = (id: number, status: boolean) => {

    }
    return (
        <div>
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
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <div className="flex flex-col items-center gap-2">
                        <div
                            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                            aria-hidden="true"
                        >
                            <CircleAlertIcon className="opacity-80" size={16} />
                        </div>
                        <DialogHeader>
                            <DialogTitle className="sm:text-center">
                                Final confirmation
                            </DialogTitle>
                            <DialogDescription className="sm:text-center">
                                This action cannot be undone. To confirm, please enter the project
                                name <span className="text-foreground">coss.com</span>.
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline" className="flex-1">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="button"
                            className="flex-1"
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>


    );
};

export default BlogActionSection;