import Link from "next/link";

const Page = async () => {
    return(
        <div className="flex items-center justify-center h-screen">
            <Link href={"api/auth/signout"} className="button logout py-2 px-4 cursor-pointer hover:bg-red-400 transition-colors tracking-wider bg-red-500 text-white font-bold capitalize space rounded-md">
                Signout
            </Link>
        </div>
    )
}

export default Page;