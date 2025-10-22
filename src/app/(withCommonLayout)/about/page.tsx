import AboutHero from '@/components/About/AboutHero';
import EducationTimeline from '@/components/About/EducationTimeline';
import ExperienceHighlight from '@/components/About/ExperienceHighlight';
import ExperienceSection from '@/components/About/ExperienceSection';
import ServiceCards from '@/components/About/ServiceCards';
import SkillBars from '@/components/About/SkillBars';
import React from 'react';

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