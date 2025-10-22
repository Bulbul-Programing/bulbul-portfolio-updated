'use client'
import { motion } from 'motion/react';

export const experienceHighlights = [
    {
        value: "3+",
        label: "Years of Experience",
    },
    {
        value: "15+",
        label: "Projects Completed",
    },
    {
        value: "15+",
        label: "Technologies Learned",
    },
    {
        value: "20+",
        label: "Clients Served",
    }
];

const ExperienceHighlight = () => {
    return (
        <div className="flex flex-col md:flex-row items-stretch gap-6 my-10">
            <div className="flex-1 bg-muted p-6 rounded-xl border border-border shadow-sm">
                <div className="text-5xl font-extrabold text-primary">3</div>
                <div className="mt-2">
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
                                duration: 0.6,
                            },
                        }}
                    >
                        <h3 className="text-xl font-semibold">Years Of Experience</h3>
                    </motion.div>
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 30,
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
                        <p className="mt-3 text-sm text-muted-foreground">
                            3+ years of experience building modern, responsive web applications using the MERN stack and cutting-edge technologies like React, Next.js, Node.js, and MongoDB.
                        </p>
                    </motion.div>

                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {experienceHighlights.map((item, index) => (
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
                        key={index}
                    >
                        <div

                            className="bg-card p-4 rounded-xl border border-border text-center shadow-sm"
                        >
                            <div className="text-xl font-bold">{item.value}</div>
                            <div className="text-xs text-muted-foreground">{item.label}</div>
                        </div>
                    </motion.div>

                ))}
            </div>
        </div>
    );
};

export default ExperienceHighlight;