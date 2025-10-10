import Footer from '@/components/ShareComponent/Footer/Footer';
import Navbar from '@/components/ShareComponent/NavBar/Navbar';
import React from 'react';

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div>
            <Navbar />
            <div>
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default layout;