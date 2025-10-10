import React from 'react';
import ExperienceCard from './ExperienceCart';

const ExperienceSection = () => {
    return (
        <div>
            <div>
                <h1 className='text-4xl font-bold text-center'>Experience</h1>
                <p className='text-muted-foreground text-center font-semibold mt-2'>My professional journey and key experiences</p>
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