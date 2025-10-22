'use client'
import { register } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const formSchema = z.object({
    name: z.string({ message: 'Name is Require' }),
    email: z.email({ message: 'Email is Require' }),
    password: z.string({ message: 'Password is require' }).min(6, { message: 'Password is minimum 6 character' })
})

const Register = () => {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {

        try {
            const res = await register(data);

            if (res?.success) {
                toast.success(res.massage);
                router.push("/login");
            }
            if (!res.success) {
                toast.error(res.message || "")
            }
        } catch (err) {
            console.error(err);
        }
        // try {
        //     const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/create`, {
        //         method: "POST",
        //         headers: {
        //             'Content-Type': "application/json"
        //         },
        //         body: JSON.stringify(data)
        //     })

        //     const result = await response.json();

        //     if (result.success) {
        //         toast.success(result.massage || "")
        //         router.push('/login')
        //     }

        //     if (!result.success) {
        //         toast.error(result.message || "")
        //     }

        // } catch (error) {
        //     console.log(error);
        // }
    }
    return (
        <div className="flex justify-center  items-center h-screen">
            <div className="w-10/12  md:w-6/12 lg:w-4/12 border border-secondary-foreground backdrop-blur-lg bg-opacity-80 px-4 py-6 rounded-lg">
                <h1 className="text-center text-lg font-semibold">Login</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input className='border border-secondary-foreground' placeholder="Your Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                        <Input className='border border-secondary-foreground' type='password' placeholder="******" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className='w-full cursor-pointer'>Register</Button>
                    </form>
                </Form>
                <div className="flex items-center mt-4">
                    <div className="border-b border-gray-400 w-full" />
                    <p className="px-2 text-sm font-medium">OR</p>
                    <div className="border-b border-gray-400 w-full" />
                </div>
                <p className=" mt-3">
                    Have an account?{" "}
                    <Link href='/login' className="underline text-blue-500 underline-offset-4">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;