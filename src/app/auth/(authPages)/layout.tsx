import { ReactNode } from "react"

const Layout = async ({children}: {children: ReactNode}) => {
    
    return(
        <div className="auth-page h-screen w-full flex flex-col items-center">
            {children}
        </div>
    )
}

export default Layout;