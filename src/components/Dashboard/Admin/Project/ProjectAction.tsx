'use client'

import { TProject } from '@/types/TProject';
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUserInfo } from "@/utils/getUserInfo";
import { hostImages } from "@/utils/ImageUpload";
import { CircleAlertIcon, LoaderCircleIcon } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, startTransition, useState } from "react";
import { FaEdit, FaRegEye, FaRegEyeSlash, FaRegTrashAlt } from "react-icons/fa";
import ReactQuill from "react-quill-new";
import { toast } from "sonner";
import { AlertDialogCancel } from '@/components/ui/alert-dialog';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { deleteProject, updateProject } from '@/actions/ProjectAction';

const ProjectAction = ({ projectInfo }: { projectInfo: TProject }) => {
    const [open, setOpen] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);

    // Update Project state
    const [projectBannerPreview, setProjectBannerPreview] = useState('');
    const [projectBanner, setProjectBanner] = useState<File[] | []>([]);
    const [projectContent, setProjectContent] = useState(projectInfo.description);
    const [loading, setLoading] = useState(false);
    const { user } = useUserInfo()

    const { register, handleSubmit, reset } = useForm<TProject>({
        defaultValues: {
            title: projectInfo.title,
            description: projectInfo.description,
            thumbnail: "",
            liveUrl: projectInfo.liveUrl,
            repoUrl: projectInfo.repoUrl,
            features: projectInfo.features,
        },
    });

    const handleModalClose = () => {
        setLoading(false)
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

    const handleDeleteProject = async () => {
        startTransition(async () => {
            const result = await deleteProject(projectInfo.id);
            if (result.success) {
                toast.success(result.message || 'Project deleted successfully!');
            } else {
                toast.error(result.message || 'Failed to delete Project');
            }
        });
    }

    const updateProjectPublishStatus = async (id: number, status: boolean) => {
        const payload = {
            isPublished: status
        }
        const result = await updateProject(projectInfo.id, payload);
        if (result.success) {
            toast.success(result.message || 'Project status update successfully!');
        } else {
            toast.error(result.message || 'Failed to Project status update');
        }
    }

    const onSubmit: SubmitHandler<TProject> = async (data) => {

        if (!projectContent || projectContent.trim() === '' || projectContent === '<p><br></p>') {
            toast.error('Please write some Project Description!');
            return;
        }

        let thumbnail;
        setLoading(true)
        if (projectBanner) {
            const uploadPhoto = await hostImages(projectBanner);

            thumbnail = uploadPhoto[0];
        }
        else {
            thumbnail = projectInfo.thumbnail
        }

        data.features = data.features.toLocaleString().split(',')

        const payload = {
            ...data,
            description: projectContent,
            thumbnail: thumbnail,
            ownerId: user?.id
        }
        console.log(payload);

        try {
            const result = await updateProject(projectInfo.id, payload)
            if (result.success) {
                toast.success(result.massage || "Project Update successfully");
                handleModalClose()
                setUpdateModal(false)
                reset()
            }
            if (!result.success) {
                result?.errorSources?.map((error: { path: string, message: string }) => (
                    toast.error(error.message || result.message || "Project Update Failed!")
                ))
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to Update Project");
            setLoading(false)
        }
    }

    return (
        <div>
            <div className="flex">
                {projectInfo.isPublished ? (
                    <FaRegEye
                        className="text-[32px] px-2 rounded-md font-medium cursor-pointer hover:text-red-500 transition-all"
                        onClick={() =>
                            updateProjectPublishStatus(projectInfo.id, !projectInfo.isPublished)
                        }
                    />
                ) : (
                    <FaRegEyeSlash
                        className="text-[32px] px-2 rounded-md font-medium cursor-pointer hover:text-red-500 transition-all"
                        onClick={() =>
                            updateProjectPublishStatus(projectInfo.id, !projectInfo.isPublished)
                        }
                    />
                )}
                <FaEdit
                    className="text-[32px] px-2 rounded-md font-medium cursor-pointer hover:text-blue-500 transition-all"
                    onClick={() => setUpdateModal(true)}
                />
                <FaRegTrashAlt
                    className="text-[31px] px-2 rounded-md font-medium cursor-pointer hover:text-red-500 transition-all"
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
                            onClick={handleDeleteProject}
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
                            projectBannerPreview.length > 0
                                ?
                                <Image className='mx-auto rounded-lg border shadow-xl mb-5' width={200} height={100} src={projectBannerPreview} alt='project image' />
                                :
                                <Image className='mx-auto rounded-lg border shadow-xl mb-5' width={200} height={100} src={projectInfo.thumbnail} alt='project image' />
                        }

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                            {/* Project Title */}
                            <div>
                                <label className="text-secondary-foreground/70 my-1">Project Title</label>
                                <Input
                                    defaultValue={projectInfo.title}
                                    {...register("title", { required: true })}
                                />
                            </div>

                            {/* Project Photo */}
                            <div className="*:not-first:mt-2">
                                <label htmlFor="file" className="text-secondary-foreground/70 my-1">Project Photo</label>
                                <Input
                                    id="file"
                                    onChange={handlePhoto}
                                    className="px-2 mb-3 pe-3 file:me-3 file:border-0 file:border-e"
                                    type="file"
                                />
                                <small className="text-xs text-muted-foreground">
                                    (Upload only if you want to change the image)
                                </small>
                            </div>

                            {/* Live URL */}
                            <div>
                                <label className="text-secondary-foreground/70 my-1">Live URL</label>
                                <Input defaultValue={projectInfo?.liveUrl} {...register("liveUrl")} />
                            </div>

                            {/* Repository URL */}
                            <div>
                                <label className="text-secondary-foreground/70 my-1">Repository URL</label>
                                <Input defaultValue={projectInfo?.repoUrl} {...register("repoUrl")} />
                            </div>

                            {/* Features */}
                            <div>
                                <label className="text-secondary-foreground/70 my-1">Features (comma separated)</label>
                                <Textarea
                                    defaultValue={projectInfo?.features?.join(", ")}
                                    {...register("features")}
                                />
                            </div>

                            {/* Project Description */}
                            <div>
                                <label className="text-secondary-foreground/70 my-1">Project Description</label>
                                <ReactQuill
                                    theme="snow"
                                    value={projectContent}
                                    onChange={setProjectContent}
                                    placeholder="Update your project description..."
                                    style={{ height: "150px", marginBottom: "80px", borderRadius: "20px" }}
                                />
                            </div>

                            {/* Buttons */}
                            <DialogFooter className="mt-2">
                                <DialogClose asChild>
                                    <Button onClick={handleModalClose} type="button" variant="outline" className="">
                                        Cancel
                                    </Button>
                                </DialogClose>

                                {loading ? (
                                    <Button disabled={loading} className="cursor-pointer">
                                        <LoaderCircleIcon className="-ms-1 animate-spin" size={16} aria-hidden="true" />
                                        Updating...
                                    </Button>
                                ) : (
                                    <Button type="submit" disabled={loading} className="cursor-pointer">
                                        Update Project
                                    </Button>
                                )}
                            </DialogFooter>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ProjectAction;