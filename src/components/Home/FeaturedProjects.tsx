import { getAllProjects } from "@/actions/ProjectAction";
import { TProject } from "@/types/TProject";
import ProjectCart from "./ProjectCart";
import Link from "next/link";
import { GoProject } from "react-icons/go";

const FeaturedProjects = async () => {
    const blogs = await getAllProjects()

    return (
        <div className="my-5">
            <div className="text-center ">
                <h1 className="text-4xl font-bold ">Featured Projects</h1>
                <p className="lg:w-1/2 mx-auto my-1 text-muted-foreground font-semibold">Here are some of my recent projects that showcase my skills and passion for development.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 m-5 lg:m-10">
                {
                    blogs.slice(0, 6).map((project: TProject, index: number) => (
                        <ProjectCart project={project} index={index} key={project.id} />
                    ))
                }
            </div>
            <div className="flex justify-center">
                <Link href='/project' className="bg-primary opacity-85 px-3 py-2 rounded-md text-secondary hover:opacity-100 flex items-center gap-x-2 transition-all"><GoProject /> Get More Project</Link>
            </div>
        </div >
    );
};

export default FeaturedProjects;