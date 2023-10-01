'use client';
import React, {FC} from "react";
import Dropdown from "@/components/general/Dropdown/Dropdown";
import { STATUS } from "@/types/todos";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";



type todoOptions = {
    [key in STATUS]?: string | ReactNode
}

const todoOptionFormation = (text: string, bg: string) => {
    return (
        <div className="flex gap-1 px-2 py-1 cursor-pointer hover:bg-slate-200 rounded-md">
            <div className="flex justify-center items-center w-[20px]">
                <div className={`h-[10px] w-[10px] ${bg} rounded-sm border-[1px] border-solid`}>

                </div>
            </div>
            <div className="text-[12px]">
                {text}
            </div>
        </div>
    )
}

const TodoOption: (key: STATUS) => ReactNode = (key) => {
    switch(key){
        case STATUS.TODO:
            return todoOptionFormation("Todo", "bg-gray-400")
        case STATUS.DONE:
            return todoOptionFormation("Done", "bg-green-400")
        case STATUS.IN_PROGRESS:
            return todoOptionFormation("In Progress", "bg-purple-400")
        case STATUS.POSTPONED:
            return todoOptionFormation("Postponed", "bg-yellow-400")
    }
}

const options: todoOptions = {
    [STATUS.TODO]: TodoOption(STATUS.TODO),
    [STATUS.IN_PROGRESS]: TodoOption(STATUS.IN_PROGRESS),
    [STATUS.DONE]: TodoOption(STATUS.DONE),
    [STATUS.POSTPONED]: TodoOption(STATUS.POSTPONED),
}



interface commonProps {
    initialState?: STATUS
    onlySquare?: boolean
}

interface props extends commonProps {
    id: number
    action?: never
}

interface altProps extends commonProps {
    action: (key: string) => void
    id?: never
}

const TodoElementDropdown: FC<props | altProps> = ({initialState, onlySquare, id, action}) => {
    const router = useRouter();
    initialState = initialState || STATUS.TODO;
    action = action !== undefined? action : async (key: string) => {
        const result = await fetch("/api/todo/update", {method: "PUT", body: JSON.stringify({id, status: key})})
        router.refresh();
    }
    return(
        <Dropdown onlySquare={onlySquare} initialState={initialState} options={options} onChnage={(key: string) => {
            action!(key)
        }} />
    )
}

export default TodoElementDropdown