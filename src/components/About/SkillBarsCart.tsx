'use client'
import React from 'react';
import { motion } from "motion/react";

export type Skill = { name: string; percent: number };

const SkillBarsCart = ({ skill }: { skill: Skill }) => {
    return (
        <div className="mb-4">
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{skill.name}</span>
                <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
                    viewport={{ once: true }}
                    className="text-sm text-muted-foreground"
                >
                    {skill.percent}%
                </motion.span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden border border-border">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percent}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="h-full rounded-full"
                    style={{
                        background: "linear-gradient(90deg, var(--chart-1), rgba(255,0,100,0.6))",
                    }}
                />
            </div>
        </div>
    );
};

export default SkillBarsCart;