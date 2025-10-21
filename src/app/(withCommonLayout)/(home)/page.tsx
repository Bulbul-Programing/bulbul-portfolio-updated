import AboutSection from '@/components/Home/AboutSection';
import ExperienceSection from '@/components/Home/ExperienceSection';
import FeaturedProjects from '@/components/Home/FeaturedProjects';
import HeroSection from '@/components/Home/HeroSection';

const HomePage = () => {
    return (
        <div className=''>
            <HeroSection />
            <AboutSection />
            <ExperienceSection />
            <FeaturedProjects />
        </div>
    );
};

export default HomePage;