import React from 'react';
import SkillBarsCart, { Skill } from './SkillBarsCart';

const SkillBars = () => {
    const devSkills: Skill[] = [
        { name: "HTML", percent: 85 },
        { name: "CSS", percent: 70 },
        { name: "Tailwind CSS", percent: 75 },
        { name: "JavaScript", percent: 85 },
        { name: "TypeScript", percent: 70 },
        { name: "React.js", percent: 80 },
        { name: "Next.js", percent: 85 },
        { name: "Redux", percent: 85 },
        { name: "Node.js", percent: 70 },
        { name: "Express.js", percent: 85 },
        { name: "MongoDB", percent: 75 },
        { name: "Mongoose", percent: 85 },
        { name: "PostgreSQL", percent: 75 },
    ];

    return (
        <div className="grid grid-cols-1 gap-8 my-8">
            <div>
                <h4 className="text-lg font-semibold mb-4">Development Skill</h4>
                <div className='grid grid-cols-2 gap-x-10'>
                    {devSkills.map((s) => (
                        <SkillBarsCart key={s.name} skill={s} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillBars;