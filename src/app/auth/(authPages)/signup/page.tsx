import SignupForm from "@/components/auth/SignUpForm/SignUpForm";
import Link from 'next/link';
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
const Page = async ({searchParams}: {searchParams: {redirectURL?: string}}) => {
    const session = await getServerSession()
    if(session){
        redirect(searchParams.redirectURL || "/")
    }
    return(
            <div className="form flex flex-col min-h-[400px] h-fit mt-8 md:mt-14">
                <div className="header">Signup</div>
                <SignupForm />
                <p className="text-sm mt-4 block text-center">Already have an account? <Link className="underline text-lime-600" href={`./signin/?redirectURL=${searchParams["redirectURL"] || "/"}`}>Sign in</Link></p>
            </div>
    )
}

export default Page;