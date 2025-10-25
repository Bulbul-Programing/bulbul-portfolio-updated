import { getAllProjectsUser, getSingleProject } from '@/actions/ProjectAction';
import ProjectDetailsCard from '@/components/Project/ProjectDetailsCard';
import { TProject } from '@/types/TProject';
import { Metadata } from 'next';
import React from 'react';

export const revalidate = 60

export async function generateStaticParams() {
    const projectData = await getAllProjectsUser()

    if (!Array.isArray(projectData.data)) {
        return [];
    }

    return projectData.data
        .map((project: TProject) => ({ slug: project.slug })).slice(0, 10);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const projectData = await getSingleProject(slug)

    return {
        title: `${projectData.title}`,
        description: `${projectData.description}.`,
        openGraph: {
            images: [{ url: projectData.thumbnail }],
        },
    };
}

const ProjectDetails = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params
    const project = await getSingleProject(slug)
    if (!project) {
        return <p>not found</p>
    }

    return (
        <div className="pt-16">
            < ProjectDetailsCard {...project} />
        </div>
    );
};

export default ProjectDetails;