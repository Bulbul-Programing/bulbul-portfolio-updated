import AboutSection from '@/components/Home/AboutSection';
import ExperienceSection from '@/components/Home/ExperienceSection';
import HeroSection from '@/components/Home/HeroSection';

const HomePage = () => {
    return (
        <div className=''>
            <HeroSection />
            <AboutSection />
            <ExperienceSection />
        </div>
    );
};

export default HomePage;