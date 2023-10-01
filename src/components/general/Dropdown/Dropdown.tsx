'use client';
import React, {FC, useState, useEffect, useRef, useCallback, ReactNode, ReactElement, isValidElement} from "react";

interface dropdownOrops {
    options: {
        [key: string]: string | ReactNode
    }
    onChnage: (key: string) => void
    initialState: string
    onlySquare?: boolean

}

interface optionProps {
    verbose: string | ReactNode
    value: string
    onChange: (val: string) => void
}

const Option: FC<optionProps> = ({verbose, value, onChange}) => {
    return (
        <div className="whitespace-nowrap" onClick={(e) => {onChange(value);}}>
            {
                verbose
            }
        </div>
    )
}

const Dropdown: FC<dropdownOrops> = ({options, onChnage, initialState, onlySquare}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [active, setActive] = useState<boolean>(false);
    const [chosen, setChosen] = useState<string | null | ReactNode>(options[initialState] || options[Object.keys(options)[0]]);
    
    const ChangeChosen = (key: string) => {
        if(key === Object.keys(options).find(key => options[key] === chosen)){
            
        }
        setChosen(options[key]);
        onChnage(key)
    }
    

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if(ref.current && !ref.current.contains(e.target as Node)){
                setActive(false);
            }
        }
        document.addEventListener("click", handleClickOutside)
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [ref])

    return(
        <div className={`border-[2px] border-solid rounded-md group  flex items-center justify-center relative cursor-pointer`} onClick={() => {setActive(!active)}} ref={ref}>
            <div className="dropdown-chosen cursor-pointer">
                <div className="pointer-events-none">
                    {isValidElement(chosen) && (chosen as ReactElement).props.children.length && onlySquare ? (chosen as ReactElement).props.children[0] : chosen}
                </div>
            </div>
            {
                active && 
                <div className="dropdown-options absolute top-[100%] -left-10 w-fit p-1 min-w-[140px] rounded-md bg-slate-100 flex flex-col gap-2 z-[2002000]">
                    {
                        Object.keys(options).map((option, index) => {
                            return <Option key={index} verbose={options[option]} value={option} onChange={(key: string) => {ChangeChosen(key); setActive(false)}} />
                        })
                    }
                </div>
            }
            
        </div>
    )
}

export default Dropdown