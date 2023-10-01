import { ReactNode } from "react"
import Sidebar from "@/components/general/Sidebar/Sidebar"


const Layout = ({children}: {children: ReactNode}) => {
    return(
        <div className="sm:flex ">
            <Sidebar />
            <div className="sm:w-full sm:min-h-screen py-5 px-3 sm:px-3 sm:py-6">
                {children}
            </div>
        </div>
    )
}
export default Layout