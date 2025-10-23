import { getSingleProject } from '@/actions/ProjectAction';
import ProjectDetailsCard from '@/components/Project/ProjectDetailsCard';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaGithub } from 'react-icons/fa';

interface ProjectPageProps {
    params: {
        slug: string;
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