import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    const protectedRoutes = ['/dashboard', '/profile', '/admin', '/blog']

    if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', req.url))
        }
    }

    if (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register') {
        if (token) {
            return NextResponse.redirect(new URL('/', req.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard/project',
        '/dashboard/blog',
        '/dashboard/:path*',
        '/profile/:path*',
        '/admin/:path*',
        '/login',
        '/register'
    ],
}