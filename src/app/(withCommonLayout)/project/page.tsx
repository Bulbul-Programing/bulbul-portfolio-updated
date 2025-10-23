import { getAllProjectsUser } from "@/actions/ProjectAction";
import ProjectsSection from "@/components/Project/ProjectsSection";

const Project = async () => {
    const projects = await getAllProjectsUser();

    return (
        <div>
            <ProjectsSection projects={projects} />
        </div>
    );
};

export default Project;