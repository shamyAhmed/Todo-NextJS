import { ReactNode } from "react"

const Layout = ({children, modal}: {children: ReactNode, modal: ReactNode}) => {

    return(
        <div>
            {children}
            {modal ? modal : null}
        </div>
    )
}  

export default Layout