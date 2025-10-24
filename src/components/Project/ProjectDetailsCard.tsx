'use client'
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FiGithub } from "react-icons/fi";

interface ProjectCardProps {
    title: string;
    description: string;
    thumbnail: string;
    features: string[];
    liveUrl: string;
    repoUrl: string;
    createdAt: Date
}

const ProjectDetailsCard = (project: ProjectCardProps) => {
    return (
        <section className="w-full">
            {/* ✅ Breadcrumb */}
            <div className="bg-muted py-8 md:py-14 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    Project Details
                </h1>
                <p className="text-sm text-muted-foreground mt-2">
                    <Link href="/" className="hover:text-primary">Home</Link> /
                    <span className="text-primary ml-1">{project.title}</span>
                </p>
            </div>

            {/* ✅ Main Content */}
            <div className="container mx-auto p-5 md:p-10 lg:py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* ✅ Left Section (Content) */}
                <div className="lg:col-span-2">
                    <div className="relative w-full h-60 md:h-80 rounded-xl overflow-hidden border">
                        <Image
                            src={project.thumbnail}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <h2 className="text-2xl font-bold mt-6 text-foreground">
                        {project.title}
                    </h2>

                    <div
                        className="text-muted-foreground leading-relaxed mt-4"
                        dangerouslySetInnerHTML={{ __html: project.description }}
                    />

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                            🔹 Key Features:
                        </h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                            {project.features.map((f, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-primary text-lg">•</span> {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ✅ Right Sidebar Info Card */}
                <aside className="bg-card shadow-sm rounded-xl border p-6 h-fit">
                    <h3 className="text-lg font-semibold text-foreground border-b pb-3 mb-4">
                        Project Information
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-3">
                        <li><strong className="text-foreground">Name:</strong> {project.title}</li>
                        <li><strong className="text-foreground">Published:</strong> {new Date(project.createdAt).toDateString()}</li>
                        <li><strong className="text-foreground">Type:</strong> Full-Stack Project</li>
                    </ul>

                    <div className="flex flex-col gap-4 mt-6">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                className="flex items-center gap-2 text-primary text-sm hover:underline"
                            >
                                <ExternalLink size={18} /> Live Demo
                            </a>
                        )}
                        {project.repoUrl && (
                            <a
                                href={project.repoUrl}
                                target="_blank"
                                className="flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground"
                            >
                                <FiGithub size={18} /> Source Code
                            </a>
                        )}
                    </div>
                </aside>
            </div>
        </section>
    );
};

export default ProjectDetailsCard;