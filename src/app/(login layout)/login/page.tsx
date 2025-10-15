'use client'
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { BsGoogle } from 'react-icons/bs';
import { toast } from 'sonner';
import z from 'zod';

const formSchema = z.object({
    email: z.email({ message: 'Email is Require' }),
    password: z.string({ message: 'Password is require' }).min(6, { message: 'Password is minimum 6 character' })
})

const Login = () => {
    const route = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(data),
                credentials: "include",
            })

            const result = await response.json();

            if (result.success) {
                toast.success(result.massage || "")
                route.push('/')
            }

            if (!result.success) {
                toast.error(result.message || "")
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleSocialLogin = (provider: "google" | "github") => {
        console.log(`Login with ${provider}`);
    };

    return (
        <div className="relative ">
            <div className="flex justify-center  items-center h-screen">
                <div className="w-10/12  md:w-6/12 lg:w-4/12 border border-secondary-foreground backdrop-blur-lg bg-opacity-80 px-4 py-6 rounded-lg">
                    <h1 className="text-center text-lg font-semibold">Login</h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input className='border border-secondary-foreground' placeholder="Your Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input className='border border-secondary-foreground' placeholder="******" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className='w-full'>Login</Button>
                        </form>
                    </Form>
                    <div className="flex items-center mt-4">
                        <div className="border-b border-gray-400 w-full" />
                        <p className="px-2 text-sm font-medium">OR</p>
                        <div className="border-b border-gray-400 w-full" />
                    </div>
                    {/* Social Login Buttons */}
                    <div className="flex flex-col gap-3 mt-4">
                        <Button
                            variant="outline"
                            className="flex items-center justify-center gap-2"
                            onClick={() =>
                                signIn("google", {
                                    callbackUrl: "/dashboard/admin",
                                })
                            }
                        >
                            {/* Google */}
                            <Image
                                src="https://img.icons8.com/color/24/google-logo.png"
                                alt="Google"
                                className="w-5 h-5"
                                width={20}
                                height={20}
                            />
                            Login with Google
                        </Button>
                    </div>
                    <div className="flex items-center mt-2">
                        <div className="border-b border-gray-400 w-full" />
                        <p className="px-2 text-sm font-medium">OR</p>
                        <div className="border-b border-gray-400 w-full" />
                    </div>
                    <p className="mt-3">
                        Don&apos;t have an account ?{" "}
                        <Link className="text-blue-500  underline " href="/register">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
            {/* <div>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {() => (
                            <div className="p-4">
                                <h1 className="text-lg font-medium">
                                    Enter your email for reset password
                                </h1>
                                <TTForm onSubmit={handleResetPassword}>
                                    <TTInput label="email" name="email" type="email" />
                                    <Button
                                        className="w-full bg-blue-500 text-white font-bold text flex-1"
                                        isLoading={modalLoading}
                                        type="submit"
                                    >
                                        Reset Password
                                    </Button>
                                </TTForm>
                            </div>
                        )}
                    </ModalContent>
                </Modal>
            </div> */}
        </div>
    );
};

export default Login;