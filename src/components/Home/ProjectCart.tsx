'use client'
import { TProject } from '@/types/TProject';
import { PlayCircle } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { LuGithub } from "react-icons/lu";

const ProjectCart = ({ project, index }: { project: TProject, index: number }) => {
    return (
        // <Tilt
        //     glareEnable={true}
        //     glareMaxOpacity={0.1}
        //     glareBorderRadius="1rem"
        //     scale={0.93}
        //     transitionSpeed={2000}
        //     className="w-full"

        // >
        <motion.div
            initial={{
                opacity: 0,
                y: 60 + (index * 20),
            }}
            viewport={{ once: true }}
            whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                    duration: 1,
                },
            }}
            key={index}
        >
            <div className="
                    relative p-[2px] rounded-2xl 
                    bg-[linear-gradient(135deg,var(--primary)_10%,var(--chart-1)_30%,var(--accent)_50%)]
                    hover:shadow-[0px_0px_30px_var(--primary)/40] transition duration-500
                ">
                <div
                    className="
                    bg-background/80 dark:bg-background/80 backdrop-blur-xl 
                    rounded-2xl border border-border/50 overflow-hidden
                    shadow-lg hover:shadow-2xl transition-all duration-500
                "
                >
                    {/* Image */}
                    <div className="relative w-full h-56 overflow-hidden group">
                        <Image
                            src={project.thumbnail}
                            alt={project.title}
                            fill
                            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent opacity-0 group-hover:opacity-50 transition-all duration-500"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {/* Title */}
                        <h3 className="hidden lg:block text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                            {project.title.length > 34 ? (project.title.length > 34 ? `${project.title.slice(0, 34)} ...` : '') : project.title}
                        </h3>
                        <h3 className="block lg:hidden text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                            {project.title.length > 28 ? (project.title.length > 28 ? `${project.title.slice(0, 28)} ...` : '') : project.title}
                        </h3>

                        {/* Description */}
                        <p
                            className="text-muted-foreground text-sm mt-2 line-clamp-3 hidden lg:block"
                            dangerouslySetInnerHTML={{ __html: project.description?.length > 93 ? (project.description?.length > 93 ? `${project.description?.slice(0, 93)} ...` : '') : project.description }}
                        />
                        <p
                            className="text-muted-foreground text-sm mt-2 line-clamp-3 block lg:hidden"
                            dangerouslySetInnerHTML={{ __html: project.description?.length > 75 ? (project.description?.length > 75 ? `${project.description?.slice(0, 75)} ...` : '') : project.description }}
                        />

                        {/* Features */}
                        <div className="flex flex-col gap-2 mt-3">
                            {project.features?.slice(0, 3).map((feature: string, i: number) => (
                                <span
                                    key={i}
                                    className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                                >
                                    {feature}
                                </span>
                            ))}
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between items-center mt-5">
                            {project.liveUrl && (
                                <Link
                                    href={project.liveUrl}
                                    target="_blank"
                                    className="flex border hover:border-primary/20 px-3 py-1 rounded-md items-center gap-1 text-sm font-medium hover:text-primary transition-colors"
                                >
                                    <PlayCircle size={18} /> Live Website
                                </Link>
                            )}
                            {project.repoUrl && (
                                <Link
                                    href={project.repoUrl}
                                    target="_blank"
                                    className="flex border hover:border-primary/20 px-3 py-1 rounded-md items-center gap-1 text-sm font-medium hover:text-primary transition-colors"
                                >
                                    <LuGithub size={18} /> Code
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </motion.div >
    );
};

export default ProjectCart;