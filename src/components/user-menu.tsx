'use client'
import {
  BoltIcon,
  BookOpenIcon,
  Layers2Icon,
  LayoutDashboard,
  LogOutIcon,
  PinIcon,
  UserPenIcon,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import Link from "next/link"
import { toast } from "sonner"

export default function UserMenu() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [logoutRef, setLogoutRef] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchUser = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`, {
        method: "GET",
        credentials: "include"
      })
      const data = await res.json()

      setLoading(false)
      setUser(data.data)
    }

    fetchUser()
  }, [logoutRef])

  const handleLogout = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
      method: "POST",
      credentials: "include"
    })
    const data = await res.json()
    console.log(data);
    if (data.success) {
      toast.success(data.massage || "some ")
      setLogoutRef(!logoutRef)
    }
  }

  if (loading) {
    return <>loading.</>
  }

  return (
    <>
      {
        user?.email ? <div>
          {
            user?.role === 'WONER' || user?.role === 'ADMIN' || user?.role === 'USER' && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
                    <Avatar>
                      <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-w-64 bg-primary-foreground" align="end">
                  <DropdownMenuLabel className="flex min-w-0 flex-col">
                    <span className="text-foreground truncate text-sm font-medium">
                      {user.name}
                    </span>
                    <span className="text-muted-foreground truncate text-xs font-normal">
                      {user.email}
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <LayoutDashboard size={16} className="opacity-60" aria-hidden="true" />
                      <Link href='/dashboard'>Dashboard</Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Button size='sm' className="w-full cursor-pointer" onClick={handleLogout}><LogOutIcon size={16} className="opacity-60" aria-hidden="true" /> Logout</Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          }
        </div> : <Link
          className="px-4 py-1 rounded-md bg-[#ff3131] hover:bg-[#d82e2e] transition-all text-white font-medium"
          href="/login"
        >
          Log In
        </Link>
      }
    </>
  )
}
