'use client'
import React, {FC, ReactNode, useState} from 'react';

import './SidebarButton.css';

interface props {
    children: ReactNode
}

const SidebarButton: FC<props> = ({children}) => {
    const [active, setActive] = useState<boolean>(false);

    return(
        <div 
            className={`sidebar-burger sm:hidden ${active ? "active" : ""}`}
            onClick={() => {
                setActive(!active);
            }}
        >
            <div className={`rounded-full relative bg-white z-10 border-solid border-[2px] justify-center items-center shadow-md  flex gap-1 flex-col [&>span]:h-[4px] [&>span]:w-[80%] [&>span]:block [&>span]:bg-primary [&>span]:rounded-lg h-full w-[50px] ${active ? "shadow-sm shadow-gray-300 border-2" : ""}`}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className='sidebar-burger-list [&>*]:flex [&>*]:flex-col [&>*]:items-center [&>*]:pt-20 relative' onClick={(e) => {
                const target = e.target as (HTMLDivElement | HTMLLinkElement | HTMLImageElement)
                if(target.classList.contains("sidebar-link")){
                    e.stopPropagation()
                }
            }}>
                {children}
            </div>
        </div>
    )
}

export default SidebarButton