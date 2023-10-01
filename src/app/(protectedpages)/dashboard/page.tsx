import { recordType } from "@/types/dashboard";
import SuccessChart from "@/components/dashboard/SuccessChart/SuccessChart";
import { get_records } from "@/utils/records";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Page = async () => {
    const session = await getServerSession(authOptions);
    if(!session) return redirect("/auth/signIn")
    const {user: {id: user_id}} = session
    const records: recordType[] = await get_records(user_id)
    return(
        <div>
            <SuccessChart data={records} />
        </div>
    )
}

export default Page;