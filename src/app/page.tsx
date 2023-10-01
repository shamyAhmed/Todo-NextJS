import Image from 'next/image'
import {getServerSession} from 'next-auth/next';
import {redirect} from "next/navigation"
export default async function Home() {
    redirect("/todolist")
}
