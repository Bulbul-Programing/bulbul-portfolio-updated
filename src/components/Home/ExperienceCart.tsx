'use client'
import React from "react";
import { motion } from "motion/react"

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
        <div className="border rounded-xl p-6 space-y-2 bg-[var(--background)] text-[var(--foreground)] shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-start">
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
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
                    <h3 className="text-xl font-semibold">{role}</h3>
                </motion.div>
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
                    <span className="text-sm text-[var(--muted-foreground)]">
                        {startDate} - {endDate}
                    </span>
                </motion.div>

            </div>
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
                <p className="text-[var(--primary)] font-medium">{company}</p>
            </motion.div>

            <ul className="list-disc list-inside space-y-2 text-sm">
                {responsibilities.map((item, index) => (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20 + (index * 3),
                        }}
                        viewport={{ once: true }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 0.7,
                            },
                        }}
                        key={index}
                    >
                        <li>{item}</li>
                    </motion.div>
                ))}
            </ul>

            <div className="flex flex-wrap gap-2 mt-4">
                {skills.map((skill, index) => (
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: 20 + (index * 8),
                        }}
                        viewport={{ once: true }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            transition: {
                                duration: 1,
                            },
                        }}
                        key={index}
                    >
                        <span

                            className="px-3 py-1 border rounded-full text-sm border-[var(--primary)]"
                        >
                            {skill}
                        </span>
                    </motion.div>

                ))}
            </div>
        </div>
    );
};

export default ExperienceCard;
