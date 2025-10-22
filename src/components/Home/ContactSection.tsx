"use client";

import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LoaderCircleIcon, Mail, MapPin, Send } from "lucide-react";
import { FormEventHandler, useRef, useState } from "react";
import { toast } from "sonner";
import { FiGithub } from "react-icons/fi";
import { CiLinkedin } from "react-icons/ci";
import Link from "next/link";
import emailjs from '@emailjs/browser';

type TContact = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

export default function ContactSection() {
    const { register, handleSubmit, reset } = useForm<TContact>();
    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        toast.success('Thanks for send Massage.')
        reset()
    };

    return (
        <section className="w-full my-10">
            <h2 className="text-center text-3xl md:text-5xl font-bold mb-10">
                Let&apos;s Connect
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-10 max-w-6xl mx-auto">

                {/* ------- FORM ------- */}
                <div className="border rounded-lg p-6 bg-card/50 backdrop-blur-md">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-muted-foreground text-sm">Your Name</label>
                                <Input {...register("name", { required: true })} />
                            </div>
                            <div>
                                <label className="text-muted-foreground text-sm">Your Email</label>
                                <Input {...register("email", { required: true })} type="email" />
                            </div>
                        </div>

                        <div>
                            <label className="text-muted-foreground text-sm">Your Message</label>
                            <Textarea {...register("message", { required: true })} rows={5} />
                        </div>

                        <div className="flex justify-end">
                            {loading ? (
                                <Button disabled>
                                    <LoaderCircleIcon className="animate-spin mr-2" size={16} />
                                    Sending...
                                </Button>
                            ) : (
                                <Button type="submit" className="flex items-center gap-2">
                                    <Send size={16} /> Send Message
                                </Button>
                            )}
                        </div>
                    </form>
                </div>

                {/* ------- CONTACT DETAILS ------- */}
                <div className="flex flex-col justify-center gap-8">
                    <div className="border rounded-lg p-5 bg-card/50 backdrop-blur-md">
                        <h3 className="text-lg font-semibold mb-2">Email</h3>
                        <div className="flex items-center gap-3 text-muted-foreground">
                            <Mail size={18} /> bulbulahammedriad@gmail.com
                        </div>
                    </div>

                    <div className="border rounded-lg p-5 bg-card/50 backdrop-blur-md">
                        <h3 className="text-lg font-semibold mb-2">Location</h3>
                        <div className="flex items-center gap-3 text-muted-foreground">
                            <MapPin size={18} /> Cumilla, Bangladesh.
                        </div>
                    </div>
{/* 
                    <div className="mt-5">
                        <h3 className="text-lg font-semibold mb-3 tracking-wider">Socials</h3>
                        <div className="flex items-center gap-3">
                            <Link href="https://github.com/Bulbul-Programing" target="_blank" className="hover:text-primary text-destructive"><FiGithub size={24} /></Link>
                            <Link href="https://www.linkedin.com/in/bulbul-ahammed-riad" target="_blank" className="hover:text-primary text-destructive"><CiLinkedin size={30} /></Link>
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    );
}
