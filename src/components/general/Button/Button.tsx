'use client';
import React, {FC} from 'react';

interface props {
    text?: string
    onClick: React.MouseEventHandler
    color?: "primary" | "secondary"
    className?: string
}

const Button: FC<props> = ({text = "Submit", onClick, color = "primary", className}) => {
    return(
        <div className={`btn text-center font-semibold py-1 text-black rounded-md cursor-pointerp ${className} ${color === "primary" ? "bg-primary" : ""}`} onClick={onClick}>
            {text}
        </div>
    )
}

export default Button