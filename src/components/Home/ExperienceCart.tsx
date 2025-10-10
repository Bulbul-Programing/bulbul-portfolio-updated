// ExperienceCard.tsx
import React from "react";

interface ExperienceCardProps {
    role: string;
    company: string;
    startDate: string;
    endDate?: string;
    responsibilities: string[];
    skills: string[];
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
    role,
    company,
    startDate,
    endDate = "Present",
    responsibilities,
    skills,
}) => {
    return (
        <div className="border rounded-xl p-6 space-y-4 bg-[var(--background)] text-[var(--foreground)] shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold">{role}</h3>
                <span className="text-sm text-[var(--muted-foreground)]">
                    {startDate} - {endDate}
                </span>
            </div>

            <p className="text-[var(--primary)] font-medium">{company}</p>

            <ul className="list-disc list-inside space-y-2 text-sm">
                {responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            <div className="flex flex-wrap gap-2 mt-4">
                {skills.map((skill, index) => (
                    <span
                        key={index}
                        className="px-3 py-1 border rounded-full text-sm border-[var(--primary)]"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ExperienceCard;
