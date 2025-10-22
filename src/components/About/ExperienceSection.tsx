'use client'
import { motion } from 'motion/react';

const experiences = [
    {
        role: "Web Instructor",
        company: "Fibre IT Institute",
        period: "01-10-2025 - Present",
        description:
            "Teaching HTML, CSS, JavaScript, React, Node.js, Express.js, and MongoDB to students, including real-world projects and hands-on exercises.",
        icon: "🎓",
    },
];
const ExperienceSection = () => {
    return (
        <section className="my-12 max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                Experience
            </h2>
            <div className="grid gap-6 md:grid-cols-1">
                {experiences.map((experience, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="bg-card p-6 rounded-xl border border-border shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="flex items-center space-x-4 mb-3">
                            <div className="text-2xl">{experience.icon}</div>
                            <div>
                                <h3 className="text-lg font-semibold">{experience.role}</h3>
                                <p className="text-sm text-muted-foreground">{experience.company}</p>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{experience.period}</p>
                        <p className="text-sm text-foreground">{experience.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ExperienceSection;