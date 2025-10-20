'use client'

import { deleteBlog, updateBlog } from "@/actions/blogAction";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TBlog } from "@/types/TBlogs";
import { useUserInfo } from "@/utils/getUserInfo";
import { hostImages } from "@/utils/ImageUpload";
import { CircleAlertIcon, LoaderCircleIcon } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, startTransition, useState } from "react";
import { FaEdit, FaRegEye, FaRegEyeSlash, FaRegTrashAlt } from "react-icons/fa";
import ReactQuill from "react-quill-new";
import { toast } from "sonner";

const BlogActionSection = ({ blogInfo }: { blogInfo: TBlog }) => {
    const [open, setOpen] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);

    // Update Blog state
    const [blogBannerPreview, setBlogBannerPreview] = useState('');
    const [blogBanner, setBlogBanner] = useState<File[] | []>([]);
    const [blogContent, setBlogContent] = useState(blogInfo.content);
    const [blogTitle, setBlogTitle] = useState(blogInfo.title);
    const [loading, setLoading] = useState(false);
    const { user } = useUserInfo()


    const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];

        setBlogBanner([file]);
        if (file) {
            setBlogBannerPreview('');
            const reader = new FileReader();

            reader.onloadend = () => {
                setBlogBannerPreview(reader.result as string);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleDeleteBlog = async () => {
        startTransition(async () => {
            const result = await deleteBlog(blogInfo.id);
            if (result.success) {
                toast.success(result.message || 'Blog deleted successfully!');
            } else {
                toast.error(result.message || 'Failed to delete blog');
            }
        });
    }

    const handleUpdateBlogInfo = async () => {
        if (blogTitle.length < 1) {
            return toast.error("Please set Blog Title")
        }

        if (!blogContent || blogContent.trim() === '' || blogContent === '<p><br></p>') {
            toast.error('Please write some blog content!');
            return;
        }

        let coverImage;
        setLoading(true)
        if (blogBanner) {
            const uploadPhoto = await hostImages(blogBanner);

            coverImage = uploadPhoto[0];
        }

        const payload = {
            content: blogContent,
            coverImage,
            title: blogTitle
        }

        try {
            const result = await updateBlog(blogInfo.id, payload)

            if (result.success) {
                toast.success(result.massage || "Blog update successfully");
                // onBlogCreated?.();
                setBlogBanner([]);
                setBlogBannerPreview('');
                setBlogTitle('')
                setUpdateModal(false)
                setLoading(false)
            }
            if (!result.success) {
                toast.error(result.massage || "Blog update Failed!");

            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update blog");
            setLoading(false)
        }
    }

    const updateBlogPublishStatus = async (id: number, status: boolean) => {
        const payload = {
            published: status
        }
        const result = await updateBlog(blogInfo.id, payload);
        if (result.success) {
            toast.success(result.message || 'Blog status update successfully!');
        } else {
            toast.error(result.message || 'Failed to blog status update');
        }
    }
    return (
        <div>
            <div className="flex">
                {blogInfo.published ? (
                    <FaRegEye
                        className="text-[45px] px-2 rounded-md font-medium cursor-pointer hover:text-red-500 transition-all"
                        onClick={() =>
                            updateBlogPublishStatus(blogInfo.id, !blogInfo.published)
                        }
                    />
                ) : (
                    <FaRegEyeSlash
                        className="text-[45px] px-2 rounded-md font-medium cursor-pointer hover:text-red-500 transition-all"
                        onClick={() =>
                            updateBlogPublishStatus(blogInfo.id, !blogInfo.published)
                        }
                    />
                )}
                <FaEdit
                    className="text-[45px] px-2 rounded-md font-medium cursor-pointer hover:text-blue-500 transition-all"
                    onClick={() => setUpdateModal(true)}
                />
                <FaRegTrashAlt
                    className="text-[40px] px-2 mt-[3px] rounded-md font-medium cursor-pointer hover:text-red-500 transition-all"
                    onClick={() => setOpen(true)}
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
                                This action cannot be undone.
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
                            onClick={handleDeleteBlog}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={updateModal} onOpenChange={setUpdateModal}>
                <DialogContent>
                    <div>
                        {
                            blogBannerPreview.length > 0
                                ?
                                <Image className='mx-auto rounded-lg' width={200} height={100} src={blogBannerPreview} alt='banner image' />
                                :
                                <Image className='mx-auto rounded-lg' width={200} height={100} src={blogInfo.coverImage} alt='banner image' />
                        }
                        <Label className='text-secondary-foreground/70 my-1'>Blog Title</Label>
                        <Input
                            onChange={(e) => setBlogTitle(e.target.value)}
                            defaultValue={blogInfo.title}
                            placeholder='Blog Title'
                            className="p-2 mb-3 pe-3 file:me-3 file:border-0 file:border-e"
                        />
                        <Label className='text-secondary-foreground/70 my-1'>Blog Thamniale</Label>
                        <Input
                            onChange={handlePhoto}
                            className="px-2 mb-3 pe-3 file:me-3 file:border-0 file:border-e"
                            type="file"
                        />
                        <Label className='text-secondary-foreground/70 my-1'>Blog Content</Label>
                        <ReactQuill
                            theme="snow"
                            value={blogContent}
                            onChange={setBlogContent}
                            placeholder="Write your blog content here..."
                            style={{ height: "150px", marginBottom: "50px", borderRadius: "20px"}}
                        />
                    </div>
                    <DialogFooter className="mt-2">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" className="">
                                Cancel
                            </Button>
                        </DialogClose>
                        {
                            loading ?
                                <Button disabled={loading} className='cursor-pointer '>
                                    <LoaderCircleIcon
                                        className="-ms-1 animate-spin"
                                        size={16}
                                        aria-hidden="true"
                                    /> Create Blog
                                </Button> :
                                <Button disabled={loading} onClick={handleUpdateBlogInfo} className='cursor-pointer'>Update Blog</Button>
                        }
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>


    );
};

export default BlogActionSection;