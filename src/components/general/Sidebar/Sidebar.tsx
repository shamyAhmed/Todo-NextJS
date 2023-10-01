import SidebarButton from "./SidebarButton/SidebarButton";
import Link from 'next/link';
import Image, { StaticImageData } from "next/image";
import todoImage from "@/assets/images/Sidebar/todo.png"
import dashboardImage from "@/assets/images/Sidebar/dashboard.png"
import profileImage from "@/assets/images/Sidebar/profile.png"


interface SidebarLinkProps {
    url: string
    text: string
    src: StaticImageData
}

const SidebarLink = ({url, text, src}: SidebarLinkProps) => {
    return(
        <div className="flex flex-col justify-center items-center gap-4 w-[60%] sm:w-full sm:gap-4 sm:mb-4">
                <Link href={url} className="h-[50px] w-full flex justify-center items-center gap-1 sm:gap-2  overflow-hidden sm:h-[50px]" prefetch>
                    <div className="overflow-hidden h-full flex items-center justify-center w-[20%] sm:max-w-[40px] sm:justify-start">
                        <Image src={src} alt="todos" width={30} height={30}  className="object-fill "/>
                    </div>
                    <div className="pt-[2px] flex-1">{text}</div>
                </Link>
                <div className="h-[1px] w-[105%] bg-black"></div>
        </div>
    )
}


const paths: SidebarLinkProps[] = [
    {
        src: todoImage,
        text: "Todo List",
        url: "/todolist"
    },
    {
        src: dashboardImage,
        text: "Dashboard",
        url: "/dashboard"
    },
    {
        src: profileImage,
        text: "Profile",
        url: "/profile"
    }
]

const SidebarLinks = () => {
    return(
        <div className="sidebar-list hidden absolute top-0 right-0 w-1/2 h-full  bg-white border-l-[2px] border-primary sidebar-link gap-10 sm:block sm:static sm:border-none sm:w-full sm:h-full sm:px-4">
            {
                paths.map(path => <SidebarLink {...path} />)
            }
        </div>
    )
}

const Sidebar = () => {
    return (
        <div className="sidebar w-full h-[60px] relative  bg-white z-[1000] border-b-[1px] border-primary px-2 py-1 flex sm:sticky top-0 left-0 justify-between overflow-x-hidden sm:px-0 sm:py-2 sm:h-screen sm:w-[200px] sm:flex sm:flex-col sm:justify-center sm:items-center sm:content-start md:w-[250px] lg:w-[300px]">
            <p className="logo font-fuggles text-5xl font-extrabold h-full w-fit text-primary sm:w-full sm:text-center sm:h-fit sm:mb-4">Todos</p>
            <div className="h-[2px] bg-primary w-full hidden mb-3 sm:block"></div>
            <SidebarButton>
                <SidebarLinks />
            </SidebarButton>
            <SidebarLinks />
         
        </div>
    )
}

export default Sidebar