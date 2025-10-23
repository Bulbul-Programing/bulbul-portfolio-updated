import AboutSection from '@/components/Home/AboutSection';
import ContactSection from '@/components/Home/ContactSection';
import ExperienceSection from '@/components/Home/ExperienceSection';
import FeaturedProjects from '@/components/Home/FeaturedProjects';
import HeroSection from '@/components/Home/HeroSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Home",
    description: "Hi, I’m Md. Bulbul Ahammed, a passionate Full-Stack Web Developer with 3+ years of experience in building modern, responsive, and scalable web applications. I specialize in the MERN stack, Next.js, TypeScript, Redux, and modern web technologies to deliver high-quality solutions. From dynamic websites to complex web applications, I craft seamless digital experiences tailored to user needs. Explore my portfolio to see my projects and how I can help bring your ideas to life."
};

const HomePage = () => {
    return (
        <div className=''>
            <HeroSection />
            <AboutSection />
            <ExperienceSection />
            <FeaturedProjects />
            <ContactSection />
        </div>
    );
};

export default HomePage;