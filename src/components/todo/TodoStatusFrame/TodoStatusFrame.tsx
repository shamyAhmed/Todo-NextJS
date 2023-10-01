import { FC } from "react";
import { TodoType, STATUS } from "@/types/todos";
import TodoElement from "../TodoElement/TodoElement";
import './TodoStatusFrame.css'

interface props {
    todos: TodoType[]
    title: STATUS
}



const TodoStatusFrame: FC<props> = ({title, todos}) => {
    return (
        <div className="todolist-container min-h-[400px] w-full border-black border-[1px] rounded-md relative p-3 sm:border-0 sm:rounded-none sm:static sm:border-l-[1px] sm:border-l-gray-400 sm:border-solid">
            <p className="todolist-title px-2 bg-mainbg absolute -top-3 left-1/2 -translate-x-1/2 block text-center uppercase tracking-[1.4px] sm:static sm:top-0 sm:left-0 sm:-translate-x-0 sm:text-start sm:px-0 sm:mb-3 sm:font-bold">{title}</p>
            <div className="todolist-list flex flex-col gap-2">
                {
                    todos.map(todo => {
                        return(
                            <TodoElement todo={todo}  key={todo.id} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TodoStatusFrame;