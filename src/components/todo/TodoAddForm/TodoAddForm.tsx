'use client';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import TodoAddFormControl from './TodoAddFormControls';

const TodoAddForm = () => {
    const router = useRouter();
    useEffect(() => {
        const closeHandler = (e: MouseEvent) => {
            if((e.target as HTMLElement).matches(".add-todo-page")){
                router.back();
            }
        }
        document.addEventListener("click", closeHandler)
        return () => {
            document.removeEventListener("click", closeHandler)
        }
    }, [])
    return (
        <div className="form h-[420px] flex flex-col">
            <p className='header'>Add a new Item</p>
            <TodoAddFormControl />
        </div>
    )
}

export default TodoAddForm;