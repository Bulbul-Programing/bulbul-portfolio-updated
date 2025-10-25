'use client'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const useUserInfo = () => {
    const { data: session, status } = useSession()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const route = useRouter()
    
    useEffect(() => {
        const fetchUser = async () => {
            if (!session?.user?.email) return
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me/${session?.user?.email}`,
                    { method: "GET" }
                )
                const data = await res.json()
                
                setUser(data.data)
            } catch (err) {
                console.log('error');
                route.push('/login')
                setLoading(false)
                console.error("Failed to fetch user info:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [session?.user?.email])

    return { user, loading, status }
}
