'use client'
import { ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { FiGithub } from 'react-icons/fi';

interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    thumbnail: string;
    liveUrl: string;
    repoUrl: string;
    features: string[];
}
const ProjectsSection = ({ projects }: { projects: Project[] }) => {
    return (
        <section className="py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                My <span className="text-primary">Projects</span>
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="
                            bg-card 
                            text-card-foreground 
                            rounded-2xl 
                            shadow-lg 
                            overflow-hidden 
                            border 
                            border-border 
                            hover:shadow-xl 
                            transition
                            "
                    >
                        <Image
                            src={project.thumbnail}
                            alt={project.title}
                            width={500}
                            height={200}
                            className="w-full h-48 object-cover"
                        />

                        <Link href={`/project/${project.slug}`} >
                            {/* Title */}
                            <div className="p-6 space-y-4">
                                <h3 className="hidden lg:block text-xl font-bold tracking-tight">
                                    {project.title.length > 34
                                        ? `${project.title.slice(0, 34)}...`
                                        : project.title}
                                </h3>
                                <h3 className="block lg:hidden text-xl font-bold tracking-tight">
                                    {project.title.length > 28
                                        ? `${project.title.slice(0, 28)}...`
                                        : project.title}
                                </h3>

                                {/* Description */}
                                <p
                                    className="text-muted-foreground text-sm line-clamp-3 hidden lg:block"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            project.description.length > 93
                                                ? `${project.description.slice(0, 93)}...`
                                                : project.description,
                                    }}
                                />
                                <p
                                    className="text-muted-foreground text-sm line-clamp-3 block lg:hidden"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            project.description.length > 75
                                                ? `${project.description.slice(0, 75)}...`
                                                : project.description,
                                    }}
                                />

                                {/* Features */}
                                <ul className="text-sm text-muted-foreground space-y-1">
                                    {project.features.slice(0, 3).map((feature, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="text-primary">•</span> {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* Buttons */}
                                <div className="flex justify-between mt-4">
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            className="
                                        flex items-center gap-2 
                                        text-primary 
                                        hover:underline 
                                        text-sm
                                        "
                                        >
                                            <ExternalLink size={18} /> Live Demo
                                        </a>
                                    )}
                                    {project.repoUrl && (
                                        <a
                                            href={project.repoUrl}
                                            target="_blank"
                                            className="
                                            flex items-center gap-2 
                                            text-muted-foreground 
                                            hover:text-foreground 
                                            text-sm
                                            "
                                        >
                                            <FiGithub size={18} /> Code
                                        </a>
                                    )}
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ProjectsSection;