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

const formSchema = z.object({
    title: z.string().min(3, { message: 'Title is required' }),
    slug: z.string().min(3, { message: 'Slug is required' }),
    excerpt: z.string().optional(),
    content: z.string().min(10, { message: 'Content must be at least 10 characters' }),
    coverImage: z.string().url({ message: 'Cover image must be a valid URL' }),
    published: z.boolean(),
});

const CreateBlog = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [blogBannerPreview, setBlogBannerPreview] = useState<string[] | []>([]);
    const [blogBanner, setBlogBanner] = useState<File[] | []>([]);
    const route = useRouter();
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            slug: '',
            excerpt: '',
            content: '',
            coverImage: '',
            published: false
        },
    });

    const handleModalClose = () => {
        setBlogBanner([]);
        setBlogBannerPreview([]);
    };

    const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];

        setBlogBanner([file]);
        if (file) {
            setBlogBannerPreview([]);
            const reader = new FileReader();

            reader.onloadend = () => {
                setBlogBannerPreview((prev) => [...prev, reader.result as string]);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        console.log(blogBanner);
        // try {
        //     const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        //         method: "POST",
        //         headers: {
        //             'Content-Type': "application/json"
        //         },
        //         body: JSON.stringify(data),
        //         credentials: "include",
        //     })

        //     const result = await response.json();

        //     if (result.success) {
        //         toast.success(result.massage || "")
        //         route.push('/')
        //     }

        //     if (!result.success) {
        //         toast.error(result.message || "")
        //     }

        // } catch (error) {
        //     console.log(error);
        // }
    }
    console.log(value);
    return (
        <div>
            <div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline">Add Blog</Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="sm:max-h-[min(640px,80vh)] sm:max-w-lg">
                        <AlertDialogHeader>
                            <Label className='text-secondary-foreground/70 my-2'>Blog Thamniale</Label>
                            <Input
                                onChange={handlePhoto}
                                className="p-0 pe-3 file:me-3 file:border-0 file:border-e"
                                type="file"
                            />
                            <Label className='text-secondary-foreground/70 my-2'>Blog Content</Label>
                            <ReactQuill

                                theme="snow"
                                value={value}
                                onChange={setValue}
                                placeholder="Write your blog content here..."
                                style={{ height: "200px", marginBottom: "80px", borderRadius: "20px" }}
                            />
                            <div className='flex gap-x-2 justify-end'>
                                <AlertDialogCancel onClick={handleModalClose}>Cancel</AlertDialogCancel>
                                <Button onClick={handleSubmit} className='cursor-pointer'>Click me</Button>
                            </div>
                        </AlertDialogHeader>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>

    );
};

export default CreateBlog;