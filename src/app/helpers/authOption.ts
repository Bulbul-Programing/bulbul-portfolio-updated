import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
        };
    }
    interface User {
        id: string;
        name?: string | null;
        email?: string | null;
    }
}
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: { label: "email", type: "email", placeholder: "example@gmail.com" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials, req) {
                if (!credentials) {
                    return null
                }
                if (!credentials.email || credentials.password) {
                    console.log("Email or Password is missing!");
                    return null
                }
                try {
                    const res = await fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: credentials.email,
                                password: credentials.password,
                            }),
                        }
                    );
                    console.log("Response From Backend:", res);
                    if (!res?.ok) {
                        console.error("Login Failed", await res.text());
                        return null;
                    }

                    const user = await res.json();
                    if (user.id) {
                        return {
                            id: user?.id,
                            name: user?.name,
                            email: user?.email
                        };
                    } else {
                        return null;
                    }
                } catch (err) {
                    console.error(err);
                    return null;
                }
            }
        })
    ]
}