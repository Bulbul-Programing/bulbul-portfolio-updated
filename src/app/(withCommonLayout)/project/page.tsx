import { getAllProjectsUser } from "@/actions/ProjectAction";
import ProjectsSection from "@/components/Project/ProjectsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Project",
    description: "Explore projects by Md. Bulbul Ahammed, Full-Stack Web Developer. Showcasing MERN stack, Next.js, TypeScript, and modern web applications built with expertise."
};
const Project = async () => {
    const projects = await getAllProjectsUser();

    return (
        <div>
            <ProjectsSection projects={projects} />
        </div>
    );
};

export default Project;