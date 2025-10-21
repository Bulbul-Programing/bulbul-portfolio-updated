import React from 'react';
import CreateProject from './CreateProject';
import { TProject } from '@/types/TProject';
import Image from 'next/image';
import ProjectAction from './ProjectAction';
import { getAllProjects } from '@/actions/ProjectAction';

const AllProjects = async () => {
    const projects = await getAllProjects();
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <CreateProject />
            </div>
            <div className='overflow-x-auto'>
                <table className="min-w-full table-auto border-collapse shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-destructive text-secondary ">
                        <tr>
                            <th className="px-2 min-w-14 py-3 text-left text-sm font-medium">Image</th>
                            <th className="py-3 min-w-64 text-left text-sm font-medium">Title</th>
                            <th className="py-3 min-w-24 text-left text-sm font-medium">Status</th>
                            <th className="py-3 min-w-24 text-left text-sm font-medium">Date</th>
                            <th className="py-3 min-w-24 text-left text-sm font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects?.map((project: TProject) => (
                            <tr key={project.id} className="border-b">
                                <td className="p-2 w-[60px]">
                                    <Image
                                        alt={project.title}
                                        src={project.thumbnail}
                                        width={50}
                                        height={50}
                                        className="rounded-md object-cover"
                                    />
                                </td>
                                <td>{project.title}</td>
                                <td className={project.isPublished ? 'text-blue-500' : 'text-orange-500'}>
                                    {project.isPublished ? 'Published' : 'Blocked'}
                                </td>
                                <td>{new Date(project.createdAt).toLocaleDateString()}</td>
                                <td className='w-[50px]'>
                                    <ProjectAction projectInfo={project} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AllProjects;