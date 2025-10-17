/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    console.log("❌ Missing email or password");
                    return null;
                }

                try {
                    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`;

                    const res = await fetch(url, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    if (!res.ok) {
                        console.error("❌ Backend login failed:", await res.text());
                        return null;
                    }

                    const data = await res.json();
                    console.log("✅ Backend response JSON:", data);

                    const token = data?.data?.accessToken;
                    if (!token) {
                        console.log("❌ No accessToken found in response");
                        return null;
                    }
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const decoded: any = jwt.decode(token);

                    if (!decoded) {
                        console.log("❌ Failed to decode JWT");
                        return null;
                    }

                    const user = {
                        id: decoded.userId,
                        email: decoded.email,
                        role: decoded.role,
                        accessToken: token,
                        refreshToken: data?.data?.refreshToken,
                    };

                    console.log("✅ User created from token:", user);
                    return user;

                } catch (err) {
                    console.error("🔥 authorize error:", err);
                    return null;
                }
            }

        }),
    ],
    callbacks: {
        async jwt({ token, user, account, profile }) {
            // Happens only on first login
            if (user && account) {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/create`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            name: user.name,
                            email: user.email
                        }),
                    });

                    const data = await res.json();

                    // Assuming your backend returns tokens + user info
                    token.id = data.user.id;
                    token.role = data.user.role;
                    token.accessToken = data.accessToken;
                    token.refreshToken = data.refreshToken;
                } catch (err) {
                    console.error("Failed to save user:", err);
                }
            }

            return token;
        },

        async session({ session, token }: { session: any, token: any }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            return session;
        },
    },
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
};
