'use client';
import { FC } from "react";
import { STATUS, TodoType } from "@/types/todos";
import TodoElementDropdown from "./TodoElementDropdown/TodoElementDropdown";
import Image from "next/image";
import deadLineImage from '@/assets/images/todo/deadline.png';
import calendarImage from "@/assets/images/todo/calendar.png";
import checkImage from "@/assets/images/todo/check.png";

interface props{
    todo: TodoType
}

const formatDate = (date: Date) => {
    return `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`
}

const TodoElement: FC<props> = ({todo: {createdAt, status, title, dueDate, id}}) => {
    let deadlineViolated = false;
    let completed = false;

    if(status === STATUS.DONE) {
        completed = true;
    }

    if(dueDate && dueDate.getTime() < Date.now()){
        deadlineViolated = true;
    }


    return(
        <div className="bg-white py-2 px-3 flex text-sm rounded-sm">
            <p className="task-title flex-1">{title}</p>
            <div className="options w-[20%] flex items-center justify-around lg:w-[40%]">
                {
                    status !== STATUS.DONE &&
                        <TodoElementDropdown id={id} initialState={status} onlySquare={true} />
                }
                <p className="hidden lg:block text-xs cursor-default" title="created At">{formatDate(createdAt)}</p>
                <div className="flex gap-2 items-center">
                    <div className="hidden text-xs lg:block w-[90px] pointer-events-none">{
                        dueDate ? formatDate(dueDate) : "no Due date"
                    }</div>
                    <Image src={completed ? checkImage : deadlineViolated ? deadLineImage : calendarImage} height={20} width={20} title={dueDate ? formatDate(dueDate) : "there is no deadline set for this task."} alt={deadlineViolated ? "passed deadline!" : "on Time"} />
                </div>
            </div>
        </div>
    )
}

export default TodoElement;