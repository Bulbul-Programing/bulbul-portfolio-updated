import React from 'react';

type Props = {
    params: { slug: string };
};

const ProjectDetails = ({ params }: Props) => {
    console.log(params.slug);
    return (
        <div>

        </div>
    );
};

export default ProjectDetails;