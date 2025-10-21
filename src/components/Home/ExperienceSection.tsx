'use client'
import React from 'react';
import ExperienceCard from './ExperienceCart';
import { motion } from "motion/react"

const ExperienceSection = () => {
    return (
        <div>
            <div>
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 40,
                    }}
                    viewport={{ once: true }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 1,
                        },
                    }}
                >
                    <h1 className='text-4xl font-bold text-center'>Experience</h1>
                </motion.div>
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 60,
                    }}
                    viewport={{ once: true }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 1,
                        },
                    }}
                >
                    <p className='text-muted-foreground text-center font-semibold mt-2'>My professional journey and key experiences</p>
                </motion.div>
            </div>
            <div className="p-10">
                <ExperienceCard
                    role="Web Instructor"
                    company="Fiber IT Institute"
                    startDate="Oct '25"
                    endDate="Present"
                    responsibilities={[
                        "Teach MERN stack web development to students, covering HTML, CSS, JavaScript, React, Node.js, Express.js, and MongoDB.",
                        "Design and deliver real-world projects to help students gain hands-on experience and industry-ready skills.",
                        "Provide mentorship, code reviews, and guidance, ensuring students understand both frontend and backend development workflows.",
                        "Continuously update curriculum to include latest web technologies and best practices."
                    ]}
                    skills={["MERN Stack", "React", "Node.js", "Express.js", "MongoDB", "TypeScript", "Project Mentorship"]}
                />
            </div>
        </div>
    );
};

export default ExperienceSection;