'use server'
import { cookies } from "next/headers"

export const getCookie = async (cookiesName: string) => {
    const cookiesStore = await cookies()
    const g = await cookiesStore.get(cookiesName)
    console.log(g);
}