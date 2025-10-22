import React from 'react';

const AboutHero = () => {
    return (
        <header className="bg-muted/40 border-b border-border pt-24">
            <div className="pb-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                        About Me
                    </h1>
                    <p className="mt-3 text-sm sm:text-base text-muted-foreground">
                        Home <span className="mx-2">/</span> About Me
                    </p>
                </div>
            </div>
        </header>
    );
};

export default AboutHero;