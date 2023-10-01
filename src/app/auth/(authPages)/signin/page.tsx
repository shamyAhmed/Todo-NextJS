import SignInForm from "@/components/auth/SignInForm/SigninForm"
import Link from 'next/link';
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
async function Page({searchParams}: {searchParams: {[key: string]: string}}){
    const session = await getServerSession()
    if(session){
        redirect(searchParams.redirectURL || "/")
    }
 
    return (
            <div className="form min-h-[400px] h-fit flex flex-col mt-28 md:w-[450px] md:mt-32">
                <div className="header">Login</div>
                <SignInForm />
                <p className="text-sm mt-4 block text-center">Don't have an account? <Link className="underline text-lime-600" href={`./signup/?redirectURL=${searchParams["redirectURL"] || "/"}`}>Register Now</Link></p>
            </div>
    )
}

export default Page;