import AllProjects from '@/components/Dashboard/Admin/Project/AllProjects';
import React from 'react';

const Projects = () => {
    return (
        <div>
            <h1 className="text-xl md:text-3xl lg:text-3xl mb-5 font-bold text-center py-4 bg-muted-foreground/10 rounded-md">
                Welcome to Project Page.
            </h1>
            <div>
                <AllProjects />
            </div>
        </div>
    );
};

export default Projects;