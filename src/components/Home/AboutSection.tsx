import { ArrowUpRight, Briefcase, Code } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { SiHtml5, SiCss3, SiTailwindcss, SiJavascript, SiTypescript, SiShadcnui, SiReact, SiNextdotjs, SiRedux, SiFirebase, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql } from "react-icons/si";

const skills = {
    frontend: [
        { title: "HTML", Icon: SiHtml5 },
        { title: "CSS", Icon: SiCss3 },
        { title: "Tailwind CSS", Icon: SiTailwindcss },
        { title: "JavaScript", Icon: SiJavascript },
        { title: "TypeScript", Icon: SiTypescript },
        { title: "React", Icon: SiReact },
        { title: "Next.js", Icon: SiNextdotjs },
        { title: "Redux", Icon: SiRedux },
        { title: "Firebase", Icon: SiFirebase },
        { title: "ShadCN", Icon: SiShadcnui },
    ],
    backend: [
        { title: "Node.js", Icon: SiNodedotjs },
        { title: "Express.js", Icon: SiExpress },
    ],
    database: [
        { title: "MongoDB", Icon: SiMongodb },
        { title: "PostgreSQL", Icon: SiPostgresql },
    ],
};
const SkillBadge: React.FC<{ name: string; Icon: React.ElementType }> = ({ name, Icon }) => (
    <span className="flex border border-muted-foreground items-center gap-2 bg-primary/10 px-3 py-1 rounded-md text-sm font-medium hover:bg-primary/20 transition-transform duration-300 transform hover:scale-105">
        <Icon className="w-5 h-5 transition-transform rounded-[2px] duration-300 transform hover:rotate-[25deg]" />
        {name}
    </span>
);

const AboutSection = () => {
    return (
        <div className='my-10'>
            <div>
                <h1 className='text-4xl font-bold text-center'>About Me</h1>
                <p className='text-muted-foreground text-center font-semibold mt-2'>Full-stack web developer turning ideas into real-world digital solutions.</p>
            </div>
            <section className="bg-background text-foreground py-16 px-6 md:px-12 lg:px-20 transition-colors duration-300">
                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* LEFT SIDE */}
                    <div>
                        {/* Current Role Header */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className='bg-primary/10 p-2 rounded-md'>
                                <Briefcase className='text-primary' />
                            </div>
                            <h2 className="text-2xl font-bold">
                                Current Role
                            </h2>
                        </div>

                        <h2 className='mb-8 font-semibold text-muted-foreground'>
                            I am a web instructor at <a href="https://fiberitinstitute.it.com" target='_blank' className='text-primary underline font-semibold'>Fiber IT Institute</a>. I teach students to build real-world web applications using the MERN stack and modern technologies.
                        </h2>

                        {/* Technical Expertise */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className='bg-primary/10 p-2 rounded-md'>
                                    <Code className='text-primary' />
                                </div>
                                <h2 className="text-2xl font-bold">
                                    Technical Expertise
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                                        FRONTEND
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.frontend.map(skill => (
                                            <SkillBadge key={skill.title} name={skill.title} Icon={skill.Icon} />
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                                        BACKEND
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.backend.map(skill => (
                                            <SkillBadge key={skill.title} name={skill.title} Icon={skill.Icon} />
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                                        Database
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.database.map(skill => (
                                            <SkillBadge key={skill.title} name={skill.title} Icon={skill.Icon} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-primary/10 p-2 rounded-md">
                                <span className="text-primary text-xl">✨</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                                Let&apos;s Build Something Amazing
                            </h2>
                        </div>

                        <p className="text-muted-foreground mb-4 leading-relaxed">
                            Transforming ideas into modern, responsive, and high-performance web applications is what drives us. Using React, Next.js, and Tailwind CSS for the frontend and Node.js, Express, MongoDB, and PostgreSQL for the backend, we create seamless experiences that are both scalable and reliable.
                        </p>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                            Every project is crafted with attention to detail, clean code, and best practices, ensuring your vision becomes a reality.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/contact"
                                className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-md flex items-center gap-2 hover:opacity-90 transition"
                            >
                                Get In Touch <ArrowUpRight size={18} />
                            </Link>
                            <Link
                                href="/projects"
                                className="bg-secondary text-secondary-foreground font-semibold px-6 py-3 rounded-md flex items-center gap-2 border border-border hover:bg-accent hover:text-accent-foreground transition"
                            >
                                View Projects <ArrowUpRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutSection;