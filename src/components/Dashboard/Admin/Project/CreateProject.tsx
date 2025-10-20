'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import React, { ChangeEvent, useState } from 'react';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { hostImages } from '@/utils/ImageUpload';
import { LoaderCircleIcon } from 'lucide-react';
import Image from 'next/image';
import { useUserInfo } from '@/utils/getUserInfo';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TProject } from '@/types/TProject';
import { Textarea } from '@/components/ui/textarea';
import { createNewProject } from '@/actions/ProjectAction';
import { string } from 'zod';

const CreateProject = () => {
    const [open, setOpen] = useState(false);
    const [projectBannerPreview, setProjectBannerPreview] = useState('');
    const [projectBanner, setProjectBanner] = useState<File[] | []>([]);
    const [projectContent, setProjectContent] = useState('');
    const [loading, setLoading] = useState(false);
    const { user, loading: userLoading, status } = useUserInfo()

    const { register, handleSubmit, control, reset } = useForm<TProject>({
        defaultValues: {
            title: "",
            description: "",
            thumbnail: "",
            liveUrl: "",
            repoUrl: "",
            features: [""],
        },
    });

    const handleModalClose = () => {
        setProjectBanner([]);
        setProjectBannerPreview('');
        setProjectContent('')
    };

    const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];

        setProjectBanner([file]);
        if (file) {
            setProjectBannerPreview('');
            const reader = new FileReader();

            reader.onloadend = () => {
                setProjectBannerPreview(reader.result as string);
            };

            reader.readAsDataURL(file);
        }
    };

    const onSubmit: SubmitHandler<TProject> = async (data) => {

        if (!projectContent || projectContent.trim() === '' || projectContent === '<p><br></p>') {
            toast.error('Please write some Project Description!');
            return;
        }

        if (projectBanner.length < 1) {
            return toast.error("Please select a Project banner Photo");
        }
        let thumbnail;
        setLoading(true)
        if (projectBanner) {
            const uploadPhoto = await hostImages(projectBanner);

            thumbnail = uploadPhoto[0];
        }

        data.features = data.features.toLocaleString().split(',')

        const payload = {
            ...data,
            description: projectContent,
            thumbnail: thumbnail,
            ownerId: user?.id
        }

        try {
            const result = await createNewProject(payload)
            if (result.success) {
                toast.success(result.massage || "Project created successfully");
                setProjectBanner([]);
                setProjectBannerPreview('');
                setProjectContent('')
                setOpen(false)
                setLoading(false)
                reset()
            }
            if (!result.success) {
                result?.errorSources?.map((error: { path: string, message: string }) => (
                    toast.error(error.message || result.message || "Project created Failed!")
                ))
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to create Project");
            setLoading(false)
        }
    }

    return (
        <div>
            <div>
                <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogTrigger asChild>
                        <Button className='hover:cursor-pointer' variant="outline" onClick={() => setOpen(true)}>Crete New Project</Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="sm:max-h-[min(640px,80vh)] sm:max-w-lg">
                        <AlertDialogTitle className='text-center text-2xl font-semibold border-b pb-2'>Crete Projects</AlertDialogTitle>
                        <AlertDialogHeader>
                            <div>
                                {
                                    projectBannerPreview.length > 0 && <Image className='mx-auto rounded-lg' width={200} height={100} src={projectBannerPreview} alt='banner image' />
                                }
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div>
                                        <label className='text-secondary-foreground/70 my-1'>Project Title</label>
                                        <Input {...register("title", { required: true })} />
                                    </div>

                                    <div className="*:not-first:mt-2">
                                        <label htmlFor='file' className='text-secondary-foreground/70 my-1'>Project Photo</label>
                                        <Input
                                            id='file'
                                            onChange={handlePhoto}
                                            className="px-2 mb-3 pe-3 file:me-3 file:border-0 file:border-e"
                                            type="file"
                                        />
                                    </div>

                                    <div>
                                        <label className='text-secondary-foreground/70 my-1'>Live URL</label>
                                        <Input {...register("liveUrl")} />
                                    </div>

                                    <div>
                                        <label className='text-secondary-foreground/70 my-1'>Repository URL</label>
                                        <Input {...register("repoUrl")} />
                                    </div>

                                    <div>
                                        <label className='text-secondary-foreground/70 my-1'>Features (comma separated)</label>
                                        <Textarea
                                            {...register("features")}
                                        />
                                    </div>
                                    <div>
                                        <label className='text-secondary-foreground/70 my-1'>Project Description</label>
                                        <ReactQuill
                                            theme="snow"
                                            value={projectContent}
                                            onChange={setProjectContent}
                                            placeholder="Write your Project content here..."
                                            style={{ height: "150px", marginBottom: "50px", borderRadius: "20px" }}
                                        />
                                    </div>
                                    <div className='flex gap-x-2 justify-end'>
                                        <AlertDialogCancel onClick={handleModalClose}>Cancel</AlertDialogCancel>
                                        {
                                            loading ?
                                                <Button disabled={loading} className='cursor-pointer'>
                                                    <LoaderCircleIcon
                                                        className="-ms-1 animate-spin"
                                                        size={16}
                                                        aria-hidden="true"
                                                    /> Create Project
                                                </Button> :
                                                <Button disabled={loading} type='submit' className='cursor-pointer'>Create Project</Button>
                                        }

                                    </div>
                                </form>
                            </div>
                        </AlertDialogHeader>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};

export default CreateProject;