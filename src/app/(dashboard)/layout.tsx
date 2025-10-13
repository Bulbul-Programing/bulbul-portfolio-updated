/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';
import { IoMenu } from "react-icons/io5";
import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { TDecodedUser } from '@/types/TDecodedUser';
import { adminDashboardNabItem, OwnerDashboardNabItem } from '@/components/NavItems/DashboardNavItem';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';


const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState<TDecodedUser | any>({});

    const [isExpanded, setIsExpanded] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const currentPage = usePathname();

    useEffect(() => {
        setLoading(true)
        const fetchUser = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`, {
                method: "GET",
                credentials: "include"
            })
            const data = await res.json()
            setUserInfo(data.data)
            setLoading(false)
        }

        fetchUser()
    }, []);

    const handleMouseEnter = () => {
        setIsExpanded(true);
    };

    const handleMouseLeave = () => {
        setIsExpanded(false);
    };

    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen);
        setIsExpanded(true);
    };

    const handleOutsideClick = () => {
        if (isDrawerOpen) {
            setIsDrawerOpen(false);
        }
    };

    if (loading) {
        return <p>Loading</p>
    }

    return (
        <div className="max-w-7xl relative mx-auto  flex flex-col md:flex-col lg:flex-row">
            <div className=" block md:block lg:hidden" onClick={handleDrawerToggle}>
                <div className="flex mx-1 rounded-lg p-5 shadow-xl justify-between ">
                    <IoMenu className="text-2xl" />
                </div>
            </div>
            {isDrawerOpen && (
                <div
                    className=" absolute min-h-screen h-full inset-0 opacity-10 z-20 "
                    onClick={handleOutsideClick}
                />
            )}
            <div
                className={` min-h-screen h-full absolute lg:block bg-secondary transition-all duration-300 ease-in-out transform ${isExpanded ? "w-48 block " : "w-16 hidden"
                    } ${isDrawerOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    } z-30`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div>
                    <div className='flex justify-center mb-2 mt-3'>
                        <p className='w-10 h-10 bg-accent flex justify-center items-center rounded-full'> {userInfo?.name?.slice(0, 2).toUpperCase()}</p>
                    </div>

                    <h1
                        className={`${isExpanded ? "text-base mt-2" : "text-[0px] mt-0"} text-center transition-all ease-in duration-300 font-semibold`}
                    >
                        {userInfo.name}
                    </h1>
                </div>
                <div className='border-b mt-2'></div>
                <div className="mt-4 space-y-2 transition-all duration-300 ease-in-out">
                    {
                        userInfo.role === 'ADMIN' &&
                        <>
                            {
                                adminDashboardNabItem.map((item, index) => (
                                    <Link
                                        key={index}
                                        className={` flex items-center gap-x-1.5 
                                            ${(currentPage === item.path && isExpanded) ? "bg-destructive rounded-lg justify-start" : ""} 
                                            ${isExpanded ? 'justify-start' : 'justify-center'} ${(isExpanded && currentPage !== item.path) && 'bg-destructive/20 rounded-lg text-secondary-foreground'}
                                            items-center  hover:bg-destructive/70  text-primary-foreground p-2 m-2`}
                                        href={item.path}
                                        onClick={() => setIsDrawerOpen(false)}
                                    >
                                        <div
                                            className={`text-lg md:text-2xl lg:text-xl 
                                                ${currentPage !== item.path ? !isExpanded && " text-foreground" : ""} 
                                                ${isExpanded && currentPage !== item.path ? "bg-transparent" : ""} 
                                                ${currentPage === item.path ? !isExpanded && " bg-destructive p-3 rounded-full" : ""}`}
                                        >
                                            {item.icon}
                                        </div>
                                        <p className={` ${isExpanded ? "text-base" : "text-[0px] mt-0"} `}>
                                            {item.element}
                                        </p>
                                    </Link>
                                ))
                            }
                        </>
                    }
                    {
                        userInfo.role === 'OWNER' &&
                        <>
                            {
                                OwnerDashboardNabItem.map((item, index) => (
                                    <Link
                                        key={index}
                                        className={` flex items-center gap-x-1.5 
                                            ${(currentPage === item.path && isExpanded) ? "bg-destructive rounded-lg justify-start" : ""} 
                                            ${isExpanded ? 'justify-start' : 'justify-center'} ${(isExpanded && currentPage !== item.path) && 'bg-destructive/20 rounded-lg text-secondary-foreground'}
                                            items-center  hover:bg-destructive/70  text-primary-foreground p-2 m-2`}
                                        href={item.path}
                                        onClick={() => setIsDrawerOpen(false)}
                                    >
                                        <div
                                            className={`text-lg md:text-2xl bg-destructive ${isExpanded && currentPage !== item.path ? "bg-transparent" : ""} lg:text-xl ${currentPage === item.path ? !isExpanded && " text-primary-foreground  p-3 rounded-full" : ""}`}
                                        >
                                            {item.icon}
                                        </div>
                                        <p className={` ${isExpanded ? "text-base" : "text-[0px] mt-0"} `}>
                                            {item.element}
                                        </p>
                                    </Link>
                                ))
                            }
                        </>
                    }
                </div>
            </div>

            <div className=" w-full lg:ml-16 px-3 md:px-4 lg:px-5 p-2 md:p-2 pt-5">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;