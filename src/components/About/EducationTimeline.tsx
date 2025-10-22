'use client'

import { motion } from 'motion/react';

const items = [
    {
        title: "Honors in Finance",
        years: "2021 - Present",
        desc: "Pursuing undergraduate studies in Finance, developing skills in financial analysis, accounting, and investment strategies.",
    },
    {
        title: "HSC in Business Studies",
        years: "2020",
        desc: "Completed Higher Secondary Certificate with a focus on Business Studies, gaining foundational knowledge in finance and management.",
    }
]
const EducationTimeline = () => {
    return (
        <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((it, idx) => (
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20 + (idx * 1.5),
                    }}
                    viewport={{ once: true }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 1,
                        },
                    }}
                    key={idx}
                >
                    <div className="bg-card p-5 rounded-xl border border-border shadow-sm">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-semibold">{it.title}</h4>
                                <p className="text-xs text-muted-foreground mt-1">{it.years}</p>
                            </div>
                        </div>
                        <p className="mt-3 text-sm text-muted-foreground">{it.desc}</p>
                    </div>
                </motion.div>

            ))
            }
        </div >
    );
};

export default EducationTimeline;