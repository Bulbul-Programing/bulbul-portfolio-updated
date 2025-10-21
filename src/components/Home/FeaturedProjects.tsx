import { getAllProjects } from "@/actions/ProjectAction";
import { TProject } from "@/types/TProject";
import ProjectCart from "./ProjectCart";

const FeaturedProjects = async () => {
    const blogs = await getAllProjects()
    console.log(blogs);
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
        </div>
    );
};

export default FeaturedProjects;