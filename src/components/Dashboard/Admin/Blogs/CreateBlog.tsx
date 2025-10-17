'use client'
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import z from 'zod';
import { toast } from 'sonner';
import React, { ChangeEvent, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import Modal from '@/components/Modal';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Label } from '@/components/ui/label';
import { hostImages } from '@/utils/ImageUpload';
import { LoaderCircleIcon } from 'lucide-react';
import Image from 'next/image';
import { revalidateTag } from 'next/cache';
import { useUserInfo } from '@/utils/getUserInfo';
import { createNewBlog } from '@/actions/create';

const formSchema = z.object({
    title: z.string().min(3, { message: 'Title is required' }),
    slug: z.string().min(3, { message: 'Slug is required' }),
    excerpt: z.string().optional(),
    content: z.string({ message: 'Content is required' }),
    coverImage: z.instanceof(File),
    published: z.boolean(),
});

interface CreateBlogProps {
    onBlogCreated?: () => void;
}


const CreateBlog: React.FC<CreateBlogProps> = ({ onBlogCreated }) => {
    const [open, setOpen] = useState(false);
    const [blogBannerPreview, setBlogBannerPreview] = useState('');
    const [blogBanner, setBlogBanner] = useState<File[] | []>([]);
    const [blogContent, setBlogContent] = useState('');
    const [blogTitle, setBlogTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const { user, loading: userLoading, status } = useUserInfo()

    const handleModalClose = () => {
        setBlogBanner([]);
        setBlogBannerPreview('');
    };

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

    const handleSubmit = async () => {

        if (blogTitle.length < 1) {
            return toast.error("Please set Blog Title")
        }

        if (!blogContent || blogContent.trim() === '' || blogContent === '<p><br></p>') {
            toast.error('Please write some blog content!');
            return;
        }

        if (blogBanner.length < 1) {
            return toast.error("Please select a blog banner Photo");
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
            title: blogTitle,
            authorId: user?.id
        }


        try {
            const result = await createNewBlog(payload)
            console.log(result);
            if (result.success) {
                toast.success(result.massage || "Blog created successfully");
                onBlogCreated?.();
                setBlogBanner([]);
                setBlogBannerPreview('');
                setBlogTitle('')
                setOpen(false)
                setLoading(false)
            }
            if (!result.success) {
                toast.error(result.massage || "Blog created Failed!");

            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to create blog");
            setLoading(false)
        }
    }

    return (
        <div>
            <div>
                <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogTrigger asChild>
                        <Button className='hover:cursor-pointer' variant="outline" onClick={() => setOpen(true)}>Add Blog</Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="sm:max-h-[min(640px,80vh)] sm:max-w-lg">
                        <AlertDialogHeader>
                            {
                                blogBannerPreview.length > 0 && <Image className='mx-auto rounded-lg' width={200} height={100} src={blogBannerPreview} alt='banner image' />
                            }
                            <Label className='text-secondary-foreground/70 my-1'>Blog Title</Label>
                            <Input
                                onChange={(e) => setBlogTitle(e.target.value)}
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
                                style={{ height: "150px", marginBottom: "50px", borderRadius: "20px" }}
                            />
                            <div className='flex gap-x-2 justify-end'>
                                <AlertDialogCancel onClick={handleModalClose}>Cancel</AlertDialogCancel>
                                {
                                    loading ?
                                        <Button disabled={loading} onClick={handleSubmit} className='cursor-pointer'>
                                            <LoaderCircleIcon
                                                className="-ms-1 animate-spin"
                                                size={16}
                                                aria-hidden="true"
                                            /> Create Blog
                                        </Button> :
                                        <Button disabled={loading} onClick={handleSubmit} className='cursor-pointer'>Create Blog</Button>
                                }

                            </div>
                        </AlertDialogHeader>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>

    );
};

export default CreateBlog;