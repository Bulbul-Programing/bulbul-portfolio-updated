'use client'
import Image from 'next/image';
import profileImage from '../../../public/profile.png';
import { Facebook, Linkedin, Github } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { motion } from "motion/react"

const HeroSection = () => {
    return (
        <div className='flex flex-col-reverse md:flex-row gap-6 justify-between items-center pt-20 mx-7 lg:mx-20 lg:h-[450px]'>

            <div>
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    viewport={{ once: false }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 0.5,
                        },
                    }}
                >
                    <div className='flex gap-x-2 items-center mb-4'>
                        <div className='w-3 h-3 bg-red-500 rounded-full'></div>
                        <p>Your Vision, My Development Expertise</p>
                    </div>
                </motion.div>
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 50,
                    }}
                    viewport={{ once: false }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 1,
                        },
                    }}
                >
                    <div>
                        <p className='text-3xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF014F] to-[#f25081] mb-2 lg:mb-3'>I am Bulbul Ahammed</p>
                        <p className='text-3xl lg:text-5xl font-extrabold space-y-5'>Full Stack Web Developer</p>
                    </div>
                </motion.div>
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 70,
                    }}
                    viewport={{ once: false }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 1.4,
                        },
                    }}
                >
                    <p className=' w-full lg:w-1/2 text-muted-foreground my-3'>Hi, I’m Bulbul — a passionate Full Stack Web Developer experienced in developing modern, responsive, and secure web applications.
                        I enjoy transforming ideas into powerful solutions using technologies like React, Next.js, Node.js, Express, MongoDB and PostgreSQL.</p>
                    <Button className='hover:cursor-pointer' ><a href="/bulbul-ahammed-resume.jpg" download>Download Portfolio</a></Button>
                </motion.div>


            </div>

            <div className="flex justify-center items-center bg-background border border-foreground rounded-lg">
                <div className="relative w-full max-w-sm bg-background rounded-lg p-2 overflow-hidden">
                    <div className="absolute bottom-0 left-0 h-12 w-12 bg-primary">
                        <div className="absolute top-0 right-0 h-8 w-8 rounded-bl-sm bg-background" />
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 50,
                            }}
                            viewport={{ once: false }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                transition: {
                                    duration: 1,
                                },
                            }}
                        >
                            <div className="relative w-64 h-64 mx-auto mb-4">
                                <Image
                                    src={profileImage}
                                    alt="Bulbul ahammed riad"
                                    className="rounded-lg drop-shadow-2xl object-cover w-full h-full"
                                    style={{
                                        maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                                        WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
                                    }}
                                />
                            </div>
                        </motion.div>

                        <div className="flex space-x-3 mb-6">
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 30,
                                }}
                                viewport={{ once: false }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 0.7,
                                    },
                                }}
                            >
                                <SocialIcon icon={Github} href="https://github.com/Bulbul-Programing" />
                            </motion.div>
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 60,
                                }}
                                viewport={{ once: false }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 1,
                                    },
                                }}
                            >

                                <SocialIcon icon={Facebook} href="https://www.facebook.com/bulbulahamed.riyad" />
                            </motion.div>
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 70,
                                }}
                                viewport={{ once: false }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 1.3,
                                    },
                                }}
                            >
                                <SocialIcon icon={Linkedin} href="https://www.linkedin.com/in/bulbul-ahammed-riad" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
interface SocialIconProps {
    icon: React.ElementType<{ size?: number | string; className?: string }>;
    href: string;
}
const SocialIcon: React.FC<SocialIconProps> = ({ icon: Icon, href }) => {
    return (
        <Link
            href={href}
            target="_blank"
            className="flex hover:bg-accent hover:text-primary-foreground items-center justify-center w-10 h-10 rounded-full border border-gray-200 shadow-md transition duration-300 ease-in-out"
            style={{
                color: '#ec4899', // Pink-600 color for the icon when not hovered
                borderColor: '#ec4899', // Pink-600 border
            }}
        >
            {/* Lucide icons are responsive. We set a standard size/class for consistency. */}
            <Icon size={20} className="w-5 h-5" />
        </Link>
    );
};

export default HeroSection;