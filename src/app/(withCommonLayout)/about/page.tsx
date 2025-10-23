import AboutHero from '@/components/About/AboutHero';
import EducationTimeline from '@/components/About/EducationTimeline';
import ExperienceHighlight from '@/components/About/ExperienceHighlight';
import ExperienceSection from '@/components/About/ExperienceSection';
import ServiceCards from '@/components/About/ServiceCards';
import SkillBars from '@/components/About/SkillBars';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "About",
    description: "Md. Bulbul Ahammed – Full-Stack Web Developer skilled in MERN stack, Next.js, TypeScript, and Redux, building modern, responsive, and user-friendly web applications."
};

const About = () => {
    return (
        <div>
            <AboutHero />
            <div className='mx-10'>
                <ServiceCards />
                <SkillBars />
                <ExperienceHighlight />
                <EducationTimeline />
                <ExperienceSection />
            </div>
        </div>
    );
};

export default About;